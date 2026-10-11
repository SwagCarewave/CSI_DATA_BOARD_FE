// src/hooks/useLiveSession.ts

// 실시간 관찰: 진행 중 세션 확인 → 그래프·사건 불러오기 → WebSocket으로 이어 받기 → 취침 모드 켜기/끄기

import { useCallback, useEffect, useState } from "react";

import {
  getSession,
  getSessionSignals,
  listEvents,
  listSessions,
  sessionSocketPath,
  startSession,
  stopSession,
} from "../api/carewave";
import { errorMessage } from "../api/client";
import { openSocket } from "../api/socket";
import type { ApiEvent, Session, SessionMessage } from "../api/types";
import { appendFrames, seriesFromSignals } from "../utils/signalSeries";
import type { SignalSeries } from "../utils/signalSeries";

export interface LiveAlert {
  eventId: string;
  message: string;
}

export function useLiveSession(windowSec: number) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [series, setSeries] = useState<SignalSeries | null>(null);
  const [events, setEvents] = useState<ApiEvent[]>([]);
  const [toggling, setToggling] = useState(false);
  const [alert, setAlert] = useState<LiveAlert | null>(null);

  const sessionId = session?.id;
  const running = session?.status === "running";

  // 진입 시 진행 중인 세션 → 없으면 가장 최근 세션을 보여 준다
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const runningSessions = await listSessions({ status: "running", limit: 1 });
        const latest = runningSessions[0] ?? (await listSessions({ limit: 1 }))[0] ?? null;
        if (!cancelled) setSession(latest);
      } catch (e) {
        if (!cancelled) setError(errorMessage(e));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const refreshEvents = useCallback(async (id: string) => {
    const list = await listEvents({ session_id: id, order: "asc", limit: 500 });
    setEvents(list.items);
  }, []);

  // 세션·기간이 바뀌면 그래프와 활동 사건을 새로 불러온다
  useEffect(() => {
    if (!sessionId) return;
    let cancelled = false;
    (async () => {
      try {
        const [signals] = await Promise.all([
          getSessionSignals(sessionId, { window: windowSec, max_points: 1200 }),
          refreshEvents(sessionId),
        ]);
        if (!cancelled) setSeries(seriesFromSignals(signals));
      } catch (e) {
        if (!cancelled) setError(errorMessage(e));
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [sessionId, windowSec, refreshEvents]);

  // 관찰 중이면 WebSocket으로 판정·RX 상태·알림을 이어 받는다
  useEffect(() => {
    if (!sessionId || !running) return;
    const keepMs = windowSec * 1000;

    return openSocket<SessionMessage>(sessionSocketPath(sessionId), {
      onMessage: (message) => {
        switch (message.type) {
          case "snapshot":
            setSession(message.session);
            setSeries((prev) => appendFrames(prev, message.frames, keepMs));
            break;
          case "frames":
            setSeries((prev) => appendFrames(prev, message.frames, keepMs));
            break;
          case "status":
            setSession((prev) =>
              prev && {
                ...prev,
                rx: message.rx,
                seconds_since_last_packet: message.seconds_since_last_packet,
                last_packet_at: message.last_packet_at,
              },
            );
            break;
          case "alert":
            setAlert({ eventId: message.event_uuid, message: message.message });
            refreshEvents(sessionId).catch(() => {});
            if ("Notification" in window && Notification.permission === "granted") {
              new Notification("CareWave · 보호자 확인이 필요해요", { body: message.message });
            }
            break;
          case "event":
            refreshEvents(sessionId).catch(() => {});
            break;
          case "stopped":
            getSession(sessionId).then(setSession).catch(() => {});
            break;
        }
      },
      // 없는 세션(4404)·이미 종료된 세션(4409)이면 최신 상태만 다시 받는다
      onFinalClose: () => {
        getSession(sessionId).then(setSession).catch(() => {});
      },
    });
  }, [sessionId, running, windowSec, refreshEvents]);

  // 상단 "취침 모드" 토글
  const setSleepMode = async (on: boolean) => {
    setToggling(true);
    setError(null);
    try {
      if (on) {
        const started = await startSession(); // 이미 진행 중이면 그 세션을 돌려준다
        if (started.id !== sessionId) {
          setSeries(null);
          setEvents([]);
          setAlert(null);
        }
        setSession(started);
      } else if (session?.status === "running") {
        setSession(await stopSession(session.id));
      }
    } catch (e) {
      setError(errorMessage(e));
    } finally {
      setToggling(false);
    }
  };

  // 보호자 확인 결과 저장 후 목록 갱신
  const replaceEvent = (updated: ApiEvent) => {
    setEvents((prev) => prev.map((event) => (event.id === updated.id ? updated : event)));
    if (alert?.eventId === updated.id) setAlert(null);
  };

  return {
    session,
    loading,
    error,
    series,
    events,
    toggling,
    alert,
    dismissAlert: () => setAlert(null),
    setSleepMode,
    replaceEvent,
  };
}
