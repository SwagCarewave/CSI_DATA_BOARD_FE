// src/styles/monitoring/BottomStatusCard.ts

import styled from "styled-components";

export const Container = styled.section`
  width: 100%;
  min-width: 0;

  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;

  @media (max-width: 750px) {
    grid-template-columns: 1fr;
  }
`;

export const EventCard = styled.div`
  width: 100%;
  min-width: 0;
  min-height: 120px;
  padding: 18px;

  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 14px;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const Title = styled.h3`
  color: ${({ theme }) => theme.colors.DeepBlue};

  font-size: 16px;
  font-weight: 800;
`;

export const EventBox = styled.div`
  width: 100%;
  min-width: 0;
  min-height: 44px;
  margin-top: 18px;
  padding: 10px 14px;

  display: flex;
  align-items: center;

  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const EventLeft = styled.div`
  min-width: 0;

  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px 12px;
`;

export const EventTime = styled.span`
  color: ${({ theme }) => theme.colors.textPrimary};

  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
`;

export const StatusBadge = styled.div`
  padding: 4px 10px;

  flex-shrink: 0;

  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.successLight};

  color: ${({ theme }) => theme.colors.success};

  font-size: 11px;
  font-weight: 700;
`;

export const EventText = styled.p`
  min-width: 0;

  color: ${({ theme }) => theme.colors.textSecondary};

  font-size: 13px;
  font-weight: 500;
`;

export const AlertCard = styled.div`
  width: 100%;
  min-width: 0;
  min-height: 120px;
  padding: 18px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 14px;
  background-color: ${({ theme }) => theme.colors.white};

  text-align: center;
`;

export const AlertIcon = styled.div`
  font-size: 28px;
`;

export const AlertTitle = styled.p`
  margin-top: 8px;

  color: ${({ theme }) => theme.colors.textPrimary};

  font-size: 15px;
  font-weight: 700;
`;

export const AlertDescription = styled.p`
  margin-top: 6px;

  color: ${({ theme }) => theme.colors.textSecondary};

  font-size: 12px;
  font-weight: 500;
  line-height: 1.5;
`;