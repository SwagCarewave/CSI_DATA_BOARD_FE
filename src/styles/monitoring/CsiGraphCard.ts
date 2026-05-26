import styled from "styled-components";

export const Card = styled.section`
  width: 520px;
  height: 360px;
  padding: 16px;

  flex-shrink: 0;

  display: grid;
  grid-template-columns: 364px 110px;
  gap: 14px;

  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 14px;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const GraphArea = styled.div`
  width: 364px;
  min-width: 0;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

export const Title = styled.span`
  color: ${({ theme }) => theme.colors.DeepBlue};
  font-size: 16px;
  font-weight: 800;
  white-space: nowrap;
`;

export const SubTitle = styled.span`
  margin-left: 6px;

  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
`;
export const SelectBox = styled.select`
  width: 108px;
  height: 32px;
  padding: 0 10px;

  flex-shrink: 0;

  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;

  background-color: ${({ theme }) => theme.colors.white};

  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 11px;
  font-weight: 600;

  white-space: nowrap;

  outline: none;
  cursor: pointer;

  appearance: none;

  background-image: url("data:image/svg+xml;utf8,<svg fill='gray' height='20' viewBox='0 0 24 24' width='20' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>");
  background-repeat: no-repeat;
  background-position: right 8px center;

  &:focus {
    border-color: ${({ theme }) => theme.colors.DeepBlue};
  }
`;

export const Legend = styled.div`
  margin-top: 14px;

  display: flex;
  justify-content: center;
  gap: 10px;

  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 9px;
  font-weight: 600;

  white-space: nowrap;
`;

export const GraphPlaceholder = styled.div`
  position: relative;

  margin-top: 18px;
  width: 364px;
  height: 250px;

  border-left: 1px solid ${({ theme }) => theme.colors.border};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  background-image: linear-gradient(
    to bottom,
    ${({ theme }) => theme.colors.border} 1px,
    transparent 1px
  );
  background-size: 100% 42px;

  overflow: hidden;
`;

const FakeLine = styled.div`
  position: absolute;
  left: 20px;
  right: 20px;

  height: 2px;
  border-radius: 999px;
`;

export const LineOne = styled(FakeLine)`
  top: 70px;
  background-color: #4f73b8;
  box-shadow: 30px 8px 0 #4f73b8, 70px -6px 0 #4f73b8, 110px 10px 0 #4f73b8,
    160px -4px 0 #4f73b8, 220px 8px 0 #4f73b8;
`;

export const LineTwo = styled(FakeLine)`
  top: 112px;
  background-color: #9ca3af;
  box-shadow: 35px -10px 0 #9ca3af, 90px 7px 0 #9ca3af, 145px -5px 0 #9ca3af,
    210px 9px 0 #9ca3af;
`;

export const LineThree = styled(FakeLine)`
  top: 158px;
  background-color: #8b5fc7;
  box-shadow: 40px 11px 0 #8b5fc7, 95px -8px 0 #8b5fc7, 150px 12px 0 #8b5fc7,
    230px -7px 0 #8b5fc7;
`;

export const LineFour = styled(FakeLine)`
  top: 105px;
  height: 0;
  border-top: 2px dashed #1a9c53;
  background-color: transparent;
  box-shadow: 50px -25px 0 #1a9c53, 120px 15px 0 #1a9c53, 190px -18px 0 #1a9c53;
`;

export const BioSignalBox = styled.aside`
  width: 110px;

  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const BioTitle = styled.h4`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 12px;
  font-weight: 800;
  white-space: nowrap;

  span {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-weight: 600;
  }
`;

export const BioCard = styled.div`
  width: 110px;
  height: 90px;
  padding: 14px 12px;

  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const BioLabel = styled.p`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;
`;

export const BioValue = styled.p`
  margin-top: 10px;

  color: ${({ theme }) => theme.colors.DeepBlue};
  font-size: 36px;
  font-weight: 800;

  white-space: nowrap;

  span {
    font-size: 12px;
    font-weight: 700;
  }
`;

export const Note = styled.p`
  margin-top: 4px;

  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 10px;
  font-weight: 500;
  line-height: 1.5;
`;
