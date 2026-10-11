// src/data/nightMovement.ts

// 화면에서 쓰는 데이터 형태와 선택지

import type { GuardianResult, ReplaySpeed, RxStatusCode } from "../api/types";

export type EventStatus = "pending" | "normal" | "help" | "false";
export type ConfirmResult = Exclude<EventStatus, "pending">;

export interface ActivityEvent {
  id: string; // 서버 사건 ID (UUID)
  dateLabel: string; // 예: "10월 6일"
  start: string; // "23:18:00"
  end: string; // "23:18:24" · 활동 중이면 "진행 중"
  durationSec: number;
  status: EventStatus;
  ongoing: boolean;
}

export type ReceiverState = "normal" | "weak" | "disconnected" | "notConnected";

export interface Receiver {
  device: string;
  state: ReceiverState;
}

// 등록된 CSV 파일 (드롭다운 표시용)
export interface CsvRecord {
  id: string;
  name: string;
  start: Date;
  end: Date;
  analysisLabel: string | null; // "분석 중", "분석 실패" 등. 분석 완료면 null
}

// 그래프 기간 (초). all: 기록 전체
export type GraphRange = "all" | "10m" | "30m" | "1h";

export const graphRangeOptions: { value: GraphRange; label: string; seconds: number }[] = [
  { value: "all", label: "전체 기록", seconds: Infinity },
  { value: "10m", label: "최근 10분", seconds: 600 },
  { value: "30m", label: "최근 30분", seconds: 1800 },
  { value: "1h", label: "최근 1시간", seconds: 3600 },
];

export const playbackSpeeds = [1, 4, 16] as const satisfies readonly ReplaySpeed[];
export type PlaybackSpeed = ReplaySpeed;

export const confirmResultOptions: { value: ConfirmResult; label: GuardianResult }[] = [
  { value: "normal", label: "정상 활동" },
  { value: "help", label: "도움 필요" },
  { value: "false", label: "잘못된 감지" },
];

export const resultToGuardian = (result: ConfirmResult): GuardianResult =>
  confirmResultOptions.find((option) => option.value === result)!.label;

export const guardianToStatus = (result: GuardianResult | null): EventStatus =>
  confirmResultOptions.find((option) => option.label === result)?.value ?? "pending";

export const rxStatusToState: Record<RxStatusCode, ReceiverState> = {
  ok: "normal",
  weak: "weak",
  lost: "disconnected",
  none: "notConnected",
};

export const defaultReceivers: Receiver[] = ["RX1", "RX2", "RX3"].map((device) => ({
  device,
  state: "notConnected",
}));
