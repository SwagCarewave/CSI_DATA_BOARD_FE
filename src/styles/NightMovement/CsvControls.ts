// src/styles/NightMovement/CsvControls.ts

import styled from "styled-components";

import { Card, cw, media } from "./tokens";

/* CSV 조회 도구 */
export const Toolbar = styled(Card)`
  height: 94px;
  padding: 0 21px 0 30px;

  display: flex;
  align-items: center;

  ${media.laptop} {
    height: auto;
    padding: 16px 20px;

    flex-wrap: wrap;
    gap: 12px 16px;
  }
`;

export const ToolbarTitle = styled.h2`
  margin-right: 20px;

  color: ${cw.navy};
  font-size: 20px;
  font-weight: 700;
  line-height: 1.45;
  white-space: nowrap;

  ${media.laptop} {
    margin-right: 0;
  }
`;

// 등록된 파일 드롭다운: 데스크톱 450px, 좁아지면 줄어든다
export const FileSelect = styled.div`
  position: relative;
  flex: 0 1 450px;
  min-width: 180px;

  & > button {
    width: 100%;
  }

  ${media.laptop} {
    flex: 1 1 260px;
  }
`;

export const ToolbarDivider = styled.span<{ $ml: number }>`
  width: 1px;
  height: 38px;
  margin-left: ${({ $ml }) => `${$ml}px`};

  flex-shrink: 0;

  background-color: ${cw.border};

  ${media.laptop} {
    display: none;
  }
`;

export const RecordTime = styled.div`
  flex: 0 1 300px;
  min-width: 0;
  padding-left: 40px;

  display: flex;
  flex-direction: column;
  gap: 4px;

  ${media.laptop} {
    order: 5;
    flex: 1 1 100%;
    padding-left: 0;
  }
`;

export const RecordTimeLabel = styled.p`
  color: ${cw.navy};
  font-size: 13px;
  font-weight: 700;
  line-height: 18px;
`;

export const RecordTimeValue = styled.p`
  color: ${cw.muted};
  font-size: 15px;
  white-space: nowrap;
`;

export const UploadSlot = styled.div`
  margin-left: auto;
  padding-left: 24px;

  ${media.laptop} {
    padding-left: 0;
  }

  ${media.mobile} {
    flex: 1 1 100%;

    & > button {
      width: 100%;
    }
  }
`;

/* 업로드 전 빈 상태 */
export const EmptyToolbar = styled(Card)`
  height: 74px;
  padding: 0 35px 0 17px;

  display: flex;
  align-items: center;

  ${media.laptop} {
    height: auto;
    padding: 16px 20px;

    flex-wrap: wrap;
    gap: 8px 16px;
  }

  ${media.mobile} {
    & > button {
      width: 100%;
    }
  }
`;

export const EmptyTitle = styled.p`
  width: 266px;

  ${media.laptop} {
    width: auto;
  }

  color: ${cw.navy};
  font-size: 14px;
  font-weight: 700;
  line-height: 1.45;
`;

export const EmptyDescription = styled.p`
  flex: 1 1 300px;

  color: ${cw.muted};
  font-size: 14px;
  line-height: 1.45;
`;

/* CSV 기록 재생 / 공통 제어 */
export const Playback = styled.section`
  height: 70px;
  padding: 0 24px;

  display: flex;
  align-items: center;
  gap: 24px;

  border: 1px solid ${cw.border};
  border-radius: 12px;
  background-color: ${cw.white};

  ${media.tablet} {
    height: auto;
    padding: 14px 16px 18px;

    flex-wrap: wrap;
    justify-content: space-between;
    gap: 12px;
  }

  ${media.mobile} {
    & > button {
      flex: 1;
      width: auto;
    }
  }
`;

export const Seek = styled.div`
  flex: 1;
  min-width: 0;
  height: 48px;

  display: flex;
  flex-direction: column;
  gap: 6px;

  ${media.tablet} {
    order: 3;
    flex: 1 1 100%;
    height: auto;
    gap: 10px;
  }
`;

export const SeekInfo = styled.div`
  height: 20px;

  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  white-space: nowrap;

  ${media.tablet} {
    height: auto;
    flex-wrap: wrap;
    gap: 2px 12px;
  }
`;

export const PlayTime = styled.p`
  color: ${cw.navy};
  font-size: 13px;
  font-weight: 700;

  & > span {
    margin-left: 8px;
    font-size: 12px;
  }
`;

export const PlayRange = styled.p`
  color: ${cw.muted};
  font-size: 12px;
  line-height: 1.45;
`;

export const Track = styled.div`
  position: relative;
  height: 8px;

  border-radius: 4px;
  background-color: ${cw.border};
  cursor: pointer;
  touch-action: none;

  &:focus-visible {
    outline: 2px solid ${cw.blue};
    outline-offset: 4px;
  }
`;

export const TrackFill = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 8px;

  border-radius: 4px;
  background-color: ${cw.blue};
`;

export const Thumb = styled.img`
  position: absolute;
  top: -3px;

  display: block;
  pointer-events: none;
`;
