// src/components/NightMovement/MovementChart.tsx

// 시간별 움직임 강도: 모델 활동 지수(0~1) 면적 그래프 + 판정 기준선 + 활동 사건 구간(분홍 띠·말풍선) + 재생 위치 + 마우스 툴팁

import { useId, useMemo, useState } from "react";
import type { PointerEvent } from "react";

import * as S from "../../styles/NightMovement/Charts";
import { chartColors } from "../../styles/NightMovement/Charts";
import { placeCallouts } from "../../utils/chartCallouts";
import { formatClock, formatTick, rangeTicks, timeTicks } from "../../utils/chartScale";
import type { TimeView } from "../../utils/chartScale";
import { activityBands } from "../../utils/signalSeries";
import type { ChartMarker, SignalSeries } from "../../utils/signalSeries";
import ChartCallout from "./ChartCallout";
import { useElementWidth } from "./useElementWidth";

const PAD = { left: 84, right: 14, top: 10, bottom: 50 };

interface MovementChartProps {
  series: SignalSeries;
  markers: ChartMarker[];
  view: TimeView;
  height: number;
  playheadMs?: number;
}

export default function MovementChart({ series, markers, view, height, playheadMs }: MovementChartProps) {
  const [ref, width] = useElementWidth<HTMLDivElement>();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const gradientId = useId();

  const span = Math.max(1, view.endMs - view.startMs);
  const plot = { left: PAD.left, right: Math.max(PAD.left + 1, width - PAD.right), top: PAD.top, bottom: height - PAD.bottom };
  const plotW = plot.right - plot.left;
  const plotH = plot.bottom - plot.top;
  const toX = (ms: number) => plot.left + ((ms - view.startMs) / span) * plotW;

  // 보이는 구간의 점
  const points = useMemo(() => {
    const list: { t: number; v: number }[] = [];
    series.ts.forEach((t, i) => {
      if (t >= view.startMs && t <= view.endMs) list.push({ t, v: series.activity[i] });
    });
    return list;
  }, [series, view.startMs, view.endMs]);

  const hasValues = points.some((p) => !Number.isNaN(p.v));
  // 활동 지수는 확률(0~1)이므로 축을 고정한다
  const y = rangeTicks(0, 1);
  const threshold = series.threshold;
  const toY = (v: number) => plot.bottom - ((v - y.min) / (y.max - y.min)) * plotH;
  const baselineY = toY(Math.max(y.min, 0));

  // 빈 구간(null)에서는 선을 끊는다
  const runs: { t: number; v: number }[][] = [];
  for (const point of points) {
    if (Number.isNaN(point.v)) {
      if (runs.at(-1)?.length) runs.push([]);
      continue;
    }
    if (runs.length === 0) runs.push([]);
    runs.at(-1)!.push(point);
  }
  // 데이터가 빈 값으로 끝나면 마지막에 빈 조각이 남으므로 제외한다
  const filledRuns = runs.filter((run) => run.length > 0);
  const linePath = (run: { t: number; v: number }[]) =>
    run.map((p, i) => `${i === 0 ? "M" : "L"}${toX(p.t).toFixed(1)},${toY(p.v).toFixed(1)}`).join("");

  const visibleMarkers = markers.filter((m) => m.endMs >= view.startMs && m.startMs <= view.endMs);
  // 빨간 구간은 활동 지수가 0.95 이상인 시간만
  const bands = useMemo(
    () => activityBands(series).filter((band) => band.endMs >= view.startMs && band.startMs <= view.endMs),
    [series, view.startMs, view.endMs],
  );
  const callouts = placeCallouts(
    visibleMarkers.filter((m) => m.peakMs >= view.startMs && m.peakMs <= view.endMs),
    toX,
    plot,
    2,
  );
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
          aria-label={`모델 활동 지수 그래프, ${formatClock(view.startMs)}부터 ${formatClock(view.endMs)}까지, 활동 사건 ${visibleMarkers.length}건`}
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
              활동 지수
            </tspan>
            <tspan x={4} dy={15}>
              (모델)
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

          {/* 주요 움직임 구간: 활동 지수 0.95 이상인 시간 */}
          {bands.map((band) => {
            const x1 = Math.max(plot.left, toX(band.startMs));
            const x2 = Math.min(plot.right, toX(band.endMs));
            const center = (x1 + x2) / 2;
            const bandWidth = Math.max(4, x2 - x1);
            return (
              <rect
                key={band.startMs}
                x={center - bandWidth / 2}
                y={plot.top}
                width={bandWidth}
                height={plotH}
                fill={chartColors.band}
              />
            );
          })}

          {/* 판정 기준선: 이 선을 3초 넘게 넘으면 사건·알림 */}
          {threshold !== null && (
            <g>
              <line
                x1={plot.left}
                x2={plot.right}
                y1={toY(threshold)}
                y2={toY(threshold)}
                stroke={chartColors.navy}
                strokeOpacity={0.55}
                strokeWidth={1.2}
                strokeDasharray="6 4"
              />
              <text x={plot.right - 4} y={toY(threshold) - 5} fontSize={10.5} textAnchor="end" fill={chartColors.navy}>
                판정 기준 {threshold.toFixed(2)}
              </text>
            </g>
          )}

          {/* 모델 활동 지수 */}
          {filledRuns.map((run) =>
            run.length > 1 ? (
              <g key={run[0].t}>
                <path
                  d={`${linePath(run)}L${toX(run.at(-1)!.t).toFixed(1)},${baselineY}L${toX(run[0].t).toFixed(1)},${baselineY}Z`}
                  fill={`url(#${gradientId})`}
                />
                <path d={linePath(run)} fill="none" stroke={chartColors.line} strokeWidth={2} strokeLinejoin="round" />
              </g>
            ) : (
              <circle key={run[0].t} cx={toX(run[0].t)} cy={toY(run[0].v)} r={2} fill={chartColors.line} />
            ),
          )}

          {/* 말풍선 · 점선 */}
          {callouts.map((callout) => (
            <line
              key={`line-${callout.marker.key}`}
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
            <ChartCallout key={callout.marker.key} callout={callout} showSeconds={showSeconds} />
          ))}

          {/* 재생 위치 */}
          {playheadMs !== undefined && playheadMs >= view.startMs && playheadMs <= view.endMs && (
            <line x1={toX(playheadMs)} x2={toX(playheadMs)} y1={plot.top} y2={plot.bottom} stroke={chartColors.line} strokeWidth={2} />
          )}

          {/* 범례 */}
          <g transform={`translate(${plot.left}, ${height - 10})`} fontSize={12} fill={chartColors.axisText}>
            <line x1={0} x2={20} y1={-4} y2={-4} stroke={chartColors.line} strokeWidth={3} strokeLinecap="round" />
            <text x={28} y={0}>
              활동 지수
            </text>
            <line
              x1={100}
              x2={120}
              y1={-4}
              y2={-4}
              stroke={chartColors.navy}
              strokeOpacity={0.55}
              strokeWidth={1.5}
              strokeDasharray="6 4"
            />
            <text x={128} y={0}>
              판정 기준선
            </text>
            <rect x={212} y={-10} width={20} height={12} rx={2} fill={chartColors.band} />
            <text x={240} y={0}>
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

      {width > 0 && !hasValues && (
        <S.EmptyMessage>표시할 데이터가 없습니다</S.EmptyMessage>
      )}

      {hover && (
        <S.Tooltip style={{ left: Math.min(toX(hover.t) + 12, width - 128), top: plot.top + 8 }}>
          <span>{formatClock(hover.t)}</span>
          <div>
            활동 지수 <strong>{hover.v.toFixed(2)}</strong>
          </div>
        </S.Tooltip>
      )}
    </S.ChartWrap>
  );
}
