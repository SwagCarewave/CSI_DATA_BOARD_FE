import styled from "styled-components";

export const Card = styled.section`
  width: 100%;
  min-width: 0;
  min-height: 165px;
  padding: 24px;

  display: flex;
  align-items: center;
  gap: 20px;

  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.card};
  box-shadow: ${({ theme }) => theme.shadow.card};

  @media (max-width: 1100px) {
    min-height: auto;
  }

  @media (max-width: 480px) {
    padding: 20px;
  }
`;

export const IconCircle = styled.div`
  width: 58px;
  height: 58px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;
  background-color: #f8eeee;

  img {
    width: 28px;
    height: 28px;
    object-fit: contain;
  }
`;

export const SummaryText = styled.div`
  min-width: 0;

  display: flex;
  flex-direction: column;
  gap: 4px;

  span {
    color: ${({ theme }) => theme.colors.textPrimary};
    font-size: 13px;
    font-weight: 700;
  }

  strong {
    color: ${({ theme }) => theme.colors.danger};
    font-size: clamp(36px, 4vw, 42px);
    font-weight: 800;
    line-height: 1;
  }

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 13px;
  }
`;