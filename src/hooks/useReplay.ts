// src/hooks/useReplay.ts

// CSV 재생: 서버 재생(API 20~23, 재생 시각은 서버가 계산)을 쓰고,
// 재생을 만들 수 없으면 브라우저에서 직접 재생한다.

import { useEffect, useRef, useState } from "react";

import { createReplay, replaySocketPath, updateReplay } from "../api/carewave";
import { openSocket } from "../api/socket";
import type { PoseDrawModel, PoseReplayFrame, Replay, ReplayMessage, ReplaySpeed } from "../api/types";

interface LocalPlayback {
  analysisId: string;
  positionMs: number;
  playing: boolean;
  speed: ReplaySpeed;
}

const LOCAL_TICK_MS = 250;
const SEEK_THROTTLE_MS = 150;

export function useReplay(analysisId: string | null, range: { startMs: number; endMs: number } | null) {
  const [replay, setReplay] = useState<Replay | null>(null);
  const [fallbackFor, setFallbackFor] = useState<string | null>(null);
  const [local, setLocal] = useState<LocalPlayback | null>(null);
  const [recreateKey, setRecreateKey] = useState(0);
  const [pose, setPose] = useState<{ analysisId: string; model: PoseDrawModel | null; current: PoseReplayFrame | null } | null>(
    null,
  );
  // 재생 중 넘어짐 알림이 새로 켜진 시각 (대시보드 낙상 경고창용)
  const [fall, setFall] = useState<{ analysisId: string; at: number } | null>(null);
  const seekTimer = useRef<number | undefined>(undefined);

  const startMs = range?.startMs ?? 0;
  const endMs = range?.endMs ?? 0;
  const span = Math.max(1, endMs - startMs);
  const hasRange = !!range;

  const serverReplay = replay && replay.analysis_id === analysisId ? replay : null;
  const useLocal = !!analysisId && fallbackFor === analysisId;
  const localState = local && local.analysisId === analysisId ? local : null;

  // 분석이 바뀌면 서버 재생을 만들고 WebSocket으로 재생 시각을 받는다
  useEffect(() => {
    if (!analysisId) return;
    let cancelled = false;
    let close: (() => void) | undefined;
    let falling = false;

    (async () => {
      try {
        const created = await createReplay({ analysis_id: analysisId, speed: 1, play: true });
        if (cancelled) return;
        setReplay(created);
        close = openSocket<ReplayMessage>(replaySocketPath(created.id), {
          onMessage: (message) => {
            if (message.type === "state" || message.type === "tick") setReplay(message.replay);
            // 넘어짐 알림이 꺼져 있다가 켜지는 순간 한 번 (배속 재생에서도 놓치지 않도록 tick 사이 프레임까지 본다)
            if (message.type === "tick" || message.type === "state") {
              const frames = [...(message.type === "tick" ? (message.poses ?? []) : []), ...(message.current ? [message.current] : [])];
              if (frames.length) {
                const nowFalling = frames.some((frame) => frame.fall_alarm);
                if (nowFalling && !falling) setFall({ analysisId, at: Date.now() });
                falling = frames.at(-1)!.fall_alarm;
              }
            }
            if (message.type === "state" && message.model !== undefined) {
              setPose({ analysisId, model: message.model, current: message.current ?? null });
            } else if ((message.type === "state" || message.type === "tick") && message.current !== undefined) {
              const current = message.current;
              setPose((prev) => (prev?.analysisId === analysisId ? { ...prev, current } : prev));
            }
          },
          // 서버 재시작 등으로 재생이 사라지면(4404) 다시 만든다
          onFinalClose: (code) => {
            if (code === 4404 && !cancelled) setRecreateKey((key) => key + 1);
          },
        });
      } catch {
        if (!cancelled) setFallbackFor(analysisId);
      }
    })();

    return () => {
      cancelled = true;
      close?.();
    };
  }, [analysisId, recreateKey]);

  // 브라우저 재생 (서버 재생을 쓸 수 없을 때)
  useEffect(() => {
    if (!useLocal || !hasRange || !localState?.playing) return;
    const timer = window.setInterval(() => {
      setLocal((prev) => {
        if (!prev) return prev;
        const positionMs = Math.min(endMs, prev.positionMs + prev.speed * LOCAL_TICK_MS);
        return { ...prev, positionMs, playing: positionMs < endMs };
      });
    }, LOCAL_TICK_MS);
    return () => window.clearInterval(timer);
  }, [useLocal, hasRange, endMs, localState?.playing]);

  const current: LocalPlayback | null = serverReplay
    ? {
        analysisId: serverReplay.analysis_id,
        positionMs: serverReplay.position_ts * 1000,
        playing: serverReplay.status === "playing",
        speed: serverReplay.speed,
      }
    : useLocal
      ? (localState ?? { analysisId: analysisId!, positionMs: startMs, playing: true, speed: 1 })
      : null;

  const positionMs = current?.positionMs ?? startMs;

  const send = (body: Parameters<typeof updateReplay>[1]) => {
    if (!serverReplay) return;
    updateReplay(serverReplay.id, body)
      .then(setReplay)
      .catch(() => {});
  };

  const togglePlay = () => {
    if (!current) return;
    if (serverReplay) {
      send({ action: current.playing ? "pause" : "play" });
      return;
    }
    const atEnd = current.positionMs >= endMs;
    setLocal({ ...current, positionMs: atEnd ? startMs : current.positionMs, playing: !current.playing || atEnd });
  };

  const seek = (progress: number) => {
    if (!current) return;
    const target = startMs + progress * span;
    if (serverReplay) {
      // 드래그 중에는 화면을 먼저 옮기고 서버에는 짧은 간격으로 보낸다
      setReplay({ ...serverReplay, position_ts: target / 1000, progress });
      window.clearTimeout(seekTimer.current);
      seekTimer.current = window.setTimeout(() => send({ position_ts: target / 1000 }), SEEK_THROTTLE_MS);
      return;
    }
    setLocal({ ...current, positionMs: target });
  };

  const setSpeed = (speed: ReplaySpeed) => {
    if (!current) return;
    if (serverReplay) send({ speed });
    else setLocal({ ...current, speed });
  };

  return {
    ready: !!current,
    mode: serverReplay ? ("server" as const) : useLocal ? ("local" as const) : null,
    positionMs,
    progress: Math.min(1, Math.max(0, (positionMs - startMs) / span)),
    playing: current?.playing ?? false,
    speed: current?.speed ?? 1,
    togglePlay,
    seek,
    setSpeed,
    poseModel: pose?.analysisId === analysisId ? pose.model : null,
    poseCurrent: pose?.analysisId === analysisId ? pose.current : null,
    fallAlarmAt: fall?.analysisId === analysisId ? fall.at : null,
  };
}
