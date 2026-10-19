// src/api/carewave.ts

// CareWave Motion State API 호출 (번호는 api_spec 항목 번호)

import { apiDownload, apiRequest } from "./client";
import type {
  Analysis,
  ApiEvent,
  CsvFile,
  EventList,
  GuardianResult,
  MazeRecord,
  MazeRecordList,
  Recording,
  Replay,
  ReplaySpeed,
  Session,
  Signals,
} from "./types";

const query = (params: Record<string, string | number | boolean | undefined | null>) => {
  const entries = Object.entries(params).filter(([, value]) => value !== undefined && value !== null);
  return entries.length ? `?${new URLSearchParams(entries.map(([k, v]) => [k, String(v)]))}` : "";
};

const post = (body?: unknown): RequestInit => ({ method: "POST", body: body ? JSON.stringify(body) : undefined });
const patch = (body: unknown): RequestInit => ({ method: "PATCH", body: JSON.stringify(body) });

export interface SignalQuery {
  window?: number;
  from?: number;
  to?: number;
  max_points?: number;
  heatmap?: boolean;
}

/* 실시간 관찰 */
export const startSession = () => apiRequest<Session>("/api/sessions", post()); // 3
export const listSessions = (params: { status?: "running" | "stopped"; limit?: number } = {}) =>
  apiRequest<Session[]>(`/api/sessions${query(params)}`); // 4
export const getSession = (id: string) => apiRequest<Session>(`/api/sessions/${id}`); // 5
export const stopSession = (id: string) => apiRequest<Session>(`/api/sessions/${id}/stop`, post()); // 6
export const getSessionSignals = (id: string, params: SignalQuery = {}) =>
  apiRequest<Signals>(`/api/sessions/${id}/signals${query({ ...params })}`); // 8
export const sessionSocketPath = (id: string) => `/ws/sessions/${id}`; // 9

/* 활동 사건 */
export const listEvents = (params: {
  session_id?: string;
  analysis_id?: string;
  status?: "all" | "unconfirmed" | "confirmed";
  order?: "asc" | "desc";
  limit?: number;
  offset?: number;
}) => apiRequest<EventList>(`/api/events${query(params)}`); // 10
export const confirmEvent = (id: string, result: GuardianResult) =>
  apiRequest<ApiEvent>(`/api/events/${id}/confirmation`, patch({ result })); // 12

/* CSV 기록 */
export const uploadFile = (file: File) => {
  const form = new FormData();
  form.append("file", file);
  return apiRequest<CsvFile>("/api/files", { method: "POST", body: form }); // 13
};
export const listFiles = () => apiRequest<CsvFile[]>("/api/files"); // 14
export const getFile = (id: string) => apiRequest<CsvFile>(`/api/files/${id}`); // 15
export const deleteFile = (id: string) => apiRequest<void>(`/api/files/${id}`, { method: "DELETE" }); // 16
export const startAnalysis = (fileId: string) => apiRequest<Analysis>(`/api/files/${fileId}/analyses`, post()); // 17
export const getAnalysis = (id: string) => apiRequest<Analysis>(`/api/analyses/${id}`); // 18
export const getAnalysisSignals = (id: string, params: SignalQuery = {}) =>
  apiRequest<Signals>(`/api/analyses/${id}/signals${query({ ...params })}`); // 19

export const createReplay = (body: { analysis_id: string; speed?: ReplaySpeed; position_ts?: number; play?: boolean }) =>
  apiRequest<Replay>("/api/replays", post(body)); // 20
export const updateReplay = (
  id: string,
  body: { action?: "play" | "pause"; position_ts?: number; speed?: ReplaySpeed },
) => apiRequest<Replay>(`/api/replays/${id}`, patch(body)); // 22
export const replaySocketPath = (id: string) => `/ws/replays/${id}`; // 23

/* 실시간 녹화 */
export const getRecording = (sessionId: string) => apiRequest<Recording>(`/api/sessions/${sessionId}/recording`); // 24
export const downloadRecordingCsv = (sessionId: string) => apiDownload(`/api/sessions/${sessionId}/recording/csv`); // 25

/* 미로 게임 */
export const saveMazeRecord = (body: { name: string; minutes: number; seconds: number }) =>
  apiRequest<MazeRecord>("/api/maze/records", post(body)); // 26
export const listMazeRecords = (limit?: number) => apiRequest<MazeRecordList>(`/api/maze/records${query({ limit })}`); // 27
