import styled from "styled-components";

export const Card = styled.section`
  width: 620px;
  height: 360px;
  padding: 16px;

  flex-shrink: 0;

  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 14px;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
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
  margin-top: 12px;

  display: grid;
  grid-template-columns: 482px 92px;
  gap: 14px;
`;

export const SkeletonView = styled.div`
  position: relative;

  width: 482px;
  height: 300px;

  border-radius: 8px;
  background: linear-gradient(135deg, #222, #3a3a3a);

  overflow: hidden;
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

  color: white;
  font-size: 16px;
`;

export const KeypointList = styled.ol`
  width: 92px;

  display: flex;
  flex-direction: column;
  gap: 4px;

  list-style: none;
`;

export const KeypointItem = styled.li`
  display: grid;
  grid-template-columns: 18px 1fr;

  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 10px;
  font-weight: 600;

  white-space: nowrap;

  span {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;