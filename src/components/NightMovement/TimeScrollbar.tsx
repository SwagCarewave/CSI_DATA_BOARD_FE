// src/components/NightMovement/TimeScrollbar.tsx

// 실시간 그래프 가로 스크롤 막대: 쌓인 기록 중 지금 보이는 구간을 손잡이로 보여 주고, 끌거나 눌러서 옮긴다

import { useRef } from "react";
import type { KeyboardEvent, PointerEvent } from "react";

import * as S from "../../styles/NightMovement/Charts";
import { formatClock } from "../../utils/chartScale";
import type { TimeView } from "../../utils/chartScale";

const MIN_THUMB = 28;

interface TimeScrollbarProps {
  total: TimeView;
  view: TimeView;
  left: number;
  top: number;
  width: number;
  onScrollTo: (startMs: number) => void;
}

export default function TimeScrollbar({ total, view, left, top, width, onScrollTo }: TimeScrollbarProps) {
  const drag = useRef<{ x: number; startMs: number } | null>(null);

  const totalSpan = total.endMs - total.startMs;
  const viewSpan = view.endMs - view.startMs;
  if (totalSpan <= viewSpan || width <= MIN_THUMB) return null;

  const thumbW = Math.max(MIN_THUMB, (viewSpan / totalSpan) * width);
  const travel = width - thumbW;
  const msPerPx = (totalSpan - viewSpan) / travel;
  const ratio = Math.min(1, Math.max(0, (view.startMs - total.startMs) / (totalSpan - viewSpan)));

  const handleTrackDown = (e: PointerEvent<HTMLDivElement>) => {
    // 빈 곳을 누르면 그 위치가 손잡이 가운데로 오게
    const px = e.clientX - e.currentTarget.getBoundingClientRect().left - thumbW / 2;
    onScrollTo(total.startMs + Math.min(travel, Math.max(0, px)) * msPerPx);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = viewSpan / 5;
    const target =
      e.key === "ArrowLeft" ? view.startMs - step
      : e.key === "ArrowRight" ? view.startMs + step
      : e.key === "Home" ? total.startMs
      : e.key === "End" ? total.endMs
      : null;
    if (target === null) return;
    e.preventDefault();
    onScrollTo(target);
  };

  return (
    <S.ScrollTrack
      style={{ left, top, width }}
      role="scrollbar"
      tabIndex={0}
      aria-orientation="horizontal"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(ratio * 100)}
      aria-valuetext={`${formatClock(view.startMs)} ~ ${formatClock(view.endMs)}`}
      aria-label="그래프 시간 이동"
      onPointerDown={handleTrackDown}
      onKeyDown={handleKeyDown}
    >
      <S.ScrollThumb
        style={{ width: thumbW, transform: `translateX(${ratio * travel}px)` }}
        onPointerDown={(e) => {
          e.stopPropagation();
          e.currentTarget.setPointerCapture(e.pointerId);
          drag.current = { x: e.clientX, startMs: view.startMs };
        }}
        onPointerMove={(e) => {
          if (drag.current) onScrollTo(drag.current.startMs + (e.clientX - drag.current.x) * msPerPx);
        }}
        onPointerUp={() => (drag.current = null)}
        onPointerCancel={() => (drag.current = null)}
      />
    </S.ScrollTrack>
  );
}
