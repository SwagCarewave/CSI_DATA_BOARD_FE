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
  state: string[]; // 점마다 서버가 판정한 관찰 상태 (sustained_activity, awaiting_confirmation 등)
  eventId: (number | null)[]; // 점이 속한 사건 번호 (사건 목록의 number와 같음)
  stepMs: number;
  subcarrierCount: number;
}

// 실제로 움직이는 중인 상태. 사건은 보호자가 확인할 때까지 열려 있으므로,
// "지금 움직이는지"는 사건이 아니라 점마다의 상태로 판단한다.
const ACTIVE_STATE = "sustained_activity";
const MOVING_STATES = new Set(["observing", ACTIVE_STATE]);

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
    state: signals.state,
    eventId: signals.event_id,
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
    state: [],
    eventId: [],
    stepMs: 500,
    subcarrierCount: SUBCARRIERS,
  };
  const lastTs = base.ts.at(-1) ?? -Infinity;
  const fresh = frames.filter((frame) => toMs(frame.ts) > lastTs).sort((a, b) => a.ts - b.ts);
  if (fresh.length === 0) return base;

  const ts = [...base.ts, ...fresh.map((frame) => toMs(frame.ts))];
  const activity = [...base.activity, ...fresh.map((frame) => toNumber(frame.activity_score))];
  const heatmap = [...base.heatmap, ...fresh.map((frame) => frame.heatmap)];
  const state = [...base.state, ...fresh.map((frame) => frame.state)];
  const eventId = [...base.eventId, ...fresh.map((frame) => frame.event_id)];

  const cutoff = ts[ts.length - 1] - keepMs;
  const first = Math.max(0, ts.findIndex((t) => t >= cutoff));
  return {
    ...base,
    ts: ts.slice(first),
    activity: activity.slice(first),
    heatmap: heatmap.slice(first),
    state: state.slice(first),
    eventId: eventId.slice(first),
    stepMs: base.ts.length ? base.stepMs : 500,
  };
}

// 빨간 "주요 움직임 구간": 활동 지수(움직임 수준)가 이 값 이상인 시간만 칠한다
export const HIGHLIGHT_LEVEL = 0.95;

// 활동 지수가 HIGHLIGHT_LEVEL 이상인 점들이 이어진 곳을 구간으로 만든다 (기준 미만인 점이 끼면 끊긴다)
export function activityBands(series: SignalSeries): { startMs: number; endMs: number }[] {
  const bands: { startMs: number; endMs: number }[] = [];
  const half = series.stepMs / 2;
  let previousIncluded = false;
  series.ts.forEach((t, i) => {
    const value = series.activity[i];
    const included = !Number.isNaN(value) && value >= HIGHLIGHT_LEVEL;
    if (included) {
      const last = bands.at(-1);
      if (previousIncluded && last) last.endMs = t + half;
      else bands.push({ startMs: t - half, endMs: t + half });
    }
    previousIncluded = included;
  });
  return bands;
}

// 지금(가장 최근 점) 움직이는 중인지
export function isMovingNow(series: SignalSeries | null) {
  const last = series?.state.at(-1);
  return last !== undefined && MOVING_STATES.has(last);
}

// 사건 번호별 마지막으로 지속 활동이 판정된 시각 (ms)
export function lastActiveByEvent(series: SignalSeries | null) {
  const result = new Map<number, number>();
  series?.ts.forEach((t, i) => {
    const id = series.eventId[i];
    if (id !== null && series.state[i] === ACTIVE_STATE) result.set(id, t);
  });
  return result;
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

// live: 실시간 사건이 아직 열려 있을 때, 지금 움직이는지와 마지막으로 움직인 시각
export function toActivityEvent(event: ApiEvent, live?: { movingNow: boolean; lastActiveMs?: number }): ActivityEvent {
  const start = new Date(toMs(event.started_at));
  let end: string;
  let durationSec = event.duration_sec;

  if (event.ended_at) {
    end = clock(new Date(toMs(event.ended_at)));
  } else if (event.source === "csv") {
    end = "기록 끝"; // 기록 끝까지 이어진 사건
  } else if (live?.movingNow) {
    end = "진행 중";
  } else if (live?.lastActiveMs) {
    // 사건은 보호자 확인 전이라 열려 있지만 움직임은 멈췄다 → 마지막으로 움직인 시각까지 표시
    end = clock(new Date(live.lastActiveMs));
    durationSec = (live.lastActiveMs - toMs(event.started_at)) / 1000;
  } else {
    end = "움직임 멈춤";
  }

  return {
    id: event.id,
    dateLabel: `${start.getMonth() + 1}월 ${start.getDate()}일`,
    start: clock(start),
    end,
    durationSec: Math.max(1, Math.round(durationSec)),
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
