// src/components/NightMovement/usePan.ts

// 그래프 가로 이동: 가로 휠(트랙패드·Shift+휠)과 끌기로 시간 축을 옮긴다

import { useEffect, useEffectEvent, useRef, useState } from "react";
import type { PointerEvent } from "react";

// onPan(deltaMs): 양수면 최근 쪽, 음수면 과거 쪽으로
export function usePan(onPan: ((deltaMs: number) => void) | undefined, msPerPx: number) {
  const targetRef = useRef<SVGRectElement>(null);
  const lastX = useRef<number | null>(null);
  const [dragging, setDragging] = useState(false);
  const enabled = !!onPan;

  const panBy = useEffectEvent((px: number) => onPan?.(px * msPerPx));

  // React의 onWheel은 passive라 기본 동작(페이지 가로 스크롤·뒤로 가기)을 막을 수 없어 직접 등록한다
  useEffect(() => {
    const element = targetRef.current;
    if (!element || !enabled) return;
    const handleWheel = (e: WheelEvent) => {
      const unit = e.deltaMode === 1 ? 16 : 1;
      const horizontal = e.shiftKey ? e.deltaX || e.deltaY : Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : 0;
      if (!horizontal) return; // 세로 휠은 페이지 스크롤에 맡긴다
      e.preventDefault();
      panBy(horizontal * unit);
    };
    element.addEventListener("wheel", handleWheel, { passive: false });
    return () => element.removeEventListener("wheel", handleWheel);
  }, [enabled]);

  const handlers = enabled
    ? {
        onPointerDown: (e: PointerEvent<SVGRectElement>) => {
          if (e.button !== 0) return;
          e.currentTarget.setPointerCapture(e.pointerId);
          lastX.current = e.clientX;
          setDragging(true);
        },
        onPointerUp: () => {
          lastX.current = null;
          setDragging(false);
        },
        onPointerCancel: () => {
          lastX.current = null;
          setDragging(false);
        },
      }
    : {};

  // 끄는 중이면 이동량을 넘기고 true를 돌려준다 (그동안 툴팁은 숨김)
  const dragMove = (e: PointerEvent<SVGRectElement>) => {
    if (lastX.current === null || !onPan) return false;
    onPan(-(e.clientX - lastX.current) * msPerPx); // 오른쪽으로 끌면 과거가 보인다
    lastX.current = e.clientX;
    return true;
  };

  return { panRef: targetRef, panHandlers: handlers, dragMove, dragging, panEnabled: enabled };
}
