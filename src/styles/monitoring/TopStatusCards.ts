// src/styles/monitoring/TopStatusCards.ts

import styled from "styled-components";

export const Container = styled.section`
  width: 100%;
  min-width: 0;

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
  white-space: nowrap;
`;

export const SelectBox = styled.select`
  width: 120px;
  height: 42px;
  padding: 0 36px 0 16px;

  flex-shrink: 0;

  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.white};

  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 15px;
  font-weight: 600;

  outline: none;
  cursor: pointer;
  appearance: none;

  background-image: url("data:image/svg+xml;utf8,<svg fill='gray' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>");
  background-repeat: no-repeat;
  background-position: right 12px center;

  &:focus {
    border-color: ${({ theme }) => theme.colors.DeepBlue};
  }
`;

export const CardGrid = styled.div`
  width: 100%;
  min-width: 0;

  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;

  @media (max-width: 1350px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 650px) {
    grid-template-columns: 1fr;
  }
`;

export const Card = styled.div`
  width: 100%;
  min-width: 0;
  min-height: 120px;
  padding: 20px;

  display: flex;
  align-items: center;
  gap: 16px;

  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 14px;
  background-color: ${({ theme }) => theme.colors.white};

  overflow: hidden;

  > div:last-child {
    min-width: 0;
    flex: 1;
  }

  @media (max-width: 768px) {
    padding: 18px;
  }
`;

export const IconCircle = styled.div<{ $active?: boolean }>`
  width: 52px;
  height: 52px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background-color: ${({ theme, $active }) =>
    $active ? theme.colors.DeepBlue : "#f3f4f6"};

  img {
    width: 26px;
    height: 26px;
    object-fit: contain;
  }

  @media (max-width: 480px) {
    width: 46px;
    height: 46px;

    img {
      width: 23px;
      height: 23px;
    }
  }
`;

export const Title = styled.h3`
  color: ${({ theme }) => theme.colors.DeepBlue};
  font-size: clamp(17px, 1.4vw, 20px);
  font-weight: 800;

  white-space: nowrap;
`;

export const GreenTitle = styled(Title)`
  color: ${({ theme }) => theme.colors.success};
`;

export const Description = styled.p`
  margin-top: 6px;

  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 12px;
  font-weight: 500;

  line-height: 1.4;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 480px) {
    white-space: normal;
  }
`;

export const SmallStatus = styled.p`
  margin-top: 8px;

  color: ${({ theme }) => theme.colors.success};
  font-size: 11px;
  font-weight: 700;

  white-space: nowrap;
`;

export const TimeText = styled.p`
  margin-top: 6px;

  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 14px;
  font-weight: 600;

  white-space: nowrap;
  font-variant-numeric: tabular-nums;
  font-feature-settings: "tnum";
`;

export const Tag = styled.div`
  width: fit-content;
  max-width: 100%;

  margin-top: 8px;
  padding: 4px 8px;

  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.background};

  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 10px;
  font-weight: 600;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;