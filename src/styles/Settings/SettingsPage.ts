import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  min-width: 0;

  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const TabBar = styled.div`
  display: flex;
  gap: 8px;

  padding: 6px;

  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.button};
  width: fit-content;

  @media (max-width: 560px) {
    width: 100%;
  }
`;

export const TabButton = styled.button<{ $active: boolean }>`
  padding: 10px 20px;

  border: none;
  border-radius: 8px;
  background-color: ${({ theme, $active }) =>
    $active ? theme.colors.DeepBlue : "transparent"};

  color: ${({ theme, $active }) =>
    $active ? theme.colors.white : theme.colors.textSecondary};
  font-size: 13px;
  font-weight: 700;

  cursor: pointer;

  @media (max-width: 560px) {
    flex: 1;
  }
`;

export const TabContent = styled.div`
  width: 100%;
  min-width: 0;
`;
