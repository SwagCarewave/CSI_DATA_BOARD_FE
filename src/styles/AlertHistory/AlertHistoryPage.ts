import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  min-width: 0;

  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const TopSection = styled.section`
  width: 100%;
  min-width: 0;

  display: grid;
  grid-template-columns: minmax(220px, 0.25fr) minmax(0, 1fr);
  gap: 16px;

  > * {
    min-width: 0;
  }

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`;

export const MainSection = styled.section<{ $hasDetail: boolean }>`
  width: 100%;
  min-width: 0;

  display: grid;
  grid-template-columns: ${({ $hasDetail }) =>
    $hasDetail ? "minmax(0, 1fr) minmax(280px, 310px)" : "minmax(0, 1fr)"};

  gap: 16px;
  align-items: stretch;

  > * {
    min-width: 0;
  }

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;