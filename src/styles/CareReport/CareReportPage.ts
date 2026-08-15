import styled from "styled-components";

export const Page = styled.main`
  width: 100%;
  min-height: 100%;
  padding: 18px 24px 24px;

  background-color: ${({ theme }) => theme.colors.background};

  @media (max-width: 768px) {
    padding: 16px;
  }
`;
export const ElderContentRow = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;

  @media (max-width: 900px) {
    align-items: flex-start;
    flex-direction: column;
    gap: 14px;
  }
`;
export const TopControlArea = styled.section`
  width: 100%;

  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  align-items: stretch;
  gap: 16px;

  margin-bottom: 16px;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

export const DateSelectBox = styled.div`
  min-height: 94px;
  padding: 16px;

  background-color: ${({ theme }) => theme.colors.white};

  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.card};

  box-shadow: ${({ theme }) => theme.shadow.card};
`;

export const ElderSelectBox = styled.div`
  min-height: 94px;
  padding: 16px;

  background-color: ${({ theme }) => theme.colors.white};

  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.card};

  box-shadow: ${({ theme }) => theme.shadow.card};
`;

export const ControlLabel = styled.p`
  margin-bottom: 10px;

  color: ${({ theme }) => theme.colors.textPrimary};

  font-size: 12px;
  font-weight: 700;
`;

export const DateControl = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const DateValue = styled.div`
  height: 40px;
  min-width: 130px;
  padding: 0 12px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  flex: 1;

  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;

  background-color: ${({ theme }) => theme.colors.white};

  color: ${({ theme }) => theme.colors.DeepBlue};

  font-size: 12px;
  font-weight: 600;
`;

export const SmallIcon = styled.img`
  width: 16px;
  height: 16px;

  object-fit: contain;
`;

export const ArrowButton = styled.button`
  width: 34px;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;

  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.DeepBlue};

  font-size: 21px;
  font-weight: 500;

  cursor: pointer;
`;

export const ElderButtonArea = styled.div`
  min-width: 0;

  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
`;

export const ElderButton = styled.button<{ $selected?: boolean }>`
  min-width: 120px;
  height: 40px;
  padding: 0 16px;

  border: 1px solid
    ${({ $selected, theme }) =>
      $selected ? theme.colors.DeepBlue : theme.colors.border};

  border-radius: 6px;

  background-color: ${({ $selected, theme }) =>
    $selected ? theme.colors.DeepBlue : theme.colors.white};

  color: ${({ $selected, theme }) =>
    $selected ? theme.colors.white : theme.colors.textPrimary};

  font-size: 11px;
  font-weight: 700;

  cursor: pointer;
`;

export const RegenerateArea = styled.div`
  margin-left: auto;

  flex-shrink: 0;

  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;

  @media (max-width: 900px) {
    width: 100%;
    margin-left: 0;

    align-items: flex-start;
  }

  @media (max-width: 760px) {
    align-items: stretch;
  }
`;
export const RegenerateButton = styled.button`
  width: 166px;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  border: none;
  border-radius: 6px;

  background-color: ${({ theme }) => theme.colors.DeepBlue};
  color: ${({ theme }) => theme.colors.white};

  font-size: 12px;
  font-weight: 700;

  cursor: pointer;

  @media (max-width: 760px) {
    width: 100%;
  }
`;

export const RegenerateIcon = styled.img`
  width: 17px;
  height: 17px;

  object-fit: contain;
`;

export const LastGeneratedText = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};

  font-size: 10px;
  font-weight: 500;
`;

export const WarningBox = styled.section`
  width: 100%;
  min-height: 76px;
  padding: 16px 20px;

  margin-bottom: 16px;

  display: flex;
  align-items: center;
  gap: 16px;

  border: 1px solid #f2bd7f;
  border-radius: ${({ theme }) => theme.radius.card};

  background-color: #fff7ed;

  box-shadow: ${({ theme }) => theme.shadow.card};
`;

export const WarningIconBox = styled.div`
  flex-shrink: 0;

  width: 30px;
  height: 30px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const WarningIcon = styled.img`
  width: 27px;
  height: 27px;

  object-fit: contain;
`;

export const WarningContent = styled.div`
  min-width: 0;
`;

export const WarningTitle = styled.p`
  color: #b55d0e;

  font-size: 14px;
  font-weight: 800;
`;

export const WarningDescription = styled.p`
  margin-top: 6px;

  color: ${({ theme }) => theme.colors.textPrimary};

  font-size: 11px;
  font-weight: 500;
  line-height: 1.5;
`;

export const ContentGrid = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: minmax(330px, 0.9fr) minmax(520px, 1.4fr);
  gap: 16px;

  @media (max-width: 1250px) {
    grid-template-columns: 1fr;
  }
`;
