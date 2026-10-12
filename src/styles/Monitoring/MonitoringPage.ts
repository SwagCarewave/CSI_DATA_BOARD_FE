// src/styles/monitoring/MonitoringPage.ts

import styled from "styled-components";

export const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;

  background-color: ${({ theme }) => theme.colors.background};
`;

export const MainArea = styled.main`
  width: calc(100% - 220px);
  min-width: 0;
  min-height: 100vh;
  margin-left: 220px;

  @media (max-width: 900px) {
    width: 100%;
    margin-left: 0;
  }
`;

export const Content = styled.div`
  width: 100%;
  min-width: 0;
  padding: 24px 32px;

  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: 1200px) {
    padding: 24px;
  }

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

export const MiddleSection = styled.section`
  width: 100%;
  min-width: 0;

  display: grid;
  grid-template-columns:
    minmax(0, 1.2fr)
    minmax(0, 1fr);
  gap: 16px;

  align-items: stretch;

  > * {
    min-width: 0;
  }

  @media (max-width: 1250px) {
    grid-template-columns: 1fr;
  }
`;