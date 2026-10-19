// src/styles/ChristmasGame/common.ts

import styled, { createGlobalStyle, css } from "styled-components";

import galmuri from "../../assets/졸작게임이미지/졸작게임이미지/폰트/Galmuri11.ttf";
import galmuriBold from "../../assets/졸작게임이미지/졸작게임이미지/폰트/Galmuri11-Bold.ttf";

export const gameColors = {
  ink: "#000000",
  wine: "#89170e",
  brown: "#4e191e",
  red: "#ff0000",
  alert: "#ff0018",
  green: "#009c00",
  leaf: "#299a00",
  highlight: "#fff7ae",
  panel: "rgba(255, 235, 236, 0.64)",
  night: "#0b0a1f",
};

export const GameFonts = createGlobalStyle`
  @font-face {
    font-family: "Galmuri11";
    src: url(${galmuri}) format("truetype");
    font-weight: 400;
    font-display: block;
  }

  @font-face {
    font-family: "Galmuri11";
    src: url(${galmuriBold}) format("truetype");
    font-weight: 700;
    font-display: block;
  }
`;

// 화면 밖(남는 공간)은 밤하늘색으로 채운다
export const Viewport = styled.main`
  position: fixed;
  inset: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  background-color: ${gameColors.night};
  font-family: "Galmuri11", monospace;
  -webkit-font-smoothing: none;
`;

// 피그마 크기 그대로 그린 뒤 화면에 맞춰 통째로 줄이고 늘린다
export const Canvas = styled.div`
  position: relative;
  flex-shrink: 0;
  overflow: hidden;
  transform-origin: center;
`;

// 피그마 좌표 그대로 놓는 이미지
export const Picture = styled.img`
  position: absolute;
  display: block;
  user-select: none;
  pointer-events: none;
  -webkit-user-drag: none;
`;

// 기획 요청: 호버·클릭 시 버튼이 살짝 어두워지며 빛이 나서 눌리는 느낌
const pressable = css`
  transition:
    filter 0.15s ease,
    transform 0.15s ease;

  &:hover:not(:disabled) {
    filter: brightness(0.9) drop-shadow(0 0 14px rgba(255, 214, 120, 0.85));
  }

  &:active:not(:disabled) {
    filter: brightness(0.78) drop-shadow(0 0 18px rgba(255, 196, 90, 0.95));
    transform: translateY(3px) scale(0.98);
  }

  &:focus-visible {
    outline: 3px solid #ffe28a;
    outline-offset: 4px;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

export const ImageButton = styled.button`
  position: absolute;
  padding: 0;

  & > img {
    display: block;
    width: 100%;
    height: 100%;
    pointer-events: none;
    user-select: none;
    -webkit-user-drag: none;
  }

  ${pressable}
`;

// 다음 페이지 버튼은 돌아가기 버튼을 좌우로 뒤집어 쓴다
export const FlippedImage = styled.img`
  transform: scaleX(-1);
`;

export const Text = styled.p<{ $size: number; $color?: string; $bold?: boolean }>`
  position: absolute;
  color: ${({ $color }) => $color ?? gameColors.ink};
  font-size: ${({ $size }) => `${$size}px`};
  font-weight: ${({ $bold = true }) => ($bold ? 700 : 400)};
  line-height: normal;
  white-space: nowrap;
`;

// 피그마 좌표 → style
export const at = (left: number, top: number, width?: number, height?: number) => ({ left, top, width, height });
