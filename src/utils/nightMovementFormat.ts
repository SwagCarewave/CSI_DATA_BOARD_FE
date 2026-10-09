// src/utils/nightMovementFormat.ts

import type { ActivityEvent, EventStatus } from "../data/nightMovement";

const pad = (value: number) => String(value).padStart(2, "0");

export const formatTime = (date: Date, withSeconds = false) =>
  `${pad(date.getHours())}:${pad(date.getMinutes())}${withSeconds ? `:${pad(date.getSeconds())}` : ""}`;

// 1시간보다 짧은 기록은 초까지 보여준다
export const needsSeconds = (start: Date, end: Date) => end.getTime() - start.getTime() < 60 * 60 * 1000;

export const formatMonthDay = (date: Date) => `${date.getMonth() + 1}월 ${date.getDate()}일`;

// 2026.10.05 22:00 ~ 10.06 08:00
export const formatRecordRange = (start: Date, end: Date) => {
  const seconds = needsSeconds(start, end);
  return (
    `${start.getFullYear()}.${pad(start.getMonth() + 1)}.${pad(start.getDate())} ${formatTime(start, seconds)} ~ ` +
    `${pad(end.getMonth() + 1)}.${pad(end.getDate())} ${formatTime(end, seconds)}`
  );
};

// 10시간 / 9시간 30분 / 40분 / 13초
export const formatDuration = (ms: number) => {
  if (ms < 60000) return `${Math.max(0, Math.round(ms / 1000))}초`;
  const totalMinutes = Math.max(0, Math.round(ms / 60000));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours === 0) return `${minutes}분`;
  return minutes === 0 ? `${hours}시간` : `${hours}시간 ${minutes}분`;
};

export const eventTimeRange = (event: ActivityEvent) =>
  `${event.start} – ${event.end} (${event.durationSec}초)`;

export const eventStatusLabel: Record<EventStatus, string> = {
  pending: "보호자 확인 대기",
  normal: "정상 활동 확인 완료",
  help: "도움 필요 확인 완료",
  false: "잘못된 감지 확인 완료",
};
