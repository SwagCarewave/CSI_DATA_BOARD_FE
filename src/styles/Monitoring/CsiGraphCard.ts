// src/styles/monitoring/CsiGraphCard.ts

import styled from "styled-components";

export const Card = styled.section`
  width: 100%;
  min-width: 0;
  min-height: 360px;
  padding: 16px;

  display: grid;
  grid-template-columns: minmax(0, 1fr) 110px;
  gap: 14px;

  overflow: hidden;

  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 14px;
  background-color: ${({ theme }) => theme.colors.white};

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    overflow: visible;
  }
`;

export const GraphArea = styled.div`
  width: 100%;
  min-width: 0;
  overflow: hidden;
`;

export const Header = styled.div`
  min-width: 0;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;

  > div {
    min-width: 0;
  }

  @media (max-width: 480px) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

export const Title = styled.span`
  color: ${({ theme }) => theme.colors.DeepBlue};
  font-size: 16px;
  font-weight: 800;
  white-space: nowrap;
`;

export const SubTitle = styled.span`
  margin-left: 6px;

  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;

  @media (max-width: 380px) {
    display: block;
    margin-top: 4px;
    margin-left: 0;
  }
`;

export const SelectBox = styled.select`
  width: 108px;
  height: 32px;
  padding: 0 10px;

  flex-shrink: 0;

  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.white};

  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 11px;
  font-weight: 600;

  outline: none;
  cursor: pointer;
`;

export const Legend = styled.div`
  width: 100%;
  min-width: 0;
  margin-top: 12px;

  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 6px 10px;

  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 9px;
  font-weight: 600;

  .line {
    white-space: nowrap;
  }

  .line::before {
    content: "━";
    margin-right: 3px;
    font-weight: 800;
  }

  .blue::before {
    color: #4f73b8;
  }

  .gray::before {
    color: #9ca3af;
  }

  .purple::before {
    color: #8b5fc7;
  }

  .green::before {
    color: #1a9c53;
  }
`;

export const EmptyText = styled.p`
  width: 100%;
  height: 100%;
  padding: 16px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: 10px;

  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 12px;
  font-weight: 600;
  text-align: center;
`;

export const BioSignalBox = styled.aside`
  width: 110px;
  min-width: 0;

  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (max-width: 600px) {
    width: 100%;

    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 400px) {
    grid-template-columns: 1fr;
  }
`;

export const BioTitle = styled.h4`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 12px;
  font-weight: 800;
  white-space: nowrap;

  span {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-weight: 600;
  }

  @media (max-width: 600px) {
    grid-column: 1 / -1;
  }
`;

export const BioCard = styled.div`
  width: 100%;
  min-width: 0;
  min-height: 90px;
  padding: 14px 12px;

  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const BioLabel = styled.p`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;
`;

export const BioValue = styled.p`
  margin-top: 10px;

  color: ${({ theme }) => theme.colors.DeepBlue};
  font-size: clamp(28px, 3vw, 36px);
  font-weight: 800;

  white-space: nowrap;

  span {
    font-size: 12px;
    font-weight: 700;
  }
`;

export const Note = styled.p`
  margin-top: 4px;

  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 10px;
  font-weight: 500;
  line-height: 1.5;

  @media (max-width: 600px) {
    grid-column: 1 / -1;

    br {
      display: none;
    }
  }
`;

export const ChartBox = styled.div`
  position: relative;

  width: 100%;
  min-width: 0;
  height: 260px;
  margin-top: 10px;

  overflow: hidden;

  .recharts-responsive-container {
    min-width: 0;
  }

  .recharts-wrapper,
  .recharts-surface {
    outline: none;
  }

  @media (max-width: 480px) {
    height: 230px;
  }
`;