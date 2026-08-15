import styled from "styled-components";

export const Card = styled.section`
  min-height: 230px;
  padding: 18px;

  background-color: ${({ theme }) => theme.colors.white};

  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.card};

  box-shadow: ${({ theme }) => theme.shadow.card};
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const Title = styled.h3`
  color: ${({ theme }) => theme.colors.DeepBlue};

  font-size: 14px;
  font-weight: 800;
`;

export const Subtitle = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};

  font-size: 9px;
  font-weight: 500;
`;

export const MetricGrid = styled.div`
  margin-top: 14px;

  display: grid;
  grid-template-columns: repeat(4, minmax(120px, 1fr));
  gap: 10px;

  @media (max-width: 820px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const MetricCard = styled.div`
  min-height: 165px;
  padding: 12px 8px;

  display: flex;
  flex-direction: column;
  align-items: center;

  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;

  background-color: ${({ theme }) => theme.colors.white};
`;

export const MetricTitle = styled.p`
  color: ${({ theme }) => theme.colors.textPrimary};

  font-size: 10px;
  font-weight: 700;
  text-align: center;
`;

export const IconCircle = styled.div`
  width: 46px;
  height: 46px;

  margin-top: 10px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background-color: #f4f5f7;
`;

export const Icon = styled.img`
  width: 25px;
  height: 25px;

  object-fit: contain;
`;

export const ValueArea = styled.div`
  margin-top: 7px;

  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 3px;

  color: ${({ theme }) => theme.colors.DeepBlue};
`;

export const Value = styled.strong`
  font-size: 24px;
  font-weight: 800;
  line-height: 1;
`;

export const Unit = styled.span`
  font-size: 9px;
  font-weight: 700;
`;

export const ChangeText = styled.p<{
  $type: string;
}>`
  margin-top: 7px;

  color: ${({ $type }) =>
    $type === "increase"
      ? "#d64a3a"
      : $type === "decrease"
      ? "#1d63a7"
      : "#666666"};

  font-size: 10px;
  font-weight: 800;
`;

export const Description = styled.p`
  margin-top: 5px;

  color: ${({ theme }) => theme.colors.textSecondary};

  font-size: 8px;
  font-weight: 600;
  text-align: center;
`;

export const AverageText = styled.p`
  margin-top: 8px;

  color: ${({ theme }) => theme.colors.textSecondary};

  font-size: 8px;
  font-weight: 500;
`;
