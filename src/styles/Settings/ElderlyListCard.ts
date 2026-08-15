import styled from "styled-components";

export const Card = styled.section`
  width: 100%;
  min-width: 0;
  padding: 28px 32px;

  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.card};
  box-shadow: ${({ theme }) => theme.shadow.card};
`;

export const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const CardTitle = styled.h3`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 19px;
  font-weight: 800;
  line-height: 37px;
`;

export const AddButton = styled.button`
  padding: 11px 18px;

  border: none;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.DeepBlue};

  color: ${({ theme }) => theme.colors.white};
  font-size: 13px;
  font-weight: 700;

  cursor: pointer;
`;

export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`;

export const Table = styled.table`
  width: 100%;
  min-width: 520px;
  border-collapse: separate;
  border-spacing: 0;

  thead tr {
    background-color: #f3f2f1;
  }

  th {
    padding: 13px 16px;
    text-align: left;

    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 13px;
    font-weight: 700;

    &:first-child {
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
    }

    &:last-child {
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
      text-align: center;
    }
  }

  th:last-child,
  td:last-child {
    border-left: 1px solid ${({ theme }) => theme.colors.border};
  }

  td {
    padding: 18px 16px;

    color: ${({ theme }) => theme.colors.textPrimary};
    font-size: 14px;

    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }

  tbody tr:last-child td {
    border-bottom: none;
  }
`;

export const ManageCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

export const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  background: none;
  padding: 0;

  color: ${({ theme }) => theme.colors.textSecondary};

  cursor: pointer;

  svg {
    width: 18px;
    height: 18px;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.DeepBlue};
  }
`;

export const DeleteButton = styled(IconButton)`
  &:hover {
    color: ${({ theme }) => theme.colors.danger};
  }
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 20px;

  button {
    min-width: 32px;
    height: 32px;
    padding: 0 6px;

    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 8px;
    background-color: ${({ theme }) => theme.colors.white};

    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;

    &.active {
      background-color: ${({ theme }) => theme.colors.DeepBlue};
      border-color: ${({ theme }) => theme.colors.DeepBlue};
      color: ${({ theme }) => theme.colors.white};
    }

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  }
`;

export const InfoNotice = styled.div`
  margin-top: 20px;
  padding: 13px 16px;

  display: flex;
  align-items: center;
  gap: 10px;

  background-color: #f3f2f1;
  border-radius: 10px;

  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 13px;
`;

export const InfoIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  flex-shrink: 0;

  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.DeepBlue};

  color: ${({ theme }) => theme.colors.white};
  font-size: 11px;
  font-weight: 700;
`;
