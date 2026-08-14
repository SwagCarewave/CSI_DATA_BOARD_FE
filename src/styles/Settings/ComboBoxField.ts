import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  min-width: 0;
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
`;

export const Dropdown = styled.ul`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  z-index: 20;

  max-height: 200px;
  overflow-y: auto;
  padding: 6px;

  list-style: none;

  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadow.card};
`;

export const Option = styled.li`
  padding: 8px 10px;
  border-radius: 6px;

  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 13px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.sidebarBackground};
  }
`;

export const AddOption = styled(Option)`
  color: ${({ theme }) => theme.colors.DeepBlue};
  font-weight: 700;

  &:hover {
    background-color: ${({ theme }) => theme.colors.successLight};
  }
`;

export const EmptyOption = styled.li`
  padding: 8px 10px;

  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 12px;
`;
