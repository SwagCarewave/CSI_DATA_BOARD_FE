// src/styles/Header.ts

import styled from "styled-components";

export const HeaderContainer = styled.header`
  width: 100%;
  min-width: 0;
  min-height: 110px;
  padding: 16px 32px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;

  background-color: #ffffff;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: 1350px) {
    align-items: flex-start;
    flex-direction: column;
  }

  @media (max-width: 768px) {
    padding: 16px;
    gap: 18px;
  }
`;

export const TitleArea = styled.div`
  min-width: 0;

  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 480px) {
    gap: 12px;
  }
`;

export const PageNumber = styled.h1`
  flex-shrink: 0;

  color: ${({ theme }) => theme.colors.DeepBlue};

  font-size: clamp(40px, 5vw, 64px);
  font-weight: 800;
  line-height: 1;
`;

export const TitleTextBox = styled.div`
  min-width: 0;

  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const PageTitle = styled.h2`
  color: ${({ theme }) => theme.colors.DeepBlue};

  font-size: clamp(21px, 2.2vw, 28px);
  font-weight: 800;
`;

export const PageDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};

  font-size: 13px;
  font-weight: 500;
  line-height: 1.5;
`;

export const RightArea = styled.div`
  min-width: 0;

  display: flex;
  align-items: center;
  gap: 14px;

  @media (max-width: 1350px) {
    width: 100%;
  }

  @media (max-width: 800px) {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

export const DateTimeBox = styled.div`
  width: 170px;
  padding-right: 28px;

  flex-shrink: 0;

  border-right: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: 800px) {
    width: 100%;
    padding: 14px;

    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 10px;
  }
`;

export const DateText = styled.p`
  color: ${({ theme }) => theme.colors.DeepBlue};

  font-size: 13px;
  font-weight: 600;
`;

export const TimeText = styled.p`
  width: 100%;
  margin-top: 4px;

  color: ${({ theme }) => theme.colors.DeepBlue};

  font-size: clamp(26px, 3vw, 32px);
  font-weight: 800;
  text-align: left;

  font-variant-numeric: tabular-nums;
  font-feature-settings: "tnum";
`;

export const TestAlertButton = styled.button`
  width: 100px;
  height: 38px;

  border: none;
  border-radius: 8px;

  background-color: ${({ theme }) => theme.colors.danger};
  color: white;

  font-size: 12px;
  font-weight: 800;

  cursor: pointer;
`;

export const SystemStatusBox = styled.div`
  width: 195px;
  min-height: 88px;
  padding: 14px 16px;

  display: flex;
  flex-direction: column;
  gap: 5px;

  flex-shrink: 0;

  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.white};

  @media (max-width: 800px) {
    width: 100%;
  }
`;

export const StatusTitle = styled.p`
  color: ${({ theme }) => theme.colors.textPrimary};

  font-size: 13px;
  font-weight: 700;
`;

export const StatusRow = styled.div`
  display: grid;
  grid-template-columns: minmax(70px, 78px) 8px minmax(0, 1fr);
  align-items: center;
  gap: 6px;

  color: ${({ theme }) => theme.colors.textPrimary};

  font-size: 10px;
  font-weight: 600;

  white-space: nowrap;
`;

export const StatusDot = styled.div`
  width: 7px;
  height: 7px;

  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.DeepBlue};
`;

export const ProfileBox = styled.div`
  width: 180px;
  min-height: 88px;
  padding: 12px 14px;

  display: flex;
  align-items: center;
  gap: 12px;

  flex-shrink: 0;

  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.white};

  @media (max-width: 800px) {
    width: 100%;
  }
`;

export const ProfileImage = styled.img`
  width: 54px;
  height: 54px;

  flex-shrink: 0;

  border-radius: 50%;
  object-fit: cover;
`;

export const ProfileInfo = styled.div`
  min-width: 0;

  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ProfileName = styled.p`
  color: ${({ theme }) => theme.colors.textPrimary};

  font-size: 12px;
  font-weight: 700;
`;

export const ProfileRole = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};

  font-size: 11px;
  font-weight: 500;
`;

export const LogoutButton = styled.button`
  width: 76px;
  height: 28px;

  border: none;
  border-radius: 4px;

  background-color: ${({ theme }) => theme.colors.DeepBlue};
  color: #ffffff;

  font-size: 11px;
  font-weight: 700;

  cursor: pointer;
`;