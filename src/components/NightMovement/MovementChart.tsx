// src/components/NightMovement/MovementChart.tsx

// 시간별 움직임 강도: 면적 그래프 + 주요 움직임 구간(분홍 띠·말풍선) + 재생 위치 + 마우스 툴팁

import { useId, useMemo, useState } from "react";
import type { PointerEvent } from "react";

import * as S from "../../styles/NightMovement/Charts";
import { chartColors } from "../../styles/NightMovement/Charts";
import type { CsiAnalysis } from "../../utils/csiAnalysis";
import { placeCallouts } from "../../utils/chartCallouts";
import { formatClock, formatTick, timeTicks, valueTicks } from "../../utils/chartScale";
import type { TimeView } from "../../utils/chartScale";
import ChartCallout from "./ChartCallout";
import { useElementWidth } from "./useElementWidth";

const PAD = { left: 84, right: 14, top: 10, bottom: 50 };

interface MovementChartProps {
  analysis: CsiAnalysis;
  view: TimeView;
  height: number;
  playheadMs?: number;
}

export default function MovementChart({ analysis, view, height, playheadMs }: MovementChartProps) {
  const [ref, width] = useElementWidth<HTMLDivElement>();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const gradientId = useId();

  const span = Math.max(1, view.endMs - view.startMs);
  const plot = { left: PAD.left, right: Math.max(PAD.left + 1, width - PAD.right), top: PAD.top, bottom: height - PAD.bottom };
  const plotW = plot.right - plot.left;
  const plotH = plot.bottom - plot.top;
  const toX = (ms: number) => plot.left + ((ms - view.startMs) / span) * plotW;

  // 보이는 구간의 점 (구간 중앙 시각 기준)
  const points = useMemo(() => {
    const list: { t: number; v: number }[] = [];
    for (let b = 0; b < analysis.binCount; b++) {
      const t = analysis.startMs + (b + 0.5) * analysis.binMs;
      if (t >= view.startMs && t <= view.endMs) list.push({ t, v: analysis.motion[b] });
    }
    return list;
  }, [analysis, view.startMs, view.endMs]);

  const finiteValues = points.filter((p) => !Number.isNaN(p.v)).map((p) => p.v);
  const y = valueTicks(Math.max(...finiteValues, analysis.motionThreshold) * 1.15);
  const toY = (v: number) => plot.bottom - (v / y.max) * plotH;

  // 신호가 빈 구간에서는 선을 끊는다
  const runs: { t: number; v: number }[][] = [];
  for (const point of points) {
    if (Number.isNaN(point.v)) {
      if (runs.at(-1)?.length) runs.push([]);
      continue;
    }
    if (runs.length === 0) runs.push([]);
    runs.at(-1)!.push(point);
  }
  const linePath = (run: { t: number; v: number }[]) =>
    run.map((p, i) => `${i === 0 ? "M" : "L"}${toX(p.t).toFixed(1)},${toY(p.v).toFixed(1)}`).join("");

  const segments = analysis.segments.filter((s) => s.endMs >= view.startMs && s.startMs <= view.endMs);
  const callouts = placeCallouts(segments, toX, plot, 2);
  const x = timeTicks(view, Math.max(2, Math.floor(plotW / 84)));
  const showSeconds = span < 10 * 60 * 1000;

  const handlePointerMove = (e: PointerEvent<SVGRectElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const t = view.startMs + ((e.clientX - rect.left) / rect.width) * span;
    let nearest = -1;
    let best = Infinity;
    points.forEach((p, i) => {
      const distance = Math.abs(p.t - t);
      if (distance < best && !Number.isNaN(p.v)) {
        best = distance;
        nearest = i;
      }
    });
    setHoverIndex(nearest >= 0 ? nearest : null);
  };

  const hover = hoverIndex !== null ? points[hoverIndex] : null;

  return (
    <S.ChartWrap ref={ref} $height={height}>
      {width > 0 && (
        <S.Svg
          width={width}
          height={height}
          role="img"
          aria-label={`움직임 강도 그래프, ${formatClock(view.startMs)}부터 ${formatClock(view.endMs)}까지, 주요 움직임 ${segments.length}건`}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={chartColors.area} stopOpacity={0.28} />
              <stop offset="100%" stopColor={chartColors.area} stopOpacity={0.02} />
            </linearGradient>
          </defs>

          {/* 배경 · 눈금 */}
          <rect x={plot.left} y={plot.top} width={plotW} height={plotH} fill={chartColors.plotBg} />
          {y.ticks.map((tick) => (
            <g key={tick}>
              <line x1={plot.left} x2={plot.right} y1={toY(tick)} y2={toY(tick)} stroke={chartColors.grid} />
              <text x={plot.left - 8} y={toY(tick) + 4} fontSize={11} textAnchor="end" fill={chartColors.axisText}>
                {tick.toFixed(y.decimals)}
              </text>
            </g>
          ))}
          <text fontSize={11} fill={chartColors.axisText}>
            <tspan x={4} y={plot.top + plotH / 2 - 4}>
              움직임 강도
            </tspan>
            <tspan x={4} dy={15}>
              (지수)
            </tspan>
          </text>
          {x.ticks.map((tick) => (
            <g key={tick}>
              <line x1={toX(tick)} x2={toX(tick)} y1={plot.bottom} y2={plot.bottom + 4} stroke={chartColors.axisText} />
              <text x={toX(tick)} y={plot.bottom + 18} fontSize={11} textAnchor="middle" fill={chartColors.axisText}>
                {formatTick(tick, x.step)}
              </text>
            </g>
          ))}
          <line x1={plot.left} x2={plot.left} y1={plot.top} y2={plot.bottom} stroke={chartColors.axisText} strokeOpacity={0.5} />

          {/* 주요 움직임 구간 */}
          {segments.map((segment) => {
            const x1 = Math.max(plot.left, toX(segment.startMs));
            const x2 = Math.min(plot.right, toX(segment.endMs));
            const center = (x1 + x2) / 2;
            const bandWidth = Math.max(8, x2 - x1);
            return (
              <rect
                key={segment.startMs}
                x={center - bandWidth / 2}
                y={plot.top}
                width={bandWidth}
                height={plotH}
                fill={chartColors.band}
              />
            );
          })}

          {/* 움직임 강도 */}
          {runs.map((run) =>
            run.length > 1 ? (
              <g key={run[0].t}>
                <path
                  d={`${linePath(run)}L${toX(run.at(-1)!.t).toFixed(1)},${plot.bottom}L${toX(run[0].t).toFixed(1)},${plot.bottom}Z`}
                  fill={`url(#${gradientId})`}
                />
                <path d={linePath(run)} fill="none" stroke={chartColors.line} strokeWidth={2} strokeLinejoin="round" />
              </g>
            ) : null,
          )}

          {/* 말풍선 · 점선 */}
          {callouts.map((callout) => (
            <line
              key={`line-${callout.segment.startMs}`}
              x1={callout.lineX}
              x2={callout.lineX}
              y1={callout.boxY + 18}
              y2={plot.bottom}
              stroke={chartColors.marker}
              strokeWidth={1.2}
              strokeDasharray="4 3"
            />
          ))}
          {callouts.map((callout) => (
            <ChartCallout key={callout.segment.startMs} callout={callout} showSeconds={showSeconds} />
          ))}

          {/* 재생 위치 */}
          {playheadMs !== undefined && playheadMs >= view.startMs && playheadMs <= view.endMs && (
            <line x1={toX(playheadMs)} x2={toX(playheadMs)} y1={plot.top} y2={plot.bottom} stroke={chartColors.line} strokeWidth={2} />
          )}

          {/* 범례 */}
          <g transform={`translate(${plot.left}, ${height - 10})`} fontSize={12} fill={chartColors.axisText}>
            <line x1={0} x2={20} y1={-4} y2={-4} stroke={chartColors.line} strokeWidth={3} strokeLinecap="round" />
            <text x={28} y={0}>
              움직임 강도
            </text>
            <rect x={112} y={-10} width={20} height={12} rx={2} fill={chartColors.band} />
            <text x={140} y={0}>
              주요 움직임 구간
            </text>
          </g>

          {/* 마우스 위치 */}
          {hover && (
            <g pointerEvents="none">
              <line x1={toX(hover.t)} x2={toX(hover.t)} y1={plot.top} y2={plot.bottom} stroke={chartColors.navy} strokeOpacity={0.35} />
              <circle cx={toX(hover.t)} cy={toY(hover.v)} r={4.5} fill={chartColors.line} stroke="#FFFFFF" strokeWidth={2} />
            </g>
          )}
          <rect
            x={plot.left}
            y={plot.top}
            width={plotW}
            height={plotH}
            fill="transparent"
            onPointerMove={handlePointerMove}
            onPointerLeave={() => setHoverIndex(null)}
          />
        </S.Svg>
      )}

      {width > 0 && points.length === 0 && <S.EmptyMessage>표시할 데이터가 없습니다.</S.EmptyMessage>}

      {hover && (
        <S.Tooltip style={{ left: Math.min(toX(hover.t) + 12, width - 128), top: plot.top + 8 }}>
          <span>{formatClock(hover.t)}</span>
          <div>
            움직임 강도 <strong>{hover.v.toFixed(3)}</strong>
          </div>
        </S.Tooltip>
      )}
    </S.ChartWrap>
  );
}
