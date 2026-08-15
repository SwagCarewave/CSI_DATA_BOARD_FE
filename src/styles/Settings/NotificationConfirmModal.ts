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
  width: 340px;
  max-width: calc(100vw - 32px);
  padding: 28px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radius.card};
  box-shadow: 0 18px 60px rgba(0, 0, 0, 0.18);

  text-align: center;
`;

export const Message = styled.p`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 14px;
  font-weight: 700;
  line-height: 1.5;
`;

export const ButtonRow = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
`;

export const CancelButton = styled.button`
  flex: 1;
  height: 42px;

  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.button};
  background-color: ${({ theme }) => theme.colors.white};

  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 13px;
  font-weight: 700;

  cursor: pointer;
`;

export const ConfirmButton = styled.button`
  flex: 1;
  height: 42px;

  border: none;
  border-radius: ${({ theme }) => theme.radius.button};
  background-color: ${({ theme }) => theme.colors.DeepBlue};

  color: ${({ theme }) => theme.colors.white};
  font-size: 13px;
  font-weight: 700;

  cursor: pointer;
`;
