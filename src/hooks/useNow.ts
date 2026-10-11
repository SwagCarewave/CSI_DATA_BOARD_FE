// src/hooks/useNow.ts

import { useSyncExternalStore } from "react";

// 1초마다 바뀌는 현재 시각(ms, 초 단위로 내림). 관찰 시간·"N초 전" 표시용
const subscribe = (onChange: () => void) => {
  const timer = window.setInterval(onChange, 1000);
  return () => window.clearInterval(timer);
};
const getSnapshot = () => Math.floor(Date.now() / 1000) * 1000;

export function useNow() {
  return useSyncExternalStore(subscribe, getSnapshot);
}
