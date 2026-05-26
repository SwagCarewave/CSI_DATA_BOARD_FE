// src/styles/monitoring/MonitoringPage.ts
import styled from "styled-components";

export const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;

  background-color: ${({ theme }) => theme.colors.background};
`;

export const MainArea = styled.main`
  width: calc(100% - 220px);
  min-height: 100vh;
  margin-left: 220px;
`;

export const Content = styled.div`
  padding: 24px 32px;

  display: flex;
  flex-direction: column;

  gap: 10px;
`;
export const MiddleSection = styled.section`
  display: grid;
  grid-template-columns: 620px 520px;
  gap: 16px;

  align-items: stretch;
`;
