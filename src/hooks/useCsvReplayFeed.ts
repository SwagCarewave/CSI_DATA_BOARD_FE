// src/hooks/useCsvReplayFeed.ts

// 크리스마스 미로 게임 시연용: ESP 대신 서버에 올린 CSV의 모델 결과를 재생해 출력값(activity_score)을 넣는다 (API 14·20·22·23)
// - 파일 이름으로 분석이 끝난 CSV를 찾아 1배속으로 재생하고, 끝나면 처음부터 다시 재생한다

import { useEffect, useState } from "react";

import { createReplay, listFiles, replaySocketPath, updateReplay } from "../api/carewave";
import { openSocket } from "../api/socket";
import type { Frame, Replay, ReplayMessage } from "../api/types";
import type { EspLevel, EspScore } from "./useEspFeed";

const latestScore = (frames: Frame[]) => {
  const last = frames.reduce<Frame | null>((latest, f) => (!latest || f.ts >= latest.ts ? f : latest), null);
  return last && last.activity_score !== null && last.signal_ok ? last.activity_score : null;
};

export function useCsvReplayFeed(filename: string) {
  const [replay, setReplay] = useState<Replay | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [score, setScore] = useState<EspScore | null>(null);

  // 파일 찾기 → 재생 만들기
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const file = (await listFiles()).find((f) => f.filename === filename);
        const analysis = file?.latest_analysis;
        if (!file || analysis?.status !== "succeeded") {
          throw new Error(`서버에 분석이 끝난 ${filename} 파일이 없습니다. 대시보드의 CSV 기록 조회에서 올리고 분석해 주세요.`);
        }
        const created = await createReplay({ analysis_id: analysis.id, speed: 1, play: true });
        if (!cancelled) setReplay(created);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "CSV 재생을 준비하지 못했습니다.");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [filename]);

  // 재생 중 0.5초마다 오는 프레임에서 출력값을 받는다. 끝나면 처음부터 다시
  const replayId = replay?.id;
  useEffect(() => {
    if (!replayId) return;
    return openSocket<ReplayMessage>(replaySocketPath(replayId), {
      onMessage: (message) => {
        if (message.type === "tick") {
          const value = latestScore(message.frames);
          if (value !== null) setScore({ value, ts: Date.now() });
        } else if (message.type === "state" && message.replay.status === "ended") {
          updateReplay(replayId, { action: "play" }).catch(() => {});
        } else if (message.type === "removed") {
          setError("재생할 파일이 삭제되었습니다.");
        }
      },
      onFinalClose: () => setError("CSV 재생 연결이 끊겼습니다."),
    });
  }, [replayId]);

  // 게임을 시작할 때 기록 처음부터 다시 재생
  const restart = () => {
    if (replay) updateReplay(replay.id, { position_ts: replay.from_ts, action: "play" }).catch(() => {});
  };

  const level: EspLevel = error ? "red" : replayId ? "green" : "orange";
  return { level, score, error, restart };
}
