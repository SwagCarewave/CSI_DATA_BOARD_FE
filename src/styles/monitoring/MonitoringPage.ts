// src/styles/monitoring/MonitoringPage.ts
import styled from "styled-components";

export const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;

  display: flex;

  overflow-x: auto;

  background-color: ${({ theme }) => theme.colors.background};
`;

export const MainArea = styled.main`
  flex: 1;
  min-width: 1180px;

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
  grid-template-columns: 620px 520px;
  gap: 16px;

  align-items: stretch;
`;
