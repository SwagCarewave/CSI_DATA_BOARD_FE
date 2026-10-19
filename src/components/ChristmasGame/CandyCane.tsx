// src/components/ChristmasGame/CandyCane.tsx

// 지팡이 사탕 화살표 큐: 몸통 4칸(아래가 새것) + 갈고리 1칸
// 화살표마다 id를 key로 써서, 칸이 바뀌면 그 자리까지 미끄러지듯 움직인다 (밀려 올라가기 · 갈고리로 넘어가기)

import styled, { keyframes } from "styled-components";

import { Picture } from "../../styles/ChristmasGame/common";
import { arrowImages, images } from "./assets";
import type { Direction } from "./mazeGame";

// 지팡이 그림 안 칸 위치 (가로·세로 비율). 피그마 안내 그림의 빨간 상자로 맞춘 값
const SLOT_X = 0.29;
const SLOT_Y = [0.233, 0.395, 0.574, 0.74]; // 위 → 아래
const HOOK = { x: 0.745, y: 0.3 };
const ARROW_SIZE = 0.25; // 지팡이 너비 대비

// slot: 몸통 칸(0이 맨 위) / hook: 갈고리 / out: 맨 위에서 밀려 사라지는 중 / spent: 갈고리에서 쓰이고 사라지는 중
export type CanePlace = { slot: number } | "hook" | "out" | "spent";

export interface CaneArrow {
  id: number;
  direction: Direction;
  place: CanePlace;
}

const DIRECTION_LABEL: Record<Direction, string> = { up: "위", left: "왼쪽", right: "오른쪽" };

interface CandyCaneProps {
  left: number;
  top: number;
  width: number;
  arrows: CaneArrow[];
}

export default function CandyCane({ left, top, width, arrows }: CandyCaneProps) {
  const height = width * 2;
  const size = width * ARROW_SIZE;

  const positionOf = (place: CanePlace) => {
    if (place === "hook" || place === "spent") return { x: HOOK.x * width, y: HOOK.y * height };
    if (place === "out") return { x: SLOT_X * width, y: (SLOT_Y[0] - 0.12) * height };
    return { x: SLOT_X * width, y: SLOT_Y[place.slot] * height };
  };

  const hook = arrows.find((arrow) => arrow.place === "hook");
  const body = arrows.filter((arrow) => typeof arrow.place === "object");

  return (
    <Wrap
      style={{ left, top, width, height }}
      role="img"
      aria-label={`지팡이 사탕: 갈고리 ${hook ? DIRECTION_LABEL[hook.direction] : "비어 있음"}, 몸통 ${
        body.map((arrow) => DIRECTION_LABEL[arrow.direction]).join(", ") || "비어 있음"
      }`}
    >
      <Picture src={images.candyCane} alt="" style={{ left: 0, top: 0, width, height }} />
      {arrows.map((arrow) => {
        const { x, y } = positionOf(arrow.place);
        const fading = arrow.place === "out" || arrow.place === "spent";
        return (
          <Arrow
            key={arrow.id}
            src={arrowImages[arrow.direction]}
            alt=""
            style={{
              width: size,
              height: size,
              transform: `translate(${x - size / 2}px, ${y - size / 2}px)`,
              opacity: fading ? 0 : 1,
            }}
          />
        );
      })}
    </Wrap>
  );
}

const Wrap = styled.div`
  position: absolute;
`;

const appear = keyframes`
  from {
    opacity: 0;
    scale: 0.4;
  }
`;

const Arrow = styled.img`
  position: absolute;
  left: 0;
  top: 0;
  pointer-events: none;
  user-select: none;
  filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.3));

  transition:
    transform 0.55s cubic-bezier(0.34, 1.3, 0.64, 1),
    opacity 0.45s ease;
  animation: ${appear} 0.35s ease-out;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    animation: none;
  }
`;
