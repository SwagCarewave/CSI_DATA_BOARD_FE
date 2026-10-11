// src/hooks/useCsvFiles.ts

// CSV 기록 조회: 등록된 파일 목록 · 업로드 · 분석(진행률 폴링) · 분석 결과(그래프·사건) · 삭제

import { useCallback, useEffect, useState } from "react";

import {
  deleteFile,
  getAnalysis,
  getAnalysisSignals,
  listEvents,
  listFiles,
  startAnalysis,
  uploadFile,
} from "../api/carewave";
import { ApiError, errorMessage } from "../api/client";
import type { Analysis, ApiEvent, CsvFile } from "../api/types";
import { seriesFromSignals } from "../utils/signalSeries";
import type { SignalSeries } from "../utils/signalSeries";

const POLL_MS = 800;
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export interface AnalysisResult {
  analysisId: string;
  series: SignalSeries;
  events: ApiEvent[];
}

// 분석이 끝날 때까지 상태를 확인한다. cancel.current가 true가 되면 멈춘다.
async function pollAnalysis(analysis: Analysis, onProgress: (ratio: number) => void, cancel: { current: boolean }) {
  let current = analysis;
  while (current.status === "queued" || current.status === "running") {
    onProgress(current.progress);
    await wait(POLL_MS);
    if (cancel.current) return current;
    current = await getAnalysis(current.id);
  }
  onProgress(current.progress);
  return current;
}

export function useCsvFiles() {
  const [files, setFiles] = useState<CsvFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [resultError, setResultError] = useState<string | null>(null);

  const refreshFiles = useCallback(async () => {
    try {
      const list = await listFiles();
      setFiles(list);
      setError(null);
      setSelectedId((prev) => (prev && list.some((file) => file.id === prev) ? prev : (list[0]?.id ?? null)));
    } catch (e) {
      setError(errorMessage(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    listFiles()
      .then((list) => {
        if (cancelled) return;
        setFiles(list);
        setSelectedId(list[0]?.id ?? null);
      })
      .catch((e) => !cancelled && setError(errorMessage(e)))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  const selected = files.find((file) => file.id === selectedId) ?? null;
  const latest = selected?.latest_analysis ?? null;
  const latestId = latest?.id;
  const latestStatus = latest?.status;

  // 선택한 파일의 분석 결과를 불러온다 (분석 중이면 끝날 때까지 기다린 뒤 목록 갱신)
  useEffect(() => {
    if (!latestId) return;
    const cancel = { current: false };

    (async () => {
      try {
        if (latestStatus === "queued" || latestStatus === "running") {
          await pollAnalysis(await getAnalysis(latestId), () => {}, cancel);
          if (!cancel.current) await refreshFiles();
          return;
        }
        if (latestStatus !== "succeeded") return;

        const [signals, events] = await Promise.all([
          getAnalysisSignals(latestId, { max_points: 3600 }),
          listEvents({ analysis_id: latestId, order: "asc", limit: 500 }),
        ]);
        if (cancel.current) return;
        setResult({ analysisId: latestId, series: seriesFromSignals(signals), events: events.items });
        setResultError(null);
      } catch (e) {
        if (!cancel.current) setResultError(errorMessage(e));
      }
    })();

    return () => {
      cancel.current = true;
    };
  }, [latestId, latestStatus, refreshFiles]);

  // CSV 업로드 (서버가 형식 검사 후 등록)
  const upload = async (file: File) => {
    const created = await uploadFile(file);
    setFiles((prev) => [created, ...prev.filter((item) => item.id !== created.id)]);
    return created;
  };

  // 분석 시작 → 완료까지 진행률 표시. 실패하면 서버 안내 문구로 ApiError를 던진다.
  const analyze = async (fileId: string, onProgress: (ratio: number) => void, cancel: { current: boolean }) => {
    const started = await startAnalysis(fileId);
    const finished = await pollAnalysis(started, onProgress, cancel);
    if (cancel.current) return finished;

    await refreshFiles();
    if (finished.status === "failed") {
      throw new ApiError(
        200,
        finished.error_code ?? "analysis_error",
        finished.error_message ?? "CSV 분석 중 오류가 발생했습니다.",
      );
    }
    setSelectedId(fileId);
    return finished;
  };

  const remove = async (id: string) => {
    await deleteFile(id);
    const remaining = files.filter((file) => file.id !== id);
    setFiles(remaining);
    if (id === selectedId) setSelectedId(remaining[0]?.id ?? null);
  };

  const replaceEvent = (updated: ApiEvent) =>
    setResult((prev) =>
      prev && { ...prev, events: prev.events.map((event) => (event.id === updated.id ? updated : event)) },
    );

  return {
    files,
    loading,
    error,
    selected,
    select: setSelectedId,
    // 선택한 파일의 최신 분석 결과일 때만 사용한다
    result: result && result.analysisId === latestId ? result : null,
    resultError,
    upload,
    analyze,
    remove,
    refreshFiles,
    replaceEvent,
  };
}
