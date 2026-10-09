// src/styles/NightMovement/Modal.ts

import styled from "styled-components";

import { Button, cw, fontFamily, media } from "./tokens";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 100;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${cw.overlay};
  font-family: ${fontFamily};

  ${media.mobile} {
    padding: 0 16px;
  }
`;

export const Dialog = styled.div<{ $pb: number; $radius: number; $pt: number }>`
  width: min(560px, calc(100vw - 32px));
  max-height: calc(100vh - 32px);
  padding: ${({ $pt, $pb }) => `${$pt}px 24px ${$pb}px`};

  display: flex;
  flex-direction: column;
  overflow-y: auto;

  border: 1px solid ${cw.border};
  border-radius: ${({ $radius }) => `${$radius}px`};
  background-color: ${cw.white};

  color: ${cw.navy};

  &:focus {
    outline: none;
  }

  ${media.mobile} {
    padding-left: 20px;
    padding-right: 20px;
  }
`;

export const Header = styled.div<{ $align: "flex-start" | "center" }>`
  min-height: 32px;

  display: flex;
  justify-content: space-between;
  align-items: ${({ $align }) => $align};
  gap: 16px;
`;

export const Title = styled.h2<{ $large: boolean }>`
  color: ${cw.navy};
  font-size: ${({ $large }) => ($large ? "22px" : "20px")};
  font-weight: 700;
  line-height: ${({ $large }) => ($large ? "28px" : 1.45)};
`;

/* CareWave / Icon button / Close */
export const CloseButton = styled.button`
  width: 32px;
  height: 32px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  border-radius: 8px;
  background-color: ${cw.pale};

  &:focus-visible {
    outline: 2px solid ${cw.blue};
    outline-offset: 2px;
  }
`;

export const Text = styled.p<{ $mt?: number; $tone?: "muted" | "navy" | "red"; $bold?: boolean }>`
  margin-top: ${({ $mt = 0 }) => `${$mt}px`};

  color: ${({ $tone = "muted" }) => ($tone === "navy" ? cw.navy : $tone === "red" ? cw.red : cw.muted)};
  font-size: 14px;
  font-weight: ${({ $bold }) => ($bold ? 700 : 400)};
  line-height: 1.45;
`;

export const Strong = styled.strong<{ $color: string }>`
  color: ${({ $color }) => $color};
  font-weight: 700;
`;

export const Small = styled.p<{ $mt: number }>`
  margin-top: ${({ $mt }) => `${$mt}px`};

  color: ${cw.muted};
  font-size: 12px;
`;

export const Footer = styled.div<{ $mt: number }>`
  margin-top: ${({ $mt }) => `${$mt}px`};

  display: flex;
  justify-content: flex-end;
  gap: 20px;

  ${media.mobile} {
    margin-top: ${({ $mt }) => `${Math.min($mt, 40)}px`};
    gap: 12px;

    & > button {
      flex: 1 1 0;
      width: auto;
    }
  }
`;

// 선택 전에는 회색 배경 + 흰 글자로 비활성 표시 (Figma 3:1212)
export const SubmitButton = styled(Button)`
  &:disabled {
    background-color: ${cw.gray};
    color: ${cw.white};
  }
`;

/* CareWave / Status badge / Success */
export const SuccessBadge = styled.p<{ $mt: number }>`
  width: 172px;
  height: 36px;
  margin-top: ${({ $mt }) => `${$mt}px`};
  padding: 0 12px;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;

  border-radius: 18px;
  background-color: ${cw.successBg};

  color: ${cw.success};
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
`;

/* CareWave / Radio choice */
export const RadioGroup = styled.div<{ $mt: number }>`
  margin-top: ${({ $mt }) => `${$mt}px`};

  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const RadioChoice = styled.label<{ $selected: boolean }>`
  width: 100%;
  height: 44px;
  padding: 0 16px;

  display: flex;
  align-items: center;
  gap: 12px;

  border: 1px solid ${({ $selected }) => ($selected ? cw.blue : cw.border)};
  border-radius: 8px;
  background-color: ${({ $selected }) => ($selected ? cw.pale : cw.white)};

  color: ${({ $selected }) => ($selected ? cw.blue : cw.navy)};
  font-size: 14px;
  line-height: 22px;
  cursor: pointer;

  &:has(input:focus-visible) {
    outline: 2px solid ${cw.blue};
    outline-offset: 2px;
  }

  & > input {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }
`;

/* 전체 활동 기록 */
export const Description = styled.p`
  margin-top: 12px;

  color: ${cw.muted};
  font-size: 13px;
  line-height: 19px;
`;

export const Tabs = styled.div`
  margin-top: 12px;

  display: flex;
  gap: 8px;

  & > button {
    flex: 1;
  }
`;

export const Rule = styled.hr`
  height: 1px;
  margin-top: 12px;

  border: none;
  background-color: ${cw.border};
`;

export const RecordList = styled.ul`
  margin-top: 12px;

  display: flex;
  flex-direction: column;
  gap: 8px;

  list-style: none;
`;

export const RecordEmpty = styled.p`
  padding: 26px 0;

  color: ${cw.muted};
  font-size: 13px;
  text-align: center;
`;

export const RecordFooter = styled.div`
  min-height: 24px;
  margin-top: 12px;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 2px 12px;

  color: ${cw.muted};
  font-size: 12px;
  line-height: 18px;
`;

/* CSV 파일 업로드 */
export const DropArea = styled.div<{ $active: boolean }>`
  min-height: 142px;
  margin-top: 21px;
  padding-top: 34px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  border: 1px ${({ $active }) => ($active ? "dashed" : "solid")} ${({ $active }) => ($active ? cw.blue : cw.border)};
  border-radius: ${cw.radius};
  background-color: ${({ $active }) => ($active ? cw.bg : cw.pale)};

  & > p {
    padding: 0 12px;

    color: ${cw.navy};
    font-size: 14px;
    font-weight: 700;
    line-height: 1.45;
    text-align: center;
  }
`;

export const HiddenInput = styled.input`
  display: none;
`;

export const ProgressTrack = styled.div`
  height: 12px;
  margin-top: 51px;

  overflow: hidden;

  border-radius: ${cw.radius};
  background-color: ${cw.border};
`;

export const ProgressFill = styled.div`
  height: 100%;

  border-radius: ${cw.radius};
  background-color: ${cw.blue};
  transition: width 0.12s linear;
`;
