import styled from "styled-components";

export const SidebarContainer = styled.aside`
  width: 180px;
  min-height: 100vh;
  padding: 34px 16px;

  display: flex;
  flex-direction: column;

  background-color: ${({ theme }) => theme.colors.sidebarBackground};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
`;
export const LogoBox = styled.div`
  margin-bottom: 46px;
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
`;

export const MenuItem = styled.button<{ $active?: boolean }>`
  width: 100%;
  height: 42px;
  padding: 0 14px;

  display: flex;
  align-items: center;
  gap: 10px;

  border-radius: 6px;

  background-color: ${({ $active, theme }) =>
    $active ? theme.colors.DeepBlue : "transparent"};

  color: ${({ $active, theme }) =>
    $active ? theme.colors.white : theme.colors.textSecondary};

  cursor: pointer;
`;

export const MenuNumber = styled.span`
  font-size: 20px;
  font-weight: 800;
`;

export const MenuText = styled.span`
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;
`;

export const ConnectionBox = styled.div`
  margin-top: auto;

  width: 100%;
  height: 162px;
  padding: 24px 18px;

  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;

  // src/styles/Sidebar.ts

  background-color: ${({ theme }) => theme.colors.sidebarBackground};
`;

export const ConnectionIcon = styled.div`
  color: ${({ theme }) => theme.colors.DeepBlue};

  font-size: 22px;
  font-weight: 700;
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
