import styled from "styled-components";

import type { EventColor } from "../../data/alertEvents";

export const Card = styled.aside`
  width: 100%;
  min-width: 0;
  min-height: 430px;
  padding: 22px;

  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.card};
  box-shadow: ${({ theme }) => theme.shadow.card};

  @media (max-width: 480px) {
    padding: 18px 16px;
  }
`;

export const DetailHeader = styled.div`
  margin-bottom: 26px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    color: ${({ theme }) => theme.colors.DeepBlue};
    font-size: 16px;
    font-weight: 800;
  }

  button {
    border: none;
    background: none;

    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 24px;

    cursor: pointer;
  }
`;

export const DetailTitle = styled.div`
  min-width: 0;
  margin-bottom: 24px;

  display: flex;
  align-items: center;
  gap: 12px;

  > strong {
    min-width: 0;

    color: ${({ theme }) => theme.colors.danger};
    font-size: 16px;
    overflow-wrap: anywhere;
  }

  @media (max-width: 380px) {
    flex-wrap: wrap;
  }
`;

export const EventIcon = styled.div<{ $color: EventColor }>`
  width: 42px;
  height: 42px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 10px;
  background-color: ${({ theme, $color }) => theme.colors[$color]};

  img {
    width: 22px;
    height: 22px;
    object-fit: contain;
  }
`;

export const DetailStatus = styled.span<{ $checked: boolean }>`
  margin-left: auto;
  padding: 5px 9px;

  flex-shrink: 0;

  border-radius: 6px;
  background-color: ${({ theme, $checked }) =>
    $checked ? theme.colors.textSecondary : theme.colors.danger};

  color: white;
  font-size: 11px;
  font-weight: 800;
  white-space: nowrap;
`;

export const InfoList = styled.div`
  padding-bottom: 20px;

  display: flex;
  flex-direction: column;
  gap: 14px;

  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  > div {
    min-width: 0;

    display: flex;
    justify-content: space-between;
    gap: 16px;
  }

  span {
    flex-shrink: 0;

    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 13px;
    font-weight: 700;
  }

  strong {
    min-width: 0;

    color: ${({ theme }) => theme.colors.textPrimary};
    font-size: 13px;
    text-align: right;
    overflow-wrap: anywhere;
  }

  @media (max-width: 380px) {
    > div {
      align-items: flex-start;
      flex-direction: column;
      gap: 4px;
    }

    strong {
      text-align: left;
    }
  }
`;

export const DetailSection = styled.div`
  margin-top: 22px;

  h4 {
    margin-bottom: 10px;

    color: ${({ theme }) => theme.colors.DeepBlue};
    font-size: 14px;
    font-weight: 800;
  }

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 13px;
    line-height: 1.6;
    overflow-wrap: anywhere;
  }
`;

export const DetailButtons = styled.div`
  margin-top: 44px;

  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;

  button {
    min-width: 0;
    height: 42px;

    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radius.button};
    background-color: white;

    color: ${({ theme }) => theme.colors.textPrimary};
    font-weight: 700;

    cursor: pointer;
  }

  .primary {
    border-color: ${({ theme }) => theme.colors.DeepBlue};
    background-color: ${({ theme }) => theme.colors.DeepBlue};
    color: white;
  }

  @media (max-width: 380px) {
    grid-template-columns: 1fr;
  }
`;
