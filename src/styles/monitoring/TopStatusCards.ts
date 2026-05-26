import styled from "styled-components";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;

  width: 100%;
  min-width: 1156px;
`;

export const RoomSelectWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const SelectLabel = styled.p`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 14px;
  font-weight: 700;
  white-space: nowrap;
`;

export const SelectBox = styled.select`
  width: 120px;
  height: 42px;
  padding: 0 16px;

  flex-shrink: 0;

  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.white};

  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 15px;
  font-weight: 600;

  outline: none;
  cursor: pointer;

  appearance: none;

  background-image: url("data:image/svg+xml;utf8,<svg fill='gray' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>");
  background-repeat: no-repeat;
  background-position: right 12px center;

  &:focus {
    border-color: ${({ theme }) => theme.colors.DeepBlue};
  }
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 277px);
  gap: 16px;
`;

export const Card = styled.div`
  width: 277px;
  height: 120px;
  padding: 22px;

  display: flex;
  align-items: center;
  gap: 18px;

  flex-shrink: 0;

  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 14px;
  background-color: ${({ theme }) => theme.colors.white};

  overflow: hidden;

  > div:last-child {
    min-width: 0;
  }
`;

export const IconCircle = styled.div<{ $active?: boolean }>`
  width: 52px;
  height: 52px;
  flex-shrink: 0;

  border-radius: 50%;

  background-color: ${({ theme, $active }) =>
    $active ? theme.colors.DeepBlue : "#f3f4f6"};

  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 26px;
    height: 26px;
    object-fit: contain;
  }
`;

export const Title = styled.h3`
  color: ${({ theme }) => theme.colors.DeepBlue};
  font-size: 20px;
  font-weight: 800;

  white-space: nowrap;
`;

export const GreenTitle = styled(Title)`
  color: ${({ theme }) => theme.colors.success};
`;

export const Description = styled.p`
  margin-top: 6px;

  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 12px;
  font-weight: 500;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const SmallStatus = styled.p`
  margin-top: 8px;

  color: ${({ theme }) => theme.colors.success};
  font-size: 11px;
  font-weight: 700;

  white-space: nowrap;
`;

export const TimeText = styled.p`
  margin-top: 6px;

  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 14px;
  font-weight: 600;

  white-space: nowrap;
  font-variant-numeric: tabular-nums;
  font-feature-settings: "tnum";
`;

export const Tag = styled.div`
  width: fit-content;
  max-width: 100%;

  margin-top: 8px;
  padding: 4px 8px;

  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.background};

  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 10px;
  font-weight: 600;

  white-space: nowrap;
`;
