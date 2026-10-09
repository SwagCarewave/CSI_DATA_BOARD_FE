// src/utils/chartCallouts.ts

// 그래프·히트맵 공통: 주요 움직임 구간 말풍선 배치

import type { MotionSegment } from "./csiAnalysis";

export const CALLOUT_WIDTH = 92;
export const CALLOUT_HEIGHT = 36;

export interface PlacedCallout {
  segment: MotionSegment;
  lineX: number;
  boxX: number;
  boxY: number;
}

// 말풍선이 겹치지 않도록 위아래로 단을 나눈다 (최대 levels단, 넘치면 생략)
export function placeCallouts(
  segments: MotionSegment[],
  toX: (ms: number) => number,
  plot: { left: number; right: number; top: number },
  levels: number,
): PlacedCallout[] {
  const lastRightByLevel = new Array<number>(levels).fill(-Infinity);
  const placed: PlacedCallout[] = [];

  for (const segment of segments) {
    const lineX = toX(segment.peakMs);
    let boxX = lineX + 6;
    if (boxX + CALLOUT_WIDTH > plot.right) boxX = lineX - 6 - CALLOUT_WIDTH;
    boxX = Math.max(plot.left, boxX);

    const level = lastRightByLevel.findIndex((right) => boxX > right + 4);
    if (level < 0) continue;
    lastRightByLevel[level] = boxX + CALLOUT_WIDTH;
    placed.push({ segment, lineX, boxX, boxY: plot.top + 4 + level * (CALLOUT_HEIGHT + 6) });
  }
  return placed;
}
