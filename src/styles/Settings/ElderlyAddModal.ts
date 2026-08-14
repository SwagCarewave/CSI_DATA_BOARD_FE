import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 999;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: rgba(17, 24, 39, 0.35);
`;

export const ModalBox = styled.div`
  width: 420px;
  max-width: calc(100vw - 32px);
  max-height: calc(100vh - 64px);
  overflow-y: auto;
  padding: 28px;

  display: flex;
  flex-direction: column;
  gap: 18px;

  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radius.card};
  box-shadow: 0 18px 60px rgba(0, 0, 0, 0.18);
`;

export const Title = styled.h3`
  color: ${({ theme }) => theme.colors.DeepBlue};
  font-size: 17px;
  font-weight: 800;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Label = styled.label`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 12px;
  font-weight: 700;
`;

export const Input = styled.input`
  width: 100%;
  height: 40px;
  padding: 0 12px;

  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.white};

  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 13px;

  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.DeepBlue};
  }

  &[type="number"] {
    -moz-appearance: textfield;
  }

  &[type="number"]::-webkit-outer-spin-button,
  &[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const AgeInputWrapper = styled.div`
  position: relative;

  span {
    position: absolute;
    top: 50%;
    right: 12px;
    transform: translateY(-50%);

    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 13px;
  }
`;

export const ButtonRow = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 6px;
`;

export const CancelButton = styled.button`
  flex: 1;
  height: 44px;

  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.button};
  background-color: ${({ theme }) => theme.colors.white};

  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 14px;
  font-weight: 700;

  cursor: pointer;
`;

export const SaveButton = styled.button`
  flex: 1;
  height: 44px;

  border: none;
  border-radius: ${({ theme }) => theme.radius.button};
  background-color: ${({ theme }) => theme.colors.DeepBlue};

  color: ${({ theme }) => theme.colors.white};
  font-size: 14px;
  font-weight: 700;

  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
