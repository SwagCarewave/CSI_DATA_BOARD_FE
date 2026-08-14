import styled from "styled-components";

export const Card = styled.section`
  width: 100%;
  min-width: 0;
  padding: 28px 32px;

  display: flex;
  flex-direction: column;

  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.card};
  box-shadow: ${({ theme }) => theme.shadow.card};
`;

export const CardTitle = styled.h3`
  margin-bottom: 20px;

  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 19px;
  font-weight: 800;
  line-height: 37px;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: minmax(160px, 210px) minmax(0, 1fr) minmax(160px, 240px);
  align-items: center;
  gap: 16px;

  padding: 18px 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
    align-items: flex-start;
    gap: 8px;
  }
`;

export const RowLabelGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const RowIcon = styled.span`
  display: inline-flex;
  width: 20px;
  height: 20px;
  flex-shrink: 0;

  color: ${({ theme }) => theme.colors.DeepBlue};

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const RowLabel = styled.span`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 14px;
  font-weight: 700;
`;

export const RowDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 12px;
  line-height: 1.5;
  text-align: left;
`;

export const ToggleSwitch = styled.button<{ $on: boolean }>`
  position: relative;
  width: 46px;
  height: 26px;
  flex-shrink: 0;

  border: none;
  border-radius: 999px;
  background-color: ${({ theme, $on }) =>
    $on ? theme.colors.DeepBlue : theme.colors.border};

  cursor: pointer;

  &::after {
    content: "";
    position: absolute;
    top: 3px;
    left: ${({ $on }) => ($on ? "23px" : "3px")};

    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.white};

    transition: left 0.15s ease;
  }
`;

export const SegmentGroup = styled.div`
  display: inline-flex;
  width: fit-content;
  gap: 2px;
  padding: 4px;

  background-color: #f3f2f1;
  border-radius: 10px;
`;

export const SegmentButton = styled.button<{ $active: boolean }>`
  padding: 9px 20px;

  border: none;
  border-radius: 8px;
  background-color: ${({ theme, $active }) =>
    $active ? theme.colors.DeepBlue : "transparent"};

  color: ${({ theme, $active }) =>
    $active ? theme.colors.white : theme.colors.textPrimary};
  font-size: 13px;
  font-weight: 700;

  cursor: pointer;
`;

export const StepperBox = styled.div`
  display: inline-flex;
  align-items: stretch;
  width: fit-content;

  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  overflow: hidden;
`;

export const StepperInput = styled.input`
  width: 90px;
  padding: 0 12px;

  border: none;
  outline: none;
  background: none;

  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 14px;
  font-weight: 700;
  text-align: center;

  &[type="number"] {
    -moz-appearance: textfield;
  }

  &[type="number"]::-webkit-outer-spin-button,
  &[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const StepperArrows = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 3px;
  padding: 0 10px;

  border-left: 1px solid ${({ theme }) => theme.colors.border};
`;

export const StepperArrowButton = styled.button`
  width: 22px;
  height: 16px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  background: none;
  padding: 0;

  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 10px;
  line-height: 1;

  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.DeepBlue};
  }
`;

export const UnitBox = styled.span`
  padding: 0 18px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-left: 1px solid ${({ theme }) => theme.colors.border};
  background-color: #f3f2f1;

  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 13px;
`;

export const TestButton = styled.button`
  width: fit-content;
  padding: 13px 32px;

  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.white};

  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 13px;
  font-weight: 700;

  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.colors.DeepBlue};
  }
`;

export const ContactRow = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

export const ContactBox = styled.span`
  padding: 11px 16px;

  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.white};

  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
`;

export const SaveRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

export const SaveButton = styled.button`
  min-width: 180px;
  padding: 13px 24px;

  border: none;
  border-radius: ${({ theme }) => theme.radius.button};
  background-color: ${({ theme }) => theme.colors.DeepBlue};

  color: ${({ theme }) => theme.colors.white};
  font-size: 14px;
  font-weight: 700;

  cursor: pointer;
`;

export const SavedMessage = styled.p`
  margin-top: 10px;
  text-align: right;

  color: ${({ theme }) => theme.colors.success};
  font-size: 12px;
  font-weight: 700;
`;
