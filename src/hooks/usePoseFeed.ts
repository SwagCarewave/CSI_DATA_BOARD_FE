import { useSyncExternalStore } from "react";

import { poseSocketPath } from "../api/carewave";
import { openSocket } from "../api/socket";
import type { PoseCalibration, PoseFrame, PoseLink, PoseLinkState, PoseMessage, PoseModel } from "../api/types";
import type { EspScore } from "./useEspFeed";

export interface PoseState {
  connected: boolean;
  unavailable: boolean;
  model: PoseModel | null;
  pose: PoseFrame | null;
  links: PoseLink[];
  linksOk: number;
  linksTotal: number;
  ready: boolean;
  secondsSinceLastRecord: number | null;
  calibration: PoseCalibration | null;
  score: EspScore | null;
  fallAlarmAt: number | null;
}

const SCORE_INTERVAL_MS = 200;

const initialState: PoseState = {
  connected: false,
  unavailable: false,
  model: null,
  pose: null,
  links: [],
  linksOk: 0,
  linksTotal: 30,
  ready: false,
  secondsSinceLastRecord: null,
  calibration: null,
  score: null,
  fallAlarmAt: null,
};

let state = initialState;
const listeners = new Set<() => void>();
let closeSocket: (() => void) | null = null;

const update = (next: Partial<PoseState>) => {
  state = { ...state, ...next };
  listeners.forEach((listener) => listener());
};

const fromLinks = (m: PoseLinkState): Partial<PoseState> => ({
  links: m.links,
  linksOk: m.links_ok,
  linksTotal: m.links_total,
  ready: m.ready,
  secondsSinceLastRecord: m.seconds_since_last_record,
  calibration: m.calibration,
});

const handleMessage = (m: PoseMessage) => {
  switch (m.type) {
    case "snapshot":
      update({ ...fromLinks(m), connected: true, unavailable: false, model: m.model, pose: m.latest });
      break;
    case "pose": {
      const now = Date.now();
      const pose: PoseFrame = m;
      const next: Partial<PoseState> = { pose };
      if (!state.score || now - state.score.ts >= SCORE_INTERVAL_MS) next.score = { value: pose.activity_score, ts: now };
      if (pose.fall_alarm && !state.pose?.fall_alarm) next.fallAlarmAt = now;
      update(next);
      break;
    }
    case "links":
      update(fromLinks(m));
      break;
    case "calibration":
      update({ calibration: m.calibration });
      break;
    case "model":
      update({ model: m.model, pose: null });
      break;
  }
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  if (!closeSocket) {
    closeSocket = openSocket<PoseMessage>(poseSocketPath, {
      onMessage: handleMessage,
      onFinalClose: (code) => update({ connected: false, unavailable: code === 4503 }),
    });
  }
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0 && closeSocket) {
      closeSocket();
      closeSocket = null;
      state = initialState;
    }
  };
};

export function usePoseFeed<T>(selector: (s: PoseState) => T): T {
  return useSyncExternalStore(subscribe, () => selector(state));
}
