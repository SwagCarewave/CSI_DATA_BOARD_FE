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

export const RoomGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 12px;
`;

export const RoomCard = styled.div`
  padding: 20px 16px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  background-color: transparent;

  text-align: center;
`;

export const RoomNumber = styled.strong`
  color: ${({ theme }) => theme.colors.DeepBlue};
  font-size: 20px;
  font-weight: 800;
`;

export const DeviceIconWrapper = styled.div`
  width: 28px;
  height: 28px;
  margin: 4px 0;

  display: flex;
  align-items: center;
  justify-content: center;

  color: ${({ theme }) => theme.colors.DeepBlue};

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const DeviceLabel = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 12px;
`;

export const DeviceCount = styled.span`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 13px;
  font-weight: 700;
`;

export const StatusText = styled.span<{ $normal: boolean }>`
  display: flex;
  align-items: center;
  gap: 5px;

  color: ${({ theme, $normal }) =>
    $normal ? theme.colors.success : theme.colors.danger};
  font-size: 12px;
  font-weight: 700;

  &::before {
    content: "●";
    font-size: 8px;
  }
`;

export const InfoNotice = styled.p`
  margin-top: 16px;
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
