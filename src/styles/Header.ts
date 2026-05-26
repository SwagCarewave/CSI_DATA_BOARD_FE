// src/styles/Header.ts

import styled from "styled-components";

export const HeaderContainer = styled.header`
  width: 100%;
  min-width: 1180px;
  height: 110px;

  padding: 0 32px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;

  background-color: #ffffff;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const TitleArea = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  flex-shrink: 0;
`;

export const PageNumber = styled.h1`
  color: ${({ theme }) => theme.colors.DeepBlue};

  font-size: 64px;
  font-weight: 800;
  line-height: 1;
`;

export const TitleTextBox = styled.div`
  display: flex;
  flex-direction: column;

  gap: 8px;
`;

export const PageTitle = styled.h2`
  color: ${({ theme }) => theme.colors.DeepBlue};

  font-size: 28px;
  font-weight: 800;
`;

export const PageDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};

  font-size: 13px;
  font-weight: 500;
`;
export const RightArea = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;

  flex-shrink: 0;
`;

export const DateTimeBox = styled.div`
  width: 170px;
  padding-right: 28px;

  border-right: 1px solid ${({ theme }) => theme.colors.border};
`;

export const DateText = styled.p`
  color: ${({ theme }) => theme.colors.DeepBlue};

  font-size: 13px;
  font-weight: 600;
`;

export const TimeText = styled.p`
  margin-top: 4px;

  color: ${({ theme }) => theme.colors.DeepBlue};

  font-size: 32px;
  font-weight: 800;

  font-variant-numeric: tabular-nums;
  font-feature-settings: "tnum";

  width: 142px;
  text-align: left;
`;
export const SystemStatusBox = styled.div`
  width: 195px;
  height: 88px;

  padding: 14px 16px;

  display: flex;
  flex-direction: column;

  gap: 5px;

  flex-shrink: 0;

  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;

  background-color: ${({ theme }) => theme.colors.white};
`;
export const StatusTitle = styled.p`
  color: ${({ theme }) => theme.colors.textPrimary};

  font-size: 13px;
  font-weight: 700;
`;

export const StatusRow = styled.div`
  display: grid;
  grid-template-columns: 78px 8px auto;

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
  height: 88px;

  padding: 12px 14px;

  display: flex;
  align-items: center;

  gap: 12px;

  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;

  background-color: ${({ theme }) => theme.colors.white};
`;

export const ProfileImage = styled.img`
  width: 54px;
  height: 54px;

  border-radius: 50%;

  object-fit: cover;
`;
export const ProfileInfo = styled.div`
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
