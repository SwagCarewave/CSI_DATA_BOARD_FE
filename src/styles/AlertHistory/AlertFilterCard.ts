import styled from "styled-components";

type FilterColor = "danger" | "warning" | "purple";

export const Card = styled.section`
  width: 100%;
  min-width: 0;
  min-height: 165px;
  padding: 22px 24px;

  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.card};
  box-shadow: ${({ theme }) => theme.shadow.card};

  @media (max-width: 480px) {
    padding: 20px 16px;
  }
`;

export const CardTitle = styled.h3`
  margin-bottom: 18px;

  color: ${({ theme }) => theme.colors.DeepBlue};
  font-size: 15px;
  font-weight: 800;
`;

export const FilterGrid = styled.div`
  width: 100%;
  min-width: 0;

  display: grid;
  grid-template-columns:
    minmax(150px, 0.9fr)
    minmax(180px, 1.2fr)
    minmax(130px, 0.8fr)
    minmax(150px, 0.8fr);

  gap: 24px;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

export const FilterGroup = styled.div`
  min-width: 0;

  display: flex;
  flex-direction: column;
  gap: 9px;
`;

export const Label = styled.span`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 12px;
  font-weight: 700;
`;

export const DateInput = styled.input`
  width: 100%;
  min-width: 0;
  height: 34px;
  padding: 0 10px;

  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.white};

  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 12px;

  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.DeepBlue};
  }
`;

export const CheckLabel = styled.label<{ $color: FilterColor }>`
  width: fit-content;

  display: flex;
  align-items: center;
  gap: 8px;

  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 13px;

  cursor: pointer;

  input {
    width: 16px;
    height: 16px;
    margin: 0;

    accent-color: ${({ theme, $color }) => theme.colors[$color]};
    cursor: pointer;
  }
`;

export const RadioLabel = styled.label`
  width: fit-content;

  display: flex;
  align-items: center;
  gap: 8px;

  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 13px;

  cursor: pointer;

  input {
    width: 15px;
    height: 15px;
    margin: 0;

    accent-color: ${({ theme }) => theme.colors.DeepBlue};
    cursor: pointer;
  }
`;

export const ButtonArea = styled.div`
  height: 100%;

  display: flex;
  align-items: flex-end;

  @media (max-width: 900px) {
    align-items: flex-start;
  }
`;

export const ExportButton = styled.button`
  width: 100%;
  max-width: 170px;
  height: 42px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.button};
  background-color: ${({ theme }) => theme.colors.white};

  color: ${({ theme }) => theme.colors.DeepBlue};
  font-size: 13px;
  font-weight: 700;

  cursor: pointer;

  img {
    width: 16px;
    height: 16px;
  }

  @media (max-width: 560px) {
    max-width: none;
  }
`;
