// src/styles/monitoring/BottomStatusCard.ts

import styled from "styled-components";

export const Container = styled.section`
  width: 100%;
  min-width: 1156px;

  display: grid;
  grid-template-columns: 570px 570px;
  gap: 16px;
`;

export const EventCard = styled.div`
  height: 120px;
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
  margin-top: 18px;

  height: 44px;
  padding: 0 14px;

  display: flex;
  align-items: center;

  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;

  background-color: ${({ theme }) => theme.colors.white};
`;

export const EventLeft = styled.div`
  display: flex;
  align-items: center;

  gap: 12px;
`;

export const EventTime = styled.span`
  color: ${({ theme }) => theme.colors.textPrimary};

  font-size: 13px;
  font-weight: 600;
`;

export const StatusBadge = styled.div`
  padding: 4px 10px;

  border-radius: 6px;

  background-color: ${({ theme }) => theme.colors.successLight};

  color: ${({ theme }) => theme.colors.success};

  font-size: 11px;
  font-weight: 700;
`;

export const EventText = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};

  font-size: 13px;
  font-weight: 500;
`;

export const AlertCard = styled.div`
  height: 120px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 14px;

  background-color: ${({ theme }) => theme.colors.white};
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
`;
