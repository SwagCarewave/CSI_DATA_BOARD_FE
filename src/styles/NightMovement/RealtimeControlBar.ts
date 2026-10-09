// src/styles/NightMovement/RealtimeControlBar.ts

import styled from "styled-components";

import { Card, cw, media } from "./tokens";

export const Bar = styled(Card)`
  height: 94px;
  padding-left: 41px;

  display: flex;
  align-items: center;

  ${media.laptop} {
    height: auto;
    padding: 16px 20px;

    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px 24px;
  }
`;

export const Divider = styled.span`
  width: 1px;
  height: 50px;

  flex-shrink: 0;

  background-color: ${cw.border};

  ${media.laptop} {
    display: none;
  }
`;

export const Segment = styled.div<{ $width?: number; $pl?: number; $gap: number; $wide?: boolean }>`
  ${({ $width }) => ($width ? `width: ${$width}px;` : "")}
  padding-left: ${({ $pl = 0 }) => `${$pl}px`};

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ $gap }) => `${$gap}px`};
  flex-shrink: 0;

  ${media.laptop} {
    width: auto;
    min-width: 0;
    padding-left: 0;

    /* 장치 연결 상태는 한 줄 전체 사용 */
    ${({ $wide }) => ($wide ? "grid-column: 1 / -1;" : "")}
  }
`;

export const Label = styled.p<{ $small?: boolean }>`
  color: ${cw.navy};
  font-size: ${({ $small }) => ($small ? "13px" : "14px")};
  font-weight: 700;
  line-height: ${({ $small }) => ($small ? "18px" : 1.45)};
  white-space: nowrap;
`;

export const Value = styled.p`
  color: ${cw.navy};
  font-size: 20px;
  font-weight: 700;
  line-height: 1.45;
  white-space: nowrap;
`;

export const Switch = styled.button`
  width: 60px;
  height: 28px;

  display: block;

  border-radius: 14px;

  &:focus-visible {
    outline: 2px solid ${cw.blue};
    outline-offset: 2px;
  }
`;

export const Receivers = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;

  list-style: none;

  ${media.mobile} {
    gap: 8px;
  }
`;

export const SignalRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const SignalCaption = styled.span`
  opacity: 0.55;

  color: ${cw.navy};
  font-size: 12px;
  font-weight: 700;
  line-height: 1.45;
`;

/* CareWave / Receiver status */
export const ReceiverBadge = styled.li<{ $bg: string }>`
  width: 104px;
  height: 30px;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;

  border-radius: 8px;
  background-color: ${({ $bg }) => $bg};
`;

export const ReceiverName = styled.span`
  color: ${cw.navy};
  font-size: 12px;
  font-weight: 700;
`;

export const ReceiverState = styled.span<{ $color: string }>`
  color: ${({ $color }) => $color};
  font-size: 10px;
`;
