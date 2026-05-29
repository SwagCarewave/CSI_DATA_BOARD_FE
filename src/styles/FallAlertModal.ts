import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: rgba(255, 255, 255, 0.35);
  backdrop-filter: blur(6px);

  overscroll-behavior: none;
`;

export const ModalBox = styled.div`
  width: 430px;
  min-height: 320px;
  padding: 40px 32px;

  display: flex;
  flex-direction: column;
  align-items: center;

  border-radius: 18px;
  background-color: rgba(245, 242, 240, 0.95);
  box-shadow: 0 18px 60px rgba(0, 0, 0, 0.12);
`;

export const WarningIcon = styled.div`
  width: 0;
  height: 0;

  border-left: 42px solid transparent;
  border-right: 42px solid transparent;
  border-bottom: 74px solid ${({ theme }) => theme.colors.danger};

  position: relative;

  &::after {
    content: "!";
    position: absolute;
    top: 25px;
    left: -6px;

    color: white;
    font-size: 34px;
    font-weight: 800;
  }
`;

export const Message = styled.h2`
  margin-top: 28px;

  color: ${({ theme }) => theme.colors.textPrimary};

  font-size: 32px;
  font-weight: 800;
`;

export const ConfirmButton = styled.button`
  width: 170px;
  height: 64px;
  margin-top: 62px;

  border: none;
  border-radius: 8px;

  background-color: ${({ theme }) => theme.colors.danger};

  color: white;
  font-size: 22px;
  font-weight: 800;

  cursor: pointer;
`;
