import styled from "styled-components";

import { Card, cw, media } from "./tokens";

export const SkeletonCard = styled(Card)`
  flex: 0 0 390px;
  width: 390px;
  height: 416px;
  padding: 11px 15px 12px;

  display: flex;
  flex-direction: column;
  overflow: hidden;

  ${media.laptop} {
    flex: none;
    width: 100%;
  }
`;

export const Header = styled.div`
  width: 100%;
  height: 40px;
  gap: 12px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const LinkBadge = styled.span<{ $tone: "ok" | "warn" | "off" }>`
  padding: 4px 10px;

  border-radius: 999px;
  background-color: ${({ $tone }) => ($tone === "ok" ? cw.successBg : $tone === "warn" ? cw.amberBg : cw.pale)};

  color: ${({ $tone }) => ($tone === "ok" ? cw.success : $tone === "warn" ? cw.amber : cw.muted)};
  font-size: 12px;
  font-weight: 700;
  line-height: 17px;
  white-space: nowrap;
`;

export const Screen = styled.div`
  position: relative;
  flex: 1;
  min-height: 0;
  margin-top: 10px;

  border: 1px solid #c4c4c4;
  border-radius: 12px;
  background-color: #ececec;
  overflow: hidden;
`;

export const Canvas = styled.canvas`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
`;

export const Overlay = styled.div`
  position: absolute;
  inset: 0;
  padding: 0 24px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;

  background-color: rgba(236, 236, 236, 0.82);

  color: ${cw.navy};
  font-size: 14px;
  font-weight: 700;
  line-height: 1.45;
  text-align: center;

  & > span {
    color: ${cw.muted};
    font-size: 12px;
    font-weight: 500;
  }
`;

export const Progress = styled.div<{ $ratio: number }>`
  width: 70%;
  height: 8px;

  border-radius: 999px;
  background-color: ${cw.white};
  overflow: hidden;

  &::after {
    content: "";
    display: block;
    width: ${({ $ratio }) => `${Math.round(Math.min(1, Math.max(0, $ratio)) * 100)}%`};
    height: 100%;

    background-color: ${cw.blue};
    transition: width 0.3s ease;
  }
`;

export const Footer = styled.div`
  margin-top: 10px;
  min-height: 32px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`;

export const Status = styled.p<{ $dim: boolean }>`
  min-width: 0;
  overflow: hidden;

  color: ${({ $dim }) => ($dim ? cw.gray : cw.navy)};
  font-size: 13px;
  font-weight: 700;
  line-height: 1.45;
  text-overflow: ellipsis;
  white-space: nowrap;

  & > em {
    color: ${cw.muted};
    font-style: normal;
    font-weight: 500;
  }
`;
