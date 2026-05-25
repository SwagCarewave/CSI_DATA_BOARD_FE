// src/styles/monitoring/TopStatusCards.ts

import styled from "styled-components";

export const Container = styled.section`
  display: flex;
  flex-direction: column;

  gap: 16px;
`;

export const RoomSelectWrapper = styled.div`
  display: flex;
  align-items: center;

  gap: 12px;
`;

export const SelectLabel = styled.p`
  color: ${({ theme }) => theme.colors.textPrimary};

  font-size: 14px;
  font-weight: 700;
`;

export const SelectBox = styled.button`
  width: 120px;
  height: 42px;
  padding: 0 16px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;

  background-color: ${({ theme }) => theme.colors.white};

  color: ${({ theme }) => theme.colors.textPrimary};

  font-size: 15px;
  font-weight: 600;
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  gap: 16px;
`;

export const Card = styled.div`
  height: 120px;
  padding: 22px;

  display: flex;
  align-items: center;

  gap: 18px;

  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 14px;

  background-color: ${({ theme }) => theme.colors.white};
`;

export const IconCircle = styled.div`
  width: 58px;
  height: 58px;

  flex-shrink: 0;

  border-radius: 50%;

  background-color: #d9d9d9;
`;

export const Title = styled.h3`
  color: ${({ theme }) => theme.colors.DeepBlue};

  font-size: 20px;
  font-weight: 800;
`;

export const GreenTitle = styled(Title)`
  color: ${({ theme }) => theme.colors.success};
`;

export const Description = styled.p`
  margin-top: 6px;

  color: ${({ theme }) => theme.colors.textSecondary};

  font-size: 12px;
  font-weight: 500;
`;

export const SmallStatus = styled.p`
  margin-top: 8px;

  color: ${({ theme }) => theme.colors.success};

  font-size: 11px;
  font-weight: 700;
`;

export const TimeText = styled.p`
  margin-top: 6px;

  color: ${({ theme }) => theme.colors.textPrimary};

  font-size: 14px;
  font-weight: 600;
`;

export const Tag = styled.div`
  width: fit-content;

  margin-top: 8px;
  padding: 4px 8px;

  border-radius: 6px;

  background-color: ${({ theme }) => theme.colors.background};

  color: ${({ theme }) => theme.colors.textSecondary};

  font-size: 10px;
  font-weight: 600;
`;
