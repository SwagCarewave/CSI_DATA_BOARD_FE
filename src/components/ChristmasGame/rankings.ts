// src/components/ChristmasGame/rankings.ts

// 미로 게임 기록 (API 26 저장 · 27 순위). 기록은 서버에 영구 보관된다

import { useEffect, useState } from "react";

import { listMazeRecords, saveMazeRecord } from "../../api/carewave";
import { errorMessage } from "../../api/client";
import type { RankedMazeRecord } from "../../api/types";

export const TREE_LIMIT = 10; // 트리에는 상위 10개

// 걸린 시간(ms) → 서버 형식 (분 · 초, 초 단위 버림. 화면의 mm : ss와 같은 값)
export function saveRecord(name: string, elapsedMs: number) {
  const total = Math.floor(elapsedMs / 1000);
  return saveMazeRecord({ name, minutes: Math.floor(total / 60), seconds: total % 60 });
}

export const recordTime = (record: { minutes: number; seconds: number }) =>
  `${String(record.minutes).padStart(2, "0")}:${String(record.seconds).padStart(2, "0")}`;

// limit을 비우면 전체 기록
export function useMazeRecords(limit?: number) {
  const [records, setRecords] = useState<RankedMazeRecord[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    listMazeRecords(limit)
      .then((list) => !cancelled && setRecords(list.records))
      .catch((e) => !cancelled && setError(errorMessage(e)));
    return () => {
      cancelled = true;
    };
  }, [limit]);

  return { records, error, loading: records === null && error === null };
}
