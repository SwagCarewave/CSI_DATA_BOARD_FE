// src/components/NightMovement/HeatmapChart.tsx

// 시간별 Wi-Fi 신호 변화: 시간 × 서브캐리어 진폭 히트맵 (수신기 평균) + 색 막대 + 주요 움직임 표시

import { useEffect, useId, useRef, useState } from "react";
import type { PointerEvent } from "react";

import * as S from "../../styles/NightMovement/Charts";
import { chartColors } from "../../styles/NightMovement/Charts";
import type { CsiAnalysis } from "../../utils/csiAnalysis";
import { placeCallouts } from "../../utils/chartCallouts";
import { formatClock, formatTick, jetColor, jetGradientStops, timeTicks, valueTicks } from "../../utils/chartScale";
import type { TimeView } from "../../utils/chartScale";
import ChartCallout from "./ChartCallout";
import { useElementWidth } from "./useElementWidth";

const PAD = { left: 84, right: 62, top: 14, bottom: 22 };

interface HeatmapChartProps {
  analysis: CsiAnalysis;
  view: TimeView;
  height: number;
  playheadMs?: number;
}

export default function HeatmapChart({ analysis, view, height, playheadMs }: HeatmapChartProps) {
  const [ref, width] = useElementWidth<HTMLDivElement>();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hover, setHover] = useState<{ x: number; y: number; t: number; sub: number; value: number } | null>(null);
  const gradientId = useId();

  const { binMs, binCount, subcarrierCount, heatmap, heatmapMax } = analysis;
  const span = Math.max(1, view.endMs - view.startMs);
  const plot = { left: PAD.left, right: Math.max(PAD.left + 1, width - PAD.right), top: PAD.top, bottom: height - PAD.bottom };
  const plotW = plot.right - plot.left;
  const plotH = plot.bottom - plot.top;
  const toX = (ms: number) => plot.left + ((ms - view.startMs) / span) * plotW;

  const firstBin = Math.max(0, Math.floor((view.startMs - analysis.startMs) / binMs));
  const lastBin = Math.min(binCount - 1, Math.ceil((view.endMs - analysis.startMs) / binMs) - 1);

  // 히트맵 칸 그리기
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || width === 0 || lastBin < firstBin) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(plotW * dpr);
    canvas.height = Math.round(plotH * dpr);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const columns = lastBin - firstBin + 1;
    const offscreen = document.createElement("canvas");
    offscreen.width = columns;
    offscreen.height = subcarrierCount;
    const offCtx = offscreen.getContext("2d");
    if (!offCtx) return;

    const image = offCtx.createImageData(columns, subcarrierCount);
    for (let c = 0; c < columns; c++) {
      for (let k = 0; k < subcarrierCount; k++) {
        const value = heatmap[(firstBin + c) * subcarrierCount + k];
        const pixel = ((subcarrierCount - 1 - k) * columns + c) * 4; // 0번 서브캐리어가 아래
        if (Number.isNaN(value)) continue; // 신호 공백은 비워 둔다
        const [r, g, b] = jetColor(value / heatmapMax);
        image.data.set([r, g, b, 255], pixel);
      }
    }
    offCtx.putImageData(image, 0, 0);

    const binStartX = ((analysis.startMs + firstBin * binMs - view.startMs) / span) * plotW;
    const binEndX = ((analysis.startMs + (lastBin + 1) * binMs - view.startMs) / span) * plotW;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, plotW, plotH);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(offscreen, binStartX, 0, binEndX - binStartX, plotH);
  }, [analysis, heatmap, heatmapMax, subcarrierCount, binMs, firstBin, lastBin, plotW, plotH, span, view.startMs, width]);

  const x = timeTicks(view, Math.max(2, Math.floor(plotW / 84)));
  // 시안처럼 10 단위 (서브캐리어가 적으면 5 단위)
  const subStep = subcarrierCount > 30 ? 10 : 5;
  const subTicks = Array.from({ length: Math.floor((subcarrierCount - 1) / subStep) + 1 }, (_, i) => i * subStep);
  const colorTicks = valueTicks(heatmapMax).ticks.filter((tick) => tick <= heatmapMax);
  const toSubY = (sub: number) => plot.bottom - ((sub + 0.5) / subcarrierCount) * plotH;
  const toColorY = (value: number) => plot.bottom - (value / heatmapMax) * plotH;

  const segments = analysis.segments.filter((s) => s.endMs >= view.startMs && s.startMs <= view.endMs);
  const callouts = plotH > 70 ? placeCallouts(segments, toX, plot, 1) : [];
  const showSeconds = span < 10 * 60 * 1000;

  const handlePointerMove = (e: PointerEvent<SVGRectElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    const t = view.startMs + (px / rect.width) * span;
    const bin = Math.floor((t - analysis.startMs) / binMs);
    const sub = Math.min(subcarrierCount - 1, Math.max(0, Math.floor(((rect.height - py) / rect.height) * subcarrierCount)));
    if (bin < 0 || bin >= binCount) return setHover(null);
    const value = heatmap[bin * subcarrierCount + sub];
    setHover(Number.isNaN(value) ? null : { x: plot.left + px, y: plot.top + py, t, sub, value });
  };

  return (
    <S.ChartWrap ref={ref} $height={height}>
      {width > 0 && (
        <>
          <S.HeatCanvas
            ref={canvasRef}
            style={{ left: plot.left, top: plot.top, width: plotW, height: plotH, background: chartColors.plotBg }}
            aria-hidden="true"
          />
          <S.Svg
            width={width}
            height={height}
            role="img"
            aria-label={`CSI 신호 히트맵, 서브캐리어 ${subcarrierCount}개, ${formatClock(view.startMs)}부터 ${formatClock(view.endMs)}까지`}
          >
            <defs>
              <linearGradient id={gradientId} x1="0" y1="1" x2="0" y2="0">
                {jetGradientStops.map((stop) => (
                  <stop key={stop.offset} offset={stop.offset} stopColor={stop.color} />
                ))}
              </linearGradient>
            </defs>

            {/* 축 */}
            <text fontSize={11} fill={chartColors.axisText}>
              <tspan x={4} y={plot.top + plotH / 2 - 4}>
                서브캐리어
              </tspan>
              <tspan x={4} dy={15}>
                인덱스
              </tspan>
            </text>
            {subTicks.map((tick) => (
              <text key={tick} x={plot.left - 8} y={toSubY(tick) + 4} fontSize={11} textAnchor="end" fill={chartColors.axisText}>
                {tick}
              </text>
            ))}
            {x.ticks.map((tick) => (
              <g key={tick}>
                <line x1={toX(tick)} x2={toX(tick)} y1={plot.bottom} y2={plot.bottom + 4} stroke={chartColors.axisText} />
                <text x={toX(tick)} y={plot.bottom + 17} fontSize={11} textAnchor="middle" fill={chartColors.axisText}>
                  {formatTick(tick, x.step)}
                </text>
              </g>
            ))}

            {/* 색 막대 */}
            <text x={width - PAD.right + 23} y={plot.top - 4} fontSize={10} textAnchor="middle" fill={chartColors.axisText}>
              신호 강도
            </text>
            <rect x={width - PAD.right + 18} y={plot.top} width={10} height={plotH} fill={`url(#${gradientId})`} />
            {colorTicks.map((tick) => (
              <text key={tick} x={width - PAD.right + 34} y={toColorY(tick) + 4} fontSize={10} fill={chartColors.axisText}>
                {tick}
              </text>
            ))}

            {/* 주요 움직임 */}
            {segments.map((segment) => (
              <line
                key={segment.startMs}
                x1={toX(segment.peakMs)}
                x2={toX(segment.peakMs)}
                y1={plot.top}
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

            {hover && (
              <rect x={hover.x - 3} y={hover.y - 3} width={6} height={6} fill="none" stroke="#FFFFFF" strokeWidth={1.5} pointerEvents="none" />
            )}
            <rect
              x={plot.left}
              y={plot.top}
              width={plotW}
              height={plotH}
              fill="transparent"
              onPointerMove={handlePointerMove}
              onPointerLeave={() => setHover(null)}
            />
          </S.Svg>
        </>
      )}

      {hover && (
        <S.Tooltip style={{ left: Math.min(hover.x + 12, width - 128), top: Math.max(0, hover.y - 64) }}>
          <span>{formatClock(hover.t)}</span>
          <div>
            서브캐리어 <strong>{hover.sub}</strong>
          </div>
          <div>
            진폭 <strong>{hover.value.toFixed(1)}</strong>
          </div>
        </S.Tooltip>
      )}
    </S.ChartWrap>
  );
}
