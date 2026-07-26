// src/styles/monitoring/SkeletonCard.ts

import styled from "styled-components";

export const Card = styled.section`
  width: 100%;
  min-width: 0;
  min-height: 360px;
  padding: 16px;

  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 14px;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const Header = styled.div`
  min-width: 0;

  display: flex;
  align-items: center;
  gap: 6px;

  @media (max-width: 480px) {
    flex-wrap: wrap;
  }
`;

export const Title = styled.h3`
  color: ${({ theme }) => theme.colors.DeepBlue};
  font-size: 16px;
  font-weight: 800;
  white-space: nowrap;
`;

export const SubTitle = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
`;

export const LiveBox = styled.div`
  margin-left: auto;

  display: flex;
  align-items: center;

  color: #d93025;
  font-size: 11px;
  font-weight: 700;

  white-space: nowrap;
  font-variant-numeric: tabular-nums;
  font-feature-settings: "tnum";

  @media (max-width: 480px) {
    width: 100%;
    margin-top: 4px;
    margin-left: 0;
  }
`;

export const LiveDot = styled.div`
  width: 7px;
  height: 7px;
  margin-right: 5px;

  flex-shrink: 0;

  border-radius: 50%;
  background-color: #d93025;
`;

export const Body = styled.div`
  width: 100%;
  min-width: 0;
  margin-top: 12px;

  display: grid;
  grid-template-columns: minmax(0, 1fr) 92px;
  gap: 14px;

  @media (max-width: 650px) {
    grid-template-columns: 1fr;
  }
`;

export const SkeletonView = styled.div`
  position: relative;

  width: 100%;
  min-width: 0;
  height: 300px;

  border-radius: 8px;
  background: linear-gradient(135deg, #222, #3a3a3a);

  overflow: hidden;

  @media (max-width: 480px) {
    height: 260px;
  }
`;

export const MotionText = styled.div`
  position: absolute;
  top: 24px;
  left: 24px;

  color: white;
  font-size: 13px;
  font-weight: 600;

  white-space: nowrap;

  strong {
    font-size: 28px;
    font-weight: 800;
  }

  @media (max-width: 480px) {
    top: 18px;
    left: 18px;

    strong {
      font-size: 24px;
    }
  }
`;

export const PersonPlaceholder = styled.div`
  position: absolute;
  top: 72px;
  left: 50%;
  transform: translateX(-50%);

  width: 120px;
  height: 180px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 2px dashed rgba(255, 255, 255, 0.45);
  border-radius: 80px;

  color: rgba(255, 255, 255, 0.7);
  font-size: 13px;
  font-weight: 700;
  text-align: center;

  @media (max-width: 480px) {
    top: 64px;
    width: 100px;
    height: 155px;
  }
`;

export const ControlBox = styled.div`
  position: absolute;
  left: 18px;
  bottom: 18px;

  display: flex;
  gap: 8px;
`;

export const ControlButton = styled.button`
  width: 36px;
  height: 36px;

  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 6px;
  background-color: transparent;

  color: white;
  font-size: 16px;
  cursor: pointer;
`;

export const KeypointList = styled.ol`
  width: 100%;
  min-width: 0;

  display: flex;
  flex-direction: column;
  gap: 4px;

  list-style: none;

  @media (max-width: 650px) {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 8px;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const KeypointItem = styled.li`
  min-width: 0;

  display: grid;
  grid-template-columns: 18px minmax(0, 1fr);

  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 10px;
  font-weight: 600;

  white-space: nowrap;

  span {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;