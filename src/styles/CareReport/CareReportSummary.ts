import styled from "styled-components";

export const Card = styled.section`
  min-height: 230px;
  padding: 18px;

  display: flex;
  flex-direction: column;

  background-color: ${({ theme }) => theme.colors.white};

  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.card};

  box-shadow: ${({ theme }) => theme.shadow.card};
`;

export const Title = styled.h3`
  color: ${({ theme }) => theme.colors.DeepBlue};

  font-size: 14px;
  font-weight: 800;
`;

export const Content = styled.div`
  margin-top: 18px;

  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Paragraph = styled.p`
  color: ${({ theme }) => theme.colors.textPrimary};

  font-size: 11px;
  font-weight: 500;
  line-height: 1.75;

  strong {
    font-weight: 800;
  }
`;

export const Notice = styled.p`
  margin-top: auto;
  padding-top: 14px;

  color: ${({ theme }) => theme.colors.textSecondary};

  font-size: 9px;
  font-weight: 500;
`;
