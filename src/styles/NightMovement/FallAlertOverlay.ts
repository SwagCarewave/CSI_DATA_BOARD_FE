// src/styles/NightMovement/FallAlertOverlay.ts

import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
`;

// 시안의 회색 배경(#F8F7F8) 대신 대시보드를 그대로 보여 주되, 살짝 흐리고 옅게 덮는다
export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 10000;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(248, 247, 248, 0.45);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);

  animation: ${fadeIn} 0.15s ease-out;
  cursor: pointer;
`;

// 위·아래 빨간 사선 띠 (시안: 화면 너비의 0.72% 안쪽, 높이 9px)
export const Border = styled.img<{ $edge: "top" | "bottom" }>`
  position: absolute;
  left: 0.72%;
  right: 0.77%;
  ${({ $edge }) => ($edge === "top" ? "top: 0.53%;" : "bottom: 0.74%;")}

  width: 98.51%;
  height: 9px;
  pointer-events: none;
`;

export const Content = styled.div`
  margin-top: -6vh; // 시안처럼 화면 가운데보다 살짝 위

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
`;

export const Message = styled.p`
  color: #e30613;
  font-size: 35px;
  font-weight: 700;
  line-height: normal;
  white-space: nowrap;
`;
