import styled from "styled-components";

type EventColor = "danger" | "warning" | "caution" | "purple" | string;

export const Container = styled.div`
  width: 100%;
`;

export const TopSection = styled.div`
  display: grid;
  grid-template-columns: 190px 1fr;
  gap: 14px;
  margin-bottom: 14px;
`;

export const SummaryCard = styled.section`
  height: 165px;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 20px;

  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.card};
  box-shadow: ${({ theme }) => theme.shadow.card};
`;

export const EmptyIconCircle = styled.div`
  width: 58px;
  height: 58px;
  border-radius: 50%;
  flex-shrink: 0;
  background-color: #f1eeee;
`;

export const SummaryText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  span {
    font-size: 13px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  strong {
    font-size: 42px;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.danger};
    line-height: 1;
  }

  p {
    font-size: 13px;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

export const FilterCard = styled.section`
  height: 165px;
  padding: 22px 24px;

  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.card};
  box-shadow: ${({ theme }) => theme.shadow.card};
`;

export const CardTitle = styled.h3`
  margin-bottom: 18px;
  font-size: 15px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.DeepBlue};
`;

export const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: 150px 190px 130px 150px;
  gap: 28px;
  align-items: end;
`;

export const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9px;
`;

export const Label = styled.span`
  font-size: 12px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const DateInput = styled.div`
  height: 34px;
  padding: 0 12px;
  display: flex;
  align-items: center;

  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;

  font-size: 13px;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const CheckItem = styled.div<{ color: EventColor }>`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textPrimary};

  &::before {
    content: "✓";
    display: inline-flex;
    justify-content: center;
    align-items: center;

    width: 16px;
    height: 16px;
    margin-right: 8px;

    border-radius: 4px;
    color: white;
    font-size: 11px;
    background-color: ${({ theme, color }) => theme.colors[color]};
  }
`;

export const RadioItem = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textPrimary};

  &::before {
    content: "";
    display: inline-block;
    width: 13px;
    height: 13px;
    margin-right: 8px;
    border-radius: 50%;
    border: 2px solid ${({ theme }) => theme.colors.DeepBlue};
    vertical-align: -2px;
  }
`;

export const ExportButton = styled.button`
  height: 42px;
  border-radius: ${({ theme }) => theme.radius.button};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.white};

  font-size: 13px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.DeepBlue};
`;

export const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 310px;
  gap: 14px;
`;

export const TableCard = styled.section`
  min-height: 430px;
  padding: 18px 20px;

  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.card};
  box-shadow: ${({ theme }) => theme.shadow.card};
`;

export const TotalText = styled.p`
  margin-bottom: 8px;
  font-size: 13px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th {
    height: 38px;
    text-align: left;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.DeepBlue};
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }

  td {
    height: 72px;
    font-size: 13px;
    color: ${({ theme }) => theme.colors.textPrimary};
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

export const EventInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  strong {
    font-size: 14px;
    font-weight: 800;
  }

  p {
    margin-top: 4px;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

export const EventIcon = styled.div<{ color: EventColor }>`
  width: 42px;
  height: 42px;
  border-radius: 10px;
  flex-shrink: 0;
  background-color: ${({ theme, color }) => theme.colors[color]};
`;

export const StatusBadge = styled.span<{ $active: boolean }>`
  padding: 7px 12px;
  border-radius: 7px;

  font-size: 12px;
  font-weight: 800;

  color: ${({ theme, $active }) =>
    $active ? theme.colors.danger : theme.colors.textSecondary};
  background-color: ${({ $active }) => ($active ? "#FFFFFF" : "#F1F1F1")};
  border: 1px solid
    ${({ theme, $active }) => ($active ? theme.colors.border : "transparent")};
`;

export const ArrowButton = styled.button`
  border: none;
  background: none;
  font-size: 30px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const Pagination = styled.div`
  margin-top: 14px;
  display: flex;
  justify-content: center;
  gap: 8px;

  button {
    width: 28px;
    height: 28px;
    border-radius: 7px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  .active {
    background-color: ${({ theme }) => theme.colors.DeepBlue};
    color: white;
  }
`;

export const DetailCard = styled.aside`
  min-height: 430px;
  padding: 22px;

  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.card};
  box-shadow: ${({ theme }) => theme.shadow.card};
`;

export const DetailHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 26px;

  h3 {
    font-size: 16px;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.DeepBlue};
  }

  button {
    border: none;
    background: none;
    font-size: 24px;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

export const DetailTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;

  strong {
    font-size: 16px;
    color: ${({ theme }) => theme.colors.danger};
  }
`;

export const DetailStatus = styled.span`
  margin-left: auto;
  padding: 5px 9px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.danger};
  color: white;
  font-size: 11px;
  font-weight: 800;
`;

export const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding-bottom: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  div {
    display: flex;
    justify-content: space-between;
  }

  span {
    font-size: 13px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  strong {
    font-size: 13px;
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

export const DetailSection = styled.div`
  margin-top: 22px;

  h4 {
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.DeepBlue};
  }

  p {
    font-size: 13px;
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

export const DetailButtons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 44px;

  button {
    height: 42px;
    border-radius: ${({ theme }) => theme.radius.button};
    border: 1px solid ${({ theme }) => theme.colors.border};
    background-color: white;
    color: ${({ theme }) => theme.colors.textPrimary};
    font-weight: 700;
  }

  .primary {
    background-color: ${({ theme }) => theme.colors.DeepBlue};
    color: white;
  }
`;
