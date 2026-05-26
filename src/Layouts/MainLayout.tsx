// src/layouts/MainLayout.tsx

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import * as S from "../styles/monitoring/MonitoringPage";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <S.PageWrapper>
      <Sidebar />

      <S.MainArea>
        <Header />
        <S.Content>{children}</S.Content>
      </S.MainArea>
    </S.PageWrapper>
  );
}