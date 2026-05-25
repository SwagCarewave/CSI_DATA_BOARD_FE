// src/styles/monitoring/MonitoringPage.ts

import styled from "styled-components";

export const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;

  display: flex;

  background-color: ${({ theme }) => theme.colors.background};
`;

export const MainArea = styled.main`
  flex: 1;
  min-width: 0;

  display: flex;
  flex-direction: column;
`;

export const Content = styled.div`
  flex: 1;
  padding: 24px;

  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const MiddleSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 1.7fr;
  gap: 16px;
`;
