// src/hooks/useEspFeed.ts

// 크리스마스 미로 게임용 ESP 연결: 관찰 세션을 켜고, WebSocket으로 수신기 상태와 모델 출력값(activity_score)을 받는다
// - 게임 화면에 들어오면 세션을 시작한다 (이미 진행 중이면 그 세션을 그대로 쓴다)
// - 게임이 직접 켠 세션만 나갈 때 끈다 (대시보드에서 켜 둔 관찰은 건드리지 않음)

import { useEffect, useRef, useState } from "react";

import { sessionSocketPath, startSession, stopSession } from "../api/carewave";
import { openSocket } from "../api/socket";
import type { Frame, RxStatus, SessionMessage } from "../api/types";

export type EspLevel = "green" | "orange" | "red";

export interface EspScore {
  value: number; // 0~1
  ts: number; // 받은 시각 (ms)
}

// 초록: 수신기 모두 정상 / 주황: 일부만 연결(준비 중) / 빨강: 전부 미연결·불안정·오류
export const espLevel = (rx: RxStatus[], failed: boolean): EspLevel => {
  if (failed || rx.length === 0) return "red";
  const ok = rx.filter((r) => r.status === "ok").length;
  if (ok === rx.length) return "green";
  return rx.some((r) => r.status === "ok" || r.status === "weak") ? "orange" : "red";
};

const latestScore = (frames: Frame[]) => {
  const last = frames.reduce<Frame | null>((latest, f) => (!latest || f.ts >= latest.ts ? f : latest), null);
  return last && last.activity_score !== null && last.signal_ok ? last.activity_score : null;
};

export function useEspFeed() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [rx, setRx] = useState<RxStatus[]>([]);
  const [failed, setFailed] = useState(false);
  const [score, setScore] = useState<EspScore | null>(null);
  const createdRef = useRef(false);

  // 세션 켜기 (나갈 때 게임이 켠 세션이면 끈다)
  useEffect(() => {
    let cancelled = false;
    let startedId: string | null = null;
    startSession()
      .then((session) => {
        startedId = session.id;
        createdRef.current = !!session.created;
        if (cancelled) {
          if (session.created) stopSession(session.id).catch(() => {});
          return;
        }
        setSessionId(session.id);
        setRx(session.rx);
      })
      .catch(() => !cancelled && setFailed(true));
    return () => {
      cancelled = true;
      if (startedId && createdRef.current) stopSession(startedId).catch(() => {});
    };
  }, []);

  // 수신기 상태·모델 출력값 이어 받기
  useEffect(() => {
    if (!sessionId) return;
    return openSocket<SessionMessage>(sessionSocketPath(sessionId), {
      onMessage: (message) => {
        if (message.type === "snapshot") {
          setRx(message.session.rx);
          setFailed(false);
        } else if (message.type === "status") {
          setRx(message.rx);
        }
        if (message.type === "snapshot" || message.type === "frames") {
          const value = latestScore(message.frames);
          if (value !== null) setScore({ value, ts: Date.now() });
        }
      },
      onFinalClose: () => setFailed(true),
    });
  }, [sessionId]);

  return { level: espLevel(rx, failed), score };
}
