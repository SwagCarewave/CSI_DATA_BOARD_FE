// src/styles/NightMovement/Menu.ts

import styled, { css } from "styled-components";

import { cw, media } from "./tokens";

export const Anchor = styled.div`
  position: relative;
  flex-shrink: 0;
`;

export const Popover = styled.div<{ $align?: "left" | "right"; $tabletAlign?: "left" | "right" }>`
  position: absolute;
  top: calc(100% + 6px);
  z-index: 20;
  ${({ $align = "left" }) => ($align === "right" ? "right: 0;" : "left: 0;")}

  box-shadow: 0 8px 24px rgba(9, 29, 98, 0.12);

  ${media.tablet} {
    ${({ $tabletAlign }) =>
      $tabletAlign === "left" ? "left: 0; right: auto;" : $tabletAlign === "right" ? "left: auto; right: 0;" : ""}
  }
`;

/* 그래프 표시 범위 (Figma 5:916) */
export const RangeMenu = styled.div`
  width: 270px;
  padding: 8px;

  display: flex;
  flex-direction: column;
  gap: 4px;

  border: 1px solid ${cw.menuBorder};
  border-radius: 12px;
  background-color: ${cw.white};
`;

export const MenuLabel = styled.p`
  color: ${cw.menuLabel};
  font-size: 12px;
  font-weight: 700;
  line-height: 22px;
`;

export const RangeOption = styled.button<{ $selected: boolean }>`
  width: 100%;
  height: 40px;
  padding: 0 12px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  border-radius: 8px;

  color: ${cw.menuText};
  font-size: 14px;
  line-height: 22px;
  text-align: left;

  ${({ $selected }) =>
    $selected &&
    css`
      background-color: ${cw.menuSelected};
      font-weight: 700;
    `}

  &:not(:disabled):hover {
    background-color: ${cw.menuSelected};
  }
`;

export const Check = styled.span<{ $color?: string }>`
  color: ${({ $color }) => $color ?? cw.menuCheck};
`;

/* 배속 선택 (Figma 65:485) */
export const SpeedMenu = styled.div`
  width: 153px;
  padding: 6px;

  display: flex;
  flex-direction: column;
  gap: 2px;

  border: 1px solid ${cw.border};
  border-radius: 10px;
  background-color: ${cw.white};
`;

export const SpeedOption = styled.button<{ $selected: boolean }>`
  width: 100%;
  height: 40px;
  padding: 0 8px 0 10px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  border-radius: 6px;

  color: ${({ $selected }) => ($selected ? cw.blue : cw.navy)};
  font-size: 12px;
  text-align: left;
  background-color: ${({ $selected }) => ($selected ? cw.bg : "transparent")};

  &:hover {
    background-color: ${cw.bg};
  }
`;

/* 등록된 파일 선택 (Figma 5:763) */
export const FileMenu = styled.div`
  width: min(440px, calc(100vw - 64px));
  padding: 12px;

  display: flex;
  flex-direction: column;
  gap: 6px;

  border: 1px solid ${cw.menuBorder};
  border-radius: 12px;
  background-color: ${cw.white};
`;

export const FileOption = styled.div<{ $selected: boolean }>`
  height: 52px;
  padding: 0 10px 0 12px;

  display: flex;
  align-items: center;
  gap: 8px;

  border-radius: 8px;
  background-color: ${({ $selected }) => ($selected ? cw.menuSelected : "transparent")};

  &:hover {
    background-color: ${cw.menuSelected};
  }
`;

export const FileName = styled.button<{ $selected: boolean }>`
  flex: 1;
  min-width: 0;
  height: 100%;

  overflow: hidden;

  color: ${cw.menuText};
  font-size: 14px;
  font-weight: ${({ $selected }) => ($selected ? 700 : 400)};
  line-height: 22px;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const DeleteButton = styled.button`
  width: 76px;
  height: 40px;

  flex-shrink: 0;

  border: 1px solid ${cw.border};
  border-radius: 8px;
  background-color: ${cw.deleteBg};

  color: ${cw.deleteText};
  font-size: 12px;
  font-weight: 700;
  line-height: 1.45;
`;

export const FileHint = styled.p`
  color: ${cw.menuHint};
  font-size: 11px;
`;

export const FileList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
