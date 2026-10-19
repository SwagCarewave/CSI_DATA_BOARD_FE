// src/components/ChristmasGame/ModelPicker.tsx

// 모델 출력값 피커 + 화살표 말풍선 (피그마 Group 13 비율 그대로)
// 출력값이 바뀌면 픽커가 막대 위를 움직이고, 말풍선 화살표도 그 구간 방향으로 바뀐다

import styled, { keyframes } from "styled-components";

import { Picture } from "../../styles/ChristmasGame/common";
import { arrowImages, images } from "./assets";
import type { Direction } from "./mazeGame";

// 막대 그림(1138×339)에서 눈금 0 · 0.2 · 0.8 · 1 의 가로 위치 비율
const TICKS: [number, number][] = [
  [0, 0.11],
  [0.2, 0.274],
  [0.8, 0.708],
  [1, 0.88],
];

const toBarRatio = (value: number) => {
  const v = Math.min(1, Math.max(0, value));
  for (let i = 1; i < TICKS.length; i++) {
    const [v0, x0] = TICKS[i - 1];
    const [v1, x1] = TICKS[i];
    if (v <= v1) return x0 + ((v - v0) / (v1 - v0)) * (x1 - x0);
  }
  return TICKS.at(-1)![1];
};

const DIRECTION_LABEL: Record<Direction, string> = { up: "위", left: "왼쪽", right: "오른쪽" };

interface ModelPickerProps {
  left: number; // 묶음 왼쪽 위 (= 막대 왼쪽, 말풍선 위)
  top: number;
  width: number; // 막대 너비. 나머지 크기는 피그마 Group 13(막대 468px)의 비율로 계산
  value: number | null;
  direction: Direction | null;
}

export default function ModelPicker({ left, top, width, value, direction }: ModelPickerProps) {
  const k = width / 468;
  const bubble = { x: left + 132.2 * k, y: top, w: 202.7 * k, h: 189.3 * k };
  const bar = { y: top + 192.9 * k, h: 139.3 * k };
  const knob = { y: top + 226 * k, w: 80.4 * k, h: 98.2 * k };
  const arrow = 100 * k;
  const ratio = value === null ? null : toBarRatio(value);

  return (
    <>
      <Picture src={images.arrowBubble} alt="" style={{ left: bubble.x, top: bubble.y, width: bubble.w, height: bubble.h }} />
      {direction && (
        <BubbleArrow
          key={direction}
          src={arrowImages[direction]}
          alt={`현재 방향: ${DIRECTION_LABEL[direction]}`}
          style={{
            left: bubble.x + bubble.w * 0.5 - arrow / 2,
            top: bubble.y + bubble.h * 0.51 - arrow / 2,
            width: arrow,
            height: arrow,
          }}
        />
      )}

      <Picture src={images.pickerBar} alt="" style={{ left, top: bar.y, width, height: bar.h }} />
      {ratio !== null && (
        <Knob
          src={images.pickerKnob}
          alt=""
          role="meter"
          aria-label="모델 출력값"
          aria-valuemin={0}
          aria-valuemax={1}
          aria-valuenow={Number(value!.toFixed(2))}
          style={{
            left: 0,
            top: knob.y,
            width: knob.w,
            height: knob.h,
            transform: `translateX(${left + ratio * width - knob.w / 2}px)`,
          }}
        />
      )}
    </>
  );
}

const pop = keyframes`
  from {
    scale: 0.6;
    opacity: 0.4;
  }
`;

const BubbleArrow = styled(Picture)`
  animation: ${pop} 0.25s ease-out;
`;

const Knob = styled(Picture)`
  transition: transform 0.35s ease-out;
`;
