// src/styles/NightMovement/tokens.ts

import styled, { css } from "styled-components";

// CareWave 야간 움직임 대시보드 디자인 토큰 (Figma 변수 --cw-*)
export const cw = {
  bg: "#EDF8FF",
  white: "#FFFFFF",
  border: "#DCEEFF",
  blue: "#0082FF",
  navy: "#091D62",
  muted: "#607DAE",
  pale: "#F3F8FF",
  pink: "#FFF1F4",
  pinkIcon: "#FFE0E8",
  blueIcon: "#DEF0FF",
  falseBg: "#E7EAEF",
  falseIcon: "#D5DBE3",
  red: "#FF3658",
  success: "#09875C",
  successBg: "#EAF8F1",
  amber: "#A86A07",
  amberBg: "#FFF7E7",
  gray: "#A3B4C7",
  overlay: "rgba(0, 0, 0, 0.51)",

  // 드롭다운 메뉴
  menuBorder: "#D6E5F5",
  menuLabel: "#596B8A",
  menuText: "#0F1F52",
  menuSelected: "#EDF7FF",
  menuCheck: "#007AFF",
  deleteBg: "#FFF0F5",
  deleteText: "#FF335C",
  menuHint: "#5E7DA8",

  radius: "10px",
};

export const fontFamily = `"Noto Sans KR", "Pretendard", sans-serif`;

// 1215px(Figma 프레임) 이상은 시안 그대로, 그 아래에서 단계적으로 재배치
export const media = {
  laptop: "@media (max-width: 1024px)", // 기록 카드를 아래로 내리고 제어 바를 2열로
  tablet: "@media (max-width: 768px)", // 툴바·재생 바 줄바꿈, 차트 가로 스크롤
  mobile: "@media (max-width: 480px)", // 한 줄 배치, 버튼 꽉 채우기
};

export type ButtonVariant = "primary" | "secondary" | "danger" | "disabled" | "selected";

const buttonColors: Record<ButtonVariant, { bg: string; color: string }> = {
  primary: { bg: cw.blue, color: cw.white },
  secondary: { bg: cw.white, color: cw.navy },
  danger: { bg: cw.red, color: cw.white },
  disabled: { bg: cw.pale, color: cw.gray },
  selected: { bg: cw.bg, color: cw.blue },
};

// CareWave / Button
export const Button = styled.button<{ $variant?: ButtonVariant; $width?: number; $height?: number }>`
  width: ${({ $width = 153 }) => `${$width}px`};
  height: ${({ $height = 40 }) => `${$height}px`};

  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  border: 1px solid ${cw.border};
  border-radius: ${cw.radius};

  font-size: 14px;
  font-weight: 700;
  line-height: 1.45;
  white-space: nowrap;

  ${({ $variant = "primary" }) => css`
    background-color: ${buttonColors[$variant]?.bg};
    color: ${buttonColors[$variant]?.color};
  `}

  &:disabled {
    background-color: ${cw.pale};
    color: ${cw.gray};
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid ${cw.blue};
    outline-offset: 2px;
  }
`;

// CareWave / Select (드롭다운 트리거)
export const SelectTrigger = styled.button<{ $width: number }>`
  width: ${({ $width }) => `${$width}px`};
  max-width: 100%;
  height: 40px;
  padding: 0 12px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;

  border: 1px solid ${cw.border};
  border-radius: 10px;
  background-color: ${cw.white};

  color: ${cw.navy};
  font-size: 14px;
  line-height: 1.45;
  text-align: left;
  white-space: nowrap;

  &:focus-visible {
    outline: 2px solid ${cw.blue};
    outline-offset: 2px;
  }
`;

export const Card = styled.section<{ $emphasis?: boolean }>`
  position: relative;

  border: ${({ $emphasis }) => ($emphasis ? `2px solid ${cw.blue}` : `1px solid ${cw.border}`)};
  border-radius: ${cw.radius};
  background-color: ${cw.white};
`;

export const CardTitle = styled.h2`
  color: ${cw.navy};
  font-size: 20px;
  font-weight: 700;
  line-height: 1.45;
  white-space: nowrap;

  ${media.mobile} {
    font-size: 18px;
  }
`;

export const CardSubtitle = styled.p`
  color: ${cw.muted};
  font-size: 14px;
  line-height: 1.45;
  white-space: nowrap;

  ${media.tablet} {
    white-space: normal;
  }
`;

export const Icon = styled.img`
  display: block;
  flex-shrink: 0;
`;

export const VisuallyHidden = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
`;
