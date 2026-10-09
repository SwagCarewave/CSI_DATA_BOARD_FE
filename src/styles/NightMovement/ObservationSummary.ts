// src/styles/NightMovement/ObservationSummary.ts

import styled from "styled-components";

import { cw, media } from "./tokens";

export const Summary = styled.section`
  width: 100%;
  height: 64px;
  padding: 0 20px;

  display: flex;
  align-items: center;
  gap: 20px;

  border: 1px solid ${cw.border};
  border-radius: 12px;
  background-color: ${cw.white};

  ${media.tablet} {
    height: auto;
    padding: 10px 20px;

    flex-direction: column;
    align-items: stretch;
    gap: 6px;
  }
`;

export const Item = styled.div`
  flex: 0 1 346px;
  min-width: 0;
  height: 36px;

  display: flex;
  align-items: center;
  gap: 12px;

  ${media.tablet} {
    flex: none;
    height: auto;
    min-height: 36px;
    flex-wrap: wrap;
    column-gap: 12px;
    row-gap: 0;
  }
`;

export const IconBox = styled.span`
  width: 24px;
  height: 24px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`;

export const Label = styled.span`
  color: ${cw.navy};
  font-size: 14px;
  line-height: 32px;
  white-space: nowrap;
`;

export const Value = styled.strong`
  color: ${cw.navy};
  font-size: 22px;
  font-weight: 700;
  line-height: 32px;
  white-space: nowrap;
`;

export const Extra = styled.span`
  color: ${cw.muted};
  font-size: 14px;
  line-height: 32px;
  white-space: nowrap;
`;

export const Divider = styled.span`
  width: 1px;
  height: 28px;

  flex-shrink: 0;

  background-color: ${cw.border};

  ${media.tablet} {
    width: 100%;
    height: 1px;
  }
`;
