import styled from "styled-components";

import type { EventColor } from "../../data/alertEvents";

export const Card = styled.section`
  width: 100%;
  min-width: 0;
  min-height: 430px;
  padding: 18px 20px;

  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.card};
  box-shadow: ${({ theme }) => theme.shadow.card};

  @media (max-width: 600px) {
    padding: 16px;
  }
`;

export const TotalText = styled.p`
  margin-bottom: 8px;

  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 13px;
  font-weight: 700;
`;

export const TableWrapper = styled.div`
  width: 100%;
  min-width: 0;
  overflow-x: auto;

  @media (max-width: 760px) {
    display: none;
  }
`;

export const Table = styled.table`
  width: 100%;
  min-width: 680px;

  border-collapse: collapse;

  th {
    height: 38px;
    padding: 0 8px;

    border-bottom: 1px solid ${({ theme }) => theme.colors.border};

    color: ${({ theme }) => theme.colors.DeepBlue};
    font-size: 12px;
    font-weight: 700;
    text-align: left;
    white-space: nowrap;
  }

  td {
    height: 72px;
    padding: 8px;

    border-bottom: 1px solid ${({ theme }) => theme.colors.border};

    color: ${({ theme }) => theme.colors.textPrimary};
    font-size: 13px;
    white-space: nowrap;
  }

  th:first-child,
  td:first-child {
    width: 42%;
  }

  th:last-child,
  td:last-child {
    width: 36px;
  }
`;

export const TableRow = styled.tr<{ $selected: boolean }>`
  background-color: ${({ $selected, theme }) =>
    $selected ? theme.colors.background : "transparent"};

  cursor: pointer;
  transition: background-color 0.15s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
  }
`;

export const EventInfo = styled.div`
  min-width: 0;

  display: flex;
  align-items: center;
  gap: 12px;

  > div:last-child {
    min-width: 0;
  }

  strong {
    display: block;

    color: ${({ theme }) => theme.colors.textPrimary};
    font-size: 14px;
    font-weight: 800;
  }

  p {
    max-width: 240px;
    margin-top: 4px;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 12px;
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

export const StatusBadge = styled.span<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: 7px 12px;

  border: 1px solid
    ${({ theme, $active }) => ($active ? theme.colors.border : "transparent")};
  border-radius: 7px;

  background-color: ${({ $active }) => ($active ? "#ffffff" : "#f1f1f1")};

  color: ${({ theme, $active }) =>
    $active ? theme.colors.danger : theme.colors.textSecondary};

  font-size: 12px;
  font-weight: 800;
  white-space: nowrap;
`;

export const ArrowButton = styled.button`
  border: none;
  background: none;

  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 30px;

  cursor: pointer;
`;

export const MobileList = styled.div`
  display: none;

  @media (max-width: 760px) {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
`;

export const MobileEventCard = styled.button<{ $selected: boolean }>`
  width: 100%;
  min-width: 0;
  padding: 16px;

  border: 1px solid
    ${({ $selected, theme }) =>
      $selected ? theme.colors.DeepBlue : theme.colors.border};
  border-radius: 12px;

  background-color: ${({ $selected, theme }) =>
    $selected ? theme.colors.background : theme.colors.white};

  text-align: left;
  cursor: pointer;
`;

export const MobileTopRow = styled.div`
  min-width: 0;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const ArrowText = styled.span`
  flex-shrink: 0;

  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 28px;
`;

export const MobileInfoGrid = styled.div`
  margin-top: 16px;
  padding-top: 14px;

  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;

  border-top: 1px solid ${({ theme }) => theme.colors.border};

  > div {
    min-width: 0;

    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  > div:last-child {
    grid-column: 1 / -1;
  }

  span {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 11px;
    font-weight: 600;
  }

  strong {
    overflow-wrap: anywhere;

    color: ${({ theme }) => theme.colors.textPrimary};
    font-size: 12px;
    font-weight: 700;
  }

  @media (max-width: 420px) {
    grid-template-columns: 1fr;

    > div:last-child {
      grid-column: auto;
    }
  }
`;

export const Pagination = styled.div`
  margin-top: 18px;

  display: flex;
  justify-content: center;
  gap: 8px;

  button {
    width: 28px;
    height: 28px;

    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 7px;
    background-color: ${({ theme }) => theme.colors.white};

    color: ${({ theme }) => theme.colors.textSecondary};
    cursor: pointer;
  }

  .active {
    border-color: ${({ theme }) => theme.colors.DeepBlue};
    background-color: ${({ theme }) => theme.colors.DeepBlue};
    color: white;
  }
`;