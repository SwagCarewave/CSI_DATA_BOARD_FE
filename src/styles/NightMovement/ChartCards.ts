// src/styles/NightMovement/ChartCards.ts

import styled from "styled-components";

import { Card, cw, media } from "./tokens";

// 데스크톱에서는 Figma 좌표와 같은 결과가 나오도록 여백을 잡고,
// 화면이 줄면 이미지·재생선이 카드 너비에 맞춰 비율로 줄어든다.
export const ChartCard = styled(Card)<{ $minHeight: number }>`
  width: 100%;
  min-width: 0;
  min-height: ${({ $minHeight }) => `${$minHeight}px`};

  overflow: hidden;

  ${media.laptop} {
    min-height: 0;
    padding-bottom: 16px;
  }
`;

export const ChartHeader = styled.div<{ $pt: number }>`
  position: relative;
  padding: ${({ $pt }) => `${$pt}px`} 16px 0;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Subtitle = styled.div<{ $mt: number }>`
  margin-top: ${({ $mt }) => `${$mt}px`};
`;

export const Action = styled.div`
  position: absolute;
  top: 11px;
  right: 16px;

  ${media.tablet} {
    position: static;
    margin-top: 10px;
  }
`;

export const ChartBody = styled.div<{ $mt: number; $mobileMt: number; $scrollMinWidth: number }>`
  position: relative;
  margin-top: ${({ $mt }) => `${$mt}px`};

  ${media.tablet} {
    margin-top: ${({ $mobileMt }) => `${$mobileMt}px`};
    overflow-x: auto;

    & > * {
      min-width: ${({ $scrollMinWidth }) => `${$scrollMinWidth}px`};
    }
  }
`;

export const Placeholder = styled.div<{ $ml: number; $mr: number; $height: number }>`
  position: relative;
  height: ${({ $height }) => `${$height}px`};
  margin: ${({ $ml, $mr }) => `0 ${$mr}px 0 ${$ml}px`};

  border: 1px solid ${cw.border};
  border-radius: ${cw.radius};
  background-color: ${cw.pale};

  ${media.tablet} {
    margin: 0 16px;
  }
`;

export const PlaceholderText = styled.p<{ $left: number; $top: number }>`
  position: absolute;
  left: ${({ $left }) => `${$left}%`};
  top: ${({ $top }) => `${$top}%`};

  color: ${cw.muted};
  font-size: 14px;
  line-height: 1.45;
  white-space: nowrap;

  ${media.tablet} {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const AxisLabel = styled.p<{ $top: number }>`
  position: absolute;
  left: 16px;
  top: ${({ $top }) => `${$top}px`};

  color: ${cw.muted};
  font-size: 14px;
  line-height: 1.45;
  white-space: nowrap;

  ${media.tablet} {
    display: none;
  }
`;

export const Note = styled.p<{ $mt: number; $ml: number }>`
  margin: ${({ $mt, $ml }) => `${$mt}px 0 0 ${$ml}px`};

  color: ${cw.muted};
  font-size: 14px;
  line-height: 1.45;

  ${media.tablet} {
    margin-left: 16px;
  }
`;

// 그래프 컴포넌트가 들어가는 자리 (카드 안쪽 좌우 여백)
export const ChartSlot = styled.div`
  padding: 0 8px 0 4px;
`;
