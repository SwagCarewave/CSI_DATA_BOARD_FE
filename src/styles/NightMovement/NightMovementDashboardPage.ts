// src/styles/NightMovement/NightMovementDashboardPage.ts

import styled from "styled-components";

import { cw, fontFamily, media } from "./tokens";

export const Page = styled.div`
  width: 100%;
  min-height: 100vh;

  background-color: ${cw.bg};
  font-family: ${fontFamily};
  color: ${cw.navy};
`;

// Figma 프레임 너비(1215px)가 최대 너비
export const Board = styled.div`
  width: 100%;
  max-width: 1215px;
  margin: 0 auto;
  padding: 0 20px 23px;

  display: flex;
  flex-direction: column;

  ${media.tablet} {
    padding: 0 16px 20px;
  }
`;

export const Header = styled.header`
  height: 56px;
  margin: 0 -20px;
  padding: 0 24px;

  display: flex;
  align-items: center;

  ${media.tablet} {
    height: auto;
    margin: 0 -16px;
    padding: 12px 16px;

    flex-wrap: wrap;
    row-gap: 10px;
  }
`;

export const Brand = styled.h1`
  color: ${cw.blue};
  font-size: 26px;
  font-weight: 700;
  line-height: 1.45;

  ${media.mobile} {
    font-size: 22px;
  }
`;

export const BoardTitle = styled.p`
  margin-left: 53px;

  color: ${cw.navy};
  font-size: 20px;
  font-weight: 700;
  line-height: 1.45;
  white-space: nowrap;

  ${media.laptop} {
    margin-left: 24px;
  }

  ${media.mobile} {
    margin-left: 12px;
    font-size: 16px;
  }
`;

export const ModeTabs = styled.nav`
  margin-left: auto;

  display: flex;
  gap: 7px;

  ${media.mobile} {
    width: 100%;
    margin-left: 0;

    & > button {
      flex: 1;
      width: auto;
    }
  }
`;

export const Row = styled.div<{ $mt?: number }>`
  margin-top: ${({ $mt = 12 }) => `${$mt}px`};

  display: flex;
  gap: 12px;
  align-items: flex-start;

  ${media.laptop} {
    margin-top: 12px;
    flex-direction: column;
    align-items: stretch;
  }
`;

export const LeftColumn = styled.div`
  flex: 1 1 0;
  min-width: 0;

  display: flex;
  flex-direction: column;
  gap: 12px;

  ${media.laptop} {
    flex: none;
    width: 100%;
  }
`;
