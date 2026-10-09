// src/styles/NightMovement/ActivityRecords.ts

import styled from "styled-components";

import { Card, cw, media } from "./tokens";
import type { EventStatus } from "../../data/nightMovement";

const eventTone: Record<EventStatus, { bg: string; iconBg: string; title: string; status: string }> = {
  pending: { bg: cw.pink, iconBg: cw.pinkIcon, title: cw.red, status: cw.red },
  normal: { bg: cw.pale, iconBg: cw.blueIcon, title: cw.navy, status: cw.muted },
  help: { bg: cw.pale, iconBg: cw.blueIcon, title: cw.navy, status: cw.red },
  false: { bg: cw.falseBg, iconBg: cw.falseIcon, title: cw.navy, status: cw.muted },
};

/* CareWave / Activity event */
export const EventCard = styled.button<{ $status: EventStatus }>`
  width: 100%;
  height: 72px;
  padding: 0 20px 0 14px;

  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;

  border-radius: 12px;
  background-color: ${({ $status }) => eventTone[$status].bg};

  text-align: left;
  transition: filter 0.15s ease;

  &:hover {
    filter: brightness(0.98);
  }

  &:focus-visible {
    outline: 2px solid ${cw.blue};
    outline-offset: 2px;
  }
`;

export const EventIcon = styled.span<{ $status: EventStatus }>`
  width: 44px;
  height: 44px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  border-radius: 50%;
  background-color: ${({ $status }) => eventTone[$status].iconBg};
`;

export const EventContent = styled.span`
  flex: 1;
  min-width: 0;

  display: flex;
  flex-direction: column;
  gap: 4px;

  white-space: nowrap;
`;

export const EventTitle = styled.span<{ $status: EventStatus }>`
  color: ${({ $status }) => eventTone[$status].title};
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
`;

export const EventTime = styled.span`
  overflow: hidden;

  color: ${cw.muted};
  font-size: 10px;
  line-height: 17px;
  text-overflow: ellipsis;
`;

export const EventStatusText = styled.span<{ $status: EventStatus; $inline?: boolean }>`
  flex-shrink: 0;

  color: ${({ $status }) => eventTone[$status].status};
  font-size: 11px;
  font-weight: 500;
  line-height: 17px;
  white-space: nowrap;

  /* 좁은 화면에서는 오른쪽 상태 문구를 시간 아래로 옮긴다 */
  display: ${({ $inline }) => ($inline ? "none" : "block")};

  ${media.mobile} {
    display: ${({ $inline }) => ($inline ? "block" : "none")};
  }
`;

/* 감지된 움직임 기록 */
export const RecordsCard = styled(Card)`
  flex: 0 0 390px;
  width: 390px;
  height: 416px;
  padding: 11px 15px 0;

  display: flex;
  flex-direction: column;
  overflow: hidden;

  ${media.laptop} {
    flex: none;
    width: 100%;
    height: auto;
    padding-bottom: 3px;
  }
`;

export const RecordsHeader = styled.div`
  width: 100%;
  height: 40px;
  gap: 12px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ViewAllButton = styled.button`
  width: 132px;
  height: 36px;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;

  border: 1px solid ${cw.border};
  border-radius: ${cw.radius};
  background-color: ${cw.white};

  color: ${cw.navy};
  font-size: 12px;
  font-weight: 700;
  line-height: 1.45;

  &:focus-visible {
    outline: 2px solid ${cw.blue};
    outline-offset: 2px;
  }
`;

export const Unconfirmed = styled.button<{ $compact: boolean; $empty: boolean }>`
  align-self: flex-start;
  margin-top: 8px;

  color: ${({ $empty }) => ($empty ? cw.muted : cw.red)};
  font-size: ${({ $compact }) => ($compact ? "12px" : "15px")};
  font-weight: 700;
  line-height: 20px;

  &:disabled {
    cursor: default;
  }
`;

export const EventList = styled.ul<{ $mt: number }>`
  width: 100%;
  margin-top: ${({ $mt }) => `${$mt}px`};
  padding-bottom: 12px;

  display: flex;
  flex-direction: column;
  gap: 6px;
  overflow-y: auto;

  list-style: none;
`;

export const EmptyText = styled.p`
  max-width: 340px;
  margin: 100px 0 0 8px;

  color: ${cw.muted};
  font-size: 14px;
  line-height: 1.45;

  ${media.laptop} {
    margin: 40px 0 40px 8px;
  }
`;
