// src/components/ChristmasGame/Stage.tsx

// 피그마 크기(width × height)로 그린 화면을 창 크기에 맞춰 비율 그대로 키우고 줄인다 + 눈 내리기

import { useSyncExternalStore } from "react";
import type { ReactNode } from "react";

import { Canvas, Viewport } from "../../styles/ChristmasGame/common";
import Snow from "./Snow";

const subscribe = (onChange: () => void) => {
  window.addEventListener("resize", onChange);
  return () => window.removeEventListener("resize", onChange);
};
const getWindowSize = () => `${window.innerWidth}x${window.innerHeight}`;

interface StageProps {
  width: number;
  height: number;
  children: ReactNode;
  label: string;
}

export default function Stage({ width, height, children, label }: StageProps) {
  const size = useSyncExternalStore(subscribe, getWindowSize);
  const [viewW, viewH] = size.split("x").map(Number);
  const scale = Math.min(viewW / width, viewH / height);

  return (
    <Viewport aria-label={label}>
      <Canvas style={{ width, height, transform: `scale(${scale})` }}>
        {children}
        <Snow width={width} height={height} />
      </Canvas>
    </Viewport>
  );
}
