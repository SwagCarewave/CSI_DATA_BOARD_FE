// src/styles/NightMovement/Charts.ts

import styled from "styled-components";

import { cw } from "./tokens";

export const chartColors = {
  line: cw.blue,
  area: cw.blue,
  plotBg: cw.pale,
  grid: cw.border,
  axisText: cw.muted,
  band: "rgba(255, 54, 88, 0.13)",
  marker: cw.red,
  navy: cw.navy,
};

export const ChartWrap = styled.div<{ $height: number }>`
  position: relative;
  width: 100%;
  height: ${({ $height }) => `${$height}px`};

  font-family: inherit;
  user-select: none;
`;

export const Svg = styled.svg`
  position: absolute;
  inset: 0;
  overflow: visible;

  & text {
    font-family: inherit;
  }
`;

export const HeatCanvas = styled.canvas`
  position: absolute;
  display: block;
  image-rendering: auto;
`;

export const Tooltip = styled.div`
  position: absolute;
  z-index: 5;
  min-width: 112px;
  padding: 8px 10px;

  display: flex;
  flex-direction: column;
  gap: 2px;

  border: 1px solid ${cw.border};
  border-radius: 8px;
  background-color: ${cw.white};
  box-shadow: 0 6px 18px rgba(9, 29, 98, 0.14);
  pointer-events: none;

  color: ${cw.navy};
  font-size: 12px;
  line-height: 1.4;
  white-space: nowrap;

  & > span {
    color: ${cw.muted};
    font-size: 11px;
  }

  & strong {
    font-weight: 700;
  }
`;

// 실시간 그래프 가로 스크롤 막대
export const ScrollTrack = styled.div`
  position: absolute;
  z-index: 2;
  height: 8px;

  border-radius: 4px;
  background-color: ${cw.pale};
  box-shadow: inset 0 0 0 1px ${cw.border};
  cursor: pointer;
  touch-action: none;

  &:focus-visible {
    outline: 2px solid ${cw.blue};
    outline-offset: 2px;
  }
`;

export const ScrollThumb = styled.div`
  height: 100%;

  border-radius: 4px;
  background-color: ${cw.gray};
  cursor: grab;

  &:hover,
  &:active {
    background-color: ${cw.muted};
  }

  &:active {
    cursor: grabbing;
  }
`;

export const EmptyMessage = styled.p`
  position: absolute;
  inset: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  color: ${cw.muted};
  font-size: 14px;
`;
