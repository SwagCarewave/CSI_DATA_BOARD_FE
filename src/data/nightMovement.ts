// src/data/nightMovement.ts

import type { CsiAnalysis } from "../utils/csiAnalysis";

import sample02Url from "./csi_raw/yena_fall_normal_02_csi_raw.csv?url";
import sample03Url from "./csi_raw/yena_fall_normal_03_csi_raw.csv?url";
import sample04Url from "./csi_raw/yena_fall_normal_04_csi_raw.csv?url";

export type EventStatus = "pending" | "normal" | "help" | "false";
export type ConfirmResult = Exclude<EventStatus, "pending">;

export interface ActivityEvent {
  id: string;
  dateLabel: string; // 예: "6월 25일"
  start: string; // "14:43:18"
  end: string; // "14:43:19"
  durationSec: number;
  status: EventStatus;
}

export type ReceiverState = "normal" | "weak" | "disconnected" | "notConnected";

export interface Receiver {
  device: string;
  state: ReceiverState;
}

export interface CsvRecord {
  id: string;
  name: string;
  start: Date;
  end: Date;
  receivers: string[];
  events: ActivityEvent[];
  analysis: CsiAnalysis;
}

// all: 기록 전체
export type GraphRange = "all" | "10m" | "30m" | "1h";

export const graphRangeOptions: { value: GraphRange; label: string; ms: number }[] = [
  { value: "all", label: "전체 기록", ms: Infinity },
  { value: "10m", label: "최근 10분", ms: 10 * 60 * 1000 },
  { value: "30m", label: "최근 30분", ms: 30 * 60 * 1000 },
  { value: "1h", label: "최근 1시간", ms: 60 * 60 * 1000 },
];

export const playbackSpeeds = [1, 4, 16] as const;
export type PlaybackSpeed = (typeof playbackSpeeds)[number];

export const confirmResultOptions: { value: ConfirmResult; label: string }[] = [
  { value: "normal", label: "정상 활동" },
  { value: "help", label: "도움 필요" },
  { value: "false", label: "잘못된 감지" },
];

export const realtimeInfo = {
  sleepMode: true,
  lastSignal: "2초 전",
};

export const initialReceivers: Receiver[] = [
  { device: "RX1", state: "normal" },
  { device: "RX2", state: "normal" },
  { device: "RX3", state: "normal" },
];

// 예시 CSI 원본 CSV (src/data/csi_raw)
export const sampleCsvFiles = [
  { name: "yena_fall_normal_02_csi_raw.csv", url: sample02Url },
  { name: "yena_fall_normal_03_csi_raw.csv", url: sample03Url },
  { name: "yena_fall_normal_04_csi_raw.csv", url: sample04Url },
];

// 실시간 화면은 실제 수신 데이터가 연결되기 전까지 예시 CSV 하나를 사용한다
export const realtimeDemoFile = sampleCsvFiles[0];

const pad = (value: number) => String(value).padStart(2, "0");
const clock = (date: Date) => `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;

// 분석에서 찾은 주요 움직임 구간을 활동 사건으로 만든다 (보호자 확인 전 상태)
export const eventsFromAnalysis = (recordId: string, analysis: CsiAnalysis): ActivityEvent[] =>
  analysis.segments.map((segment, index) => {
    const start = new Date(segment.startMs);
    return {
      id: `${recordId}-${index}`,
      dateLabel: `${start.getMonth() + 1}월 ${start.getDate()}일`,
      start: clock(start),
      // 1초 미만 구간도 시작·끝 시각이 같아 보이지 않도록 최소 1초로 표시
      end: clock(new Date(Math.max(segment.endMs, segment.startMs + 1000))),
      durationSec: Math.max(1, Math.round((segment.endMs - segment.startMs) / 1000)),
      status: "pending",
    };
  });

export const recordFromAnalysis = (id: string, name: string, analysis: CsiAnalysis): CsvRecord => ({
  id,
  name,
  start: new Date(analysis.startMs),
  end: new Date(analysis.endMs),
  receivers: analysis.receivers,
  events: eventsFromAnalysis(id, analysis),
  analysis,
});
