// src/components/NightMovement/useElementWidth.ts

import { useEffect, useRef, useState } from "react";

// 차트를 컨테이너 너비에 맞춰 다시 그리기 위해 너비를 추적한다
export function useElementWidth<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => setWidth(Math.floor(entry.contentRect.width)));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return [ref, width] as const;
}
