// src/hooks/useRecording.ts

// 실시간 녹화 CSV (API 24·25)
// - 취침 모드 중: 녹화 중이라 받을 수 없음 (버튼 비활성)
// - 취침 모드 종료: ready → CSV 받기 가능 (여러 번 받을 수 있음)
// - 보관 시간(기본 5분)이 지나거나, 새 취침 모드를 시작하거나, 15분을 넘겨 녹화가 버려지면 다시 비활성

import { useCallback, useEffect, useState } from "react";

import { downloadRecordingCsv, getRecording } from "../api/carewave";
import type { Recording, Session } from "../api/types";

const FINALIZE_RETRY_MS = 2000;

const unavailableHint: Record<string, string> = {
  recording: "취침 모드를 끄면 CSV를 받을 수 있습니다.",
  too_long: "관찰이 15분을 넘어 녹화가 삭제되었습니다.",
  empty: "받은 CSI 데이터가 없어 CSV가 없습니다.",
  expired: "보관 시간이 지나 녹화가 삭제되었습니다.",
  none: "이 관찰은 녹화된 CSV가 없습니다.",
  failed: "녹화 저장에 실패했습니다.",
};

const saveFile = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};

export function useRecording(session: Session | null, nowMs: number) {
  const [recording, setRecording] = useState<Recording | null>(null);
  const [downloading, setDownloading] = useState(false);

  const sessionId = session?.id;
  const sessionStatus = session?.status;

  const refresh = useCallback(async (id: string) => {
    try {
      setRecording(await getRecording(id));
    } catch {
      // 상태를 못 받으면 이전 값을 유지하고, 버튼은 안전하게 비활성으로 둔다
    }
  }, []);

  // 세션이 바뀌거나 시작/종료될 때 다시 확인
  useEffect(() => {
    if (!sessionId) return;
    let cancelled = false;
    getRecording(sessionId)
      .then((result) => !cancelled && setRecording(result))
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [sessionId, sessionStatus]);

  const current = recording && recording.session_id === sessionId ? recording : null;

  // 종료 직후 서버가 아직 녹화를 마무리하는 중이면 잠시 뒤 다시 확인
  useEffect(() => {
    if (!sessionId || sessionStatus !== "stopped" || current?.status !== "recording") return;
    const timer = window.setTimeout(() => refresh(sessionId), FINALIZE_RETRY_MS);
    return () => window.clearTimeout(timer);
  }, [sessionId, sessionStatus, current, refresh]);

  // ready면 보관 시간이 끝나는 시각에 다시 확인해서 자동으로 비활성화
  useEffect(() => {
    if (current?.status !== "ready" || !current.expires_at) return;
    const delay = Math.max(0, current.expires_at * 1000 - Date.now()) + 1000;
    const timer = window.setTimeout(() => refresh(current.session_id), delay);
    return () => window.clearTimeout(timer);
  }, [current, refresh]);

  const expired = !!current?.expires_at && nowMs >= current.expires_at * 1000;
  const canDownload = sessionStatus === "stopped" && !!current?.downloadable && !expired;

  let hint: string;
  if (!session) hint = "취침 모드 관찰을 마치면 CSV를 받을 수 있습니다.";
  else if (sessionStatus === "running") hint = unavailableHint.recording;
  else if (canDownload && current?.expires_at) {
    const minutesLeft = Math.max(1, Math.ceil((current.expires_at * 1000 - nowMs) / 60000));
    hint = `이번 관찰의 CSI 원본 CSV를 받습니다. 약 ${minutesLeft}분 뒤 삭제됩니다.`;
  } else if (expired) hint = unavailableHint.expired;
  else hint = (current && unavailableHint[current.status]) ?? "녹화 상태를 확인하는 중입니다.";

  // CSV 받기. 실패하면 상태를 다시 확인하고 서버 안내 문구로 오류를 던진다.
  const download = async () => {
    if (!sessionId) return;
    setDownloading(true);
    try {
      const { blob, filename } = await downloadRecordingCsv(sessionId);
      saveFile(blob, filename ?? `csi_raw_live_${sessionId.slice(0, 8)}.csv`);
    } catch (e) {
      refresh(sessionId);
      throw e;
    } finally {
      setDownloading(false);
    }
  };

  return { canDownload, downloading, hint, download };
}
