// src/api/types.ts

// CareWave Motion State API 응답 형식 (api_spec v0.1.0)
// 시각은 모두 UNIX 초(UTC). 화면에서는 ts * 1000 으로 Date를 만든다.

export type UnixSeconds = number;

export interface ApiErrorBody {
  error: { code: string; message: string; detail?: Record<string, unknown> };
}

/* 실시간 관찰 */
export type RxStatusCode = "ok" | "weak" | "lost" | "none";

export interface RxStatus {
  rx: string;
  status: RxStatusCode;
  status_ko: string;
  packet_rate: number;
  last_packet_ts: UnixSeconds | null;
}

export interface Session {
  id: string;
  status: "running" | "stopped";
  started_at: UnixSeconds;
  stopped_at: UnixSeconds | null;
  elapsed_sec: number;
  last_packet_at: UnixSeconds | null;
  seconds_since_last_packet: number | null;
  state: string | null;
  state_ko: string | null;
  motion_index: number | null;
  activity_score: number | null;
  rx: RxStatus[];
  event_count: number;
  unconfirmed_count: number;
  created?: boolean;
}

export interface Frame {
  ts: UnixSeconds;
  t?: number;
  state: string;
  state_ko?: string;
  motion_index: number | null;
  activity_score: number | null;
  candidate_sec?: number;
  event_id: number | null;
  alert?: string | null;
  signal_ok: boolean;
  packet_rate?: Record<string, number>;
  heatmap: number[] | null;
}

export interface SignalEvent {
  id: number;
  uuid?: string;
  label?: string;
  start_ts: UnixSeconds;
  alert_ts: UnixSeconds;
  end_ts: UnixSeconds | null;
  duration_sec: number;
  ongoing: boolean;
  guardian_result: GuardianResult | null;
}

// 그래프·히트맵 (열 형식: 같은 인덱스끼리 한 점)
export interface Signals {
  session_id?: string | null;
  analysis_id?: string;
  file_id?: string;
  from_ts: UnixSeconds;
  to_ts: UnixSeconds;
  step_sec: number;
  activity_threshold: number | null;
  count: number;
  ts: UnixSeconds[];
  motion_index: (number | null)[];
  activity_score: (number | null)[];
  state: string[];
  event_id: (number | null)[];
  signal_ok: boolean[];
  heatmap: (number[] | null)[] | null;
  events: SignalEvent[];
}

export type SessionMessage =
  | { type: "snapshot"; session: Session; frames: Frame[] }
  | { type: "frames"; frames: Frame[] }
  | { type: "status"; rx: RxStatus[]; seconds_since_last_packet: number | null; last_packet_at: UnixSeconds | null }
  | { type: "alert"; ts: UnixSeconds; event_id: number; event_uuid: string; message: string }
  | { type: "event"; id: string; number: number }
  | { type: "stopped"; session_id: string };

/* 활동 사건 */
export type GuardianResult = "정상 활동" | "도움 필요" | "잘못된 감지";

export interface ApiEvent {
  id: string;
  number: number;
  session_id: string | null;
  analysis_id: string | null;
  source: "live" | "csv";
  title: string;
  started_at: UnixSeconds;
  alerted_at: UnixSeconds;
  ended_at: UnixSeconds | null;
  duration_sec: number;
  label?: string;
  ongoing: boolean;
  alert_message: string | null;
  status: "unconfirmed" | "confirmed";
  status_ko: string;
  guardian_result: GuardianResult | null;
  confirmed_at: UnixSeconds | null;
}

export interface EventList {
  counts: { all: number; unconfirmed: number; confirmed: number };
  total: number;
  items: ApiEvent[];
}

/* CSV 기록 */
export type AnalysisStatus = "queued" | "running" | "succeeded" | "failed";

export interface AnalysisSummary {
  id: string;
  status: AnalysisStatus;
  progress: number;
  event_count: number | null;
  error_code: string | null;
  error_message: string | null;
  finished_at: UnixSeconds | null;
}

export interface CsvFile {
  id: string;
  filename: string;
  size_bytes: number;
  rows: number;
  packets: number;
  incomplete_rows: number;
  receivers: string[];
  packets_by_rx: Record<string, number>;
  record_start: UnixSeconds;
  record_end: UnixSeconds;
  duration_sec: number;
  uploaded_at: UnixSeconds;
  latest_analysis: AnalysisSummary | null;
}

export interface Analysis {
  id: string;
  file_id: string;
  status: AnalysisStatus;
  progress: number;
  attempt: number;
  frame_count: number | null;
  event_count: number | null;
  record_start: UnixSeconds | null;
  record_end: UnixSeconds | null;
  duration_sec: number | null;
  error_code: string | null;
  error_message: string | null;
  started_at: UnixSeconds | null;
  finished_at: UnixSeconds | null;
  created_at: UnixSeconds;
  created?: boolean;
}

export type ReplaySpeed = 1 | 4 | 16;

export interface Replay {
  id: string;
  analysis_id: string;
  file_id: string;
  status: "playing" | "paused" | "ended";
  position_ts: UnixSeconds;
  speed: ReplaySpeed;
  from_ts: UnixSeconds;
  to_ts: UnixSeconds;
  record_start: UnixSeconds;
  record_end: UnixSeconds;
  progress: number;
}

export type ReplayMessage =
  | { type: "state"; replay: Replay }
  | { type: "tick"; replay: Replay; frames: Frame[] }
  | { type: "removed"; replay_id: string };
