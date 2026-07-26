// src/styles/Sidebar.ts

import styled from "styled-components";

export const SidebarContainer = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;

  width: 220px;
  height: 100vh;
  padding: 34px 16px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  overflow-y: auto;

  background-color: ${({ theme }) => theme.colors.sidebarBackground};
  border-right: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: 900px) {
    position: relative;

    width: 100%;
    height: auto;
    padding: 18px 16px;

    display: block;

    overflow: visible;

    border-right: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

export const LogoBox = styled.div`
  margin-bottom: 46px;

  @media (max-width: 900px) {
    margin-bottom: 18px;
  }
`;

export const Logo = styled.h1`
  color: ${({ theme }) => theme.colors.DeepBlue};

  font-size: 27px;
  font-weight: 800;
  letter-spacing: -1px;
`;

export const SubLogo = styled.p`
  margin-top: 4px;

  color: ${({ theme }) => theme.colors.DeepBlue};

  font-size: 9px;
  font-weight: 500;
  letter-spacing: -0.2px;
`;

export const MenuList = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 18px;

  @media (max-width: 900px) {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 8px;
  }

  @media (max-width: 650px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const MenuItem = styled.button<{ $active?: boolean }>`
  width: 100%;
  min-width: 0;
  min-height: 42px;
  padding: 0 14px;

  display: flex;
  align-items: center;
  gap: 10px;

  border: none;
  border-radius: 6px;

  background-color: ${({ $active, theme }) =>
    $active ? theme.colors.DeepBlue : "transparent"};

  color: ${({ $active, theme }) =>
    $active ? theme.colors.white : theme.colors.textSecondary};

  cursor: pointer;

  @media (max-width: 900px) {
    padding: 10px;
  }
`;

export const MenuNumber = styled.span`
  flex-shrink: 0;

  font-size: 20px;
  font-weight: 800;
`;

export const MenuText = styled.span`
  min-width: 0;

  font-size: 12px;
  font-weight: 700;
  line-height: 1.4;
  text-align: left;

  @media (max-width: 1100px) and (min-width: 901px) {
    font-size: 11px;
  }
`;

export const ConnectionBox = styled.div`
  width: 100%;
  min-height: 162px;
  padding: 24px 18px;

  flex-shrink: 0;

  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;

  background-color: ${({ theme }) => theme.colors.sidebarBackground};

  @media (max-width: 900px) {
    display: none;
  }
`;

export const ConnectionIcon = styled.img`
  height: 50px;
  object-fit: contain;
`;

export const ConnectionLabel = styled.p`
  margin-top: 12px;

  color: ${({ theme }) => theme.colors.textPrimary};

  font-size: 11px;
  font-weight: 700;
`;

export const ConnectionStatus = styled.p`
  margin-top: 4px;

  color: ${({ theme }) => theme.colors.DeepBlue};

  font-size: 18px;
  font-weight: 800;
`;

export const ConnectionDescription = styled.p`
  margin-top: 14px;

  color: ${({ theme }) => theme.colors.textSecondary};

  font-size: 9px;
  font-weight: 500;
  line-height: 1.6;
`;
