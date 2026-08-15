import styled from "styled-components";

export const Container = styled.div`
  min-width: 0;

  display: grid;
  grid-template-columns: minmax(230px, 0.85fr) minmax(310px, 1.15fr);
  gap: 16px;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

export const EventCard = styled.section`
  min-height: 200px;
  padding: 18px;

  background-color: ${({ theme }) => theme.colors.white};

  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.card};

  box-shadow: ${({ theme }) => theme.shadow.card};
`;

export const ReportCard = styled.section`
  min-height: 200px;
  padding: 18px;

  background-color: ${({ theme }) => theme.colors.white};

  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.card};

  box-shadow: ${({ theme }) => theme.shadow.card};
`;

export const Title = styled.h3`
  color: ${({ theme }) => theme.colors.DeepBlue};

  font-size: 14px;
  font-weight: 800;
`;

export const EventList = styled.div`
  margin-top: 13px;

  display: flex;
  flex-direction: column;
`;

export const EventRow = styled.div`
  min-height: 38px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
`;

export const EventInfo = styled.div`
  min-width: 0;

  display: flex;
  align-items: center;
  gap: 9px;
`;

export const EventIconCircle = styled.div<{
  $type: string;
}>`
  width: 22px;
  height: 22px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background-color: ${({ $type }) => {
    switch ($type) {
      case "normal":
        return "#28a563";
      case "danger":
        return "#db4437";
      case "alert":
        return "#7a45b8";
      default:
        return "#999999";
    }
  }};
`;

export const EventIcon = styled.img`
  width: 14px;
  height: 14px;

  display: block;

  object-fit: contain;
  object-position: center;

  margin: auto;
`;

export const EventLabel = styled.p`
  color: ${({ theme }) => theme.colors.textPrimary};

  font-size: 10px;
  font-weight: 700;
`;

export const EventValue = styled.p`
  flex-shrink: 0;

  color: ${({ theme }) => theme.colors.textSecondary};

  font-size: 9px;
  font-weight: 600;
`;

export const Table = styled.div`
  margin-top: 13px;

  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;

  overflow: hidden;
`;

export const TableRow = styled.div`
  min-height: 34px;

  display: grid;
  grid-template-columns: 95px 1fr;

  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 430px) {
    grid-template-columns: 86px 1fr;
  }
`;

export const TableLabel = styled.div`
  padding: 8px 10px;

  display: flex;
  align-items: center;

  color: ${({ theme }) => theme.colors.textSecondary};

  font-size: 9px;
  font-weight: 700;
`;

export const TableValue = styled.div`
  padding: 8px 10px;

  display: flex;
  align-items: center;

  color: ${({ theme }) => theme.colors.textPrimary};

  font-size: 9px;
  font-weight: 600;
`;

export const SuccessBadge = styled.span`
  padding: 3px 7px;

  border-radius: 3px;

  background-color: #d9f3e1;
  color: #24a05e;

  font-size: 8px;
  font-weight: 800;
`;
