// src/utils/signalSeries.ts

// 서버 그래프·히트맵 응답(열 형식)과 실시간 프레임을 차트용 데이터로 바꾼다.

import type { ApiEvent, CsvFile, Frame, Signals } from "../api/types";
import type { ActivityEvent, CsvRecord } from "../data/nightMovement";
import { guardianToStatus } from "../data/nightMovement";

export interface SignalSeries {
  ts: number[]; // ms
  activity: number[]; // 모델 활동 지수 0~1 (null → NaN, 빈 구간)
  threshold: number | null; // 모델 판정 기준선: 활동 지수가 이 값을 3초 넘게 넘으면 사건·알림
  heatmap: (number[] | null)[]; // 점마다 서브캐리어 진폭 (null → 빈 열)
  stepMs: number;
  subcarrierCount: number;
}

// 그래프에 표시할 활동 사건 구간
export interface ChartMarker {
  key: string;
  startMs: number;
  endMs: number;
  peakMs: number; // 말풍선·점선 위치 (알림 시각)
  label: string; // "움직임 급증" · "짧은 움직임"
  surge: boolean;
}

const SUBCARRIERS = 52;
const toMs = (seconds: number) => seconds * 1000;
const toNumber = (value: number | null | undefined) => (value === null || value === undefined ? NaN : value);

export function seriesFromSignals(signals: Signals): SignalSeries {
  return {
    ts: signals.ts.map(toMs),
    activity: signals.activity_score.map(toNumber),
    threshold: signals.activity_threshold,
    heatmap: signals.heatmap ?? signals.ts.map(() => null),
    stepMs: toMs(signals.step_sec || 0.5),
    subcarrierCount: signals.heatmap?.find(Boolean)?.length ?? SUBCARRIERS,
  };
}

// 실시간 프레임을 이어 붙이고 keepMs보다 오래된 점은 버린다
export function appendFrames(series: SignalSeries | null, frames: Frame[], keepMs: number): SignalSeries {
  const base: SignalSeries = series ?? {
    ts: [],
    activity: [],
    threshold: null,
    heatmap: [],
    stepMs: 500,
    subcarrierCount: SUBCARRIERS,
  };
  const lastTs = base.ts.at(-1) ?? -Infinity;
  const fresh = frames.filter((frame) => toMs(frame.ts) > lastTs).sort((a, b) => a.ts - b.ts);
  if (fresh.length === 0) return base;

  const ts = [...base.ts, ...fresh.map((frame) => toMs(frame.ts))];
  const activity = [...base.activity, ...fresh.map((frame) => toNumber(frame.activity_score))];
  const heatmap = [...base.heatmap, ...fresh.map((frame) => frame.heatmap)];

  const cutoff = ts[ts.length - 1] - keepMs;
  const first = Math.max(0, ts.findIndex((t) => t >= cutoff));
  return {
    ...base,
    ts: ts.slice(first),
    activity: activity.slice(first),
    heatmap: heatmap.slice(first),
    stepMs: base.ts.length ? base.stepMs : 500,
  };
}

export function markersFromEvents(events: ApiEvent[], nowMs: number): ChartMarker[] {
  return events.map((event) => {
    const durationSec = event.duration_sec;
    const label = event.label ?? (durationSec >= 10 ? "움직임 급증" : "짧은 움직임");
    return {
      key: event.id,
      startMs: toMs(event.started_at),
      endMs: event.ended_at ? toMs(event.ended_at) : nowMs,
      peakMs: toMs(event.alerted_at ?? event.started_at),
      label,
      surge: label === "움직임 급증",
    };
  });
}

const pad = (value: number) => String(value).padStart(2, "0");
const clock = (date: Date) => `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;

export function toActivityEvent(event: ApiEvent): ActivityEvent {
  const start = new Date(toMs(event.started_at));
  return {
    id: event.id,
    dateLabel: `${start.getMonth() + 1}월 ${start.getDate()}일`,
    start: clock(start),
    // 종료 시각이 없으면: 실시간은 아직 활동 중, CSV는 기록 끝까지 이어진 사건
    end: event.ended_at ? clock(new Date(toMs(event.ended_at))) : event.source === "csv" ? "기록 끝" : "진행 중",
    durationSec: Math.max(1, Math.round(event.duration_sec)),
    status: guardianToStatus(event.guardian_result),
    ongoing: event.ongoing,
  };
}

const analysisLabels: Record<string, string> = { queued: "분석 대기", running: "분석 중", failed: "분석 실패" };

export function toCsvRecord(file: CsvFile): CsvRecord {
  const status = file.latest_analysis?.status;
  return {
    id: file.id,
    name: file.filename,
    start: new Date(toMs(file.record_start)),
    end: new Date(toMs(file.record_end)),
    analysisLabel: status === "succeeded" ? null : status ? analysisLabels[status] : "분석 전",
  };
}
