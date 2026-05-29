import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import FallAlertModal from "../components/FallAlertModal";

import * as S from "../styles/monitoring/MonitoringPage";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [isFallAlertOpen, setIsFallAlertOpen] = useState(false);

  return (
    <S.PageWrapper>
      <Sidebar />

      <S.MainArea>
        <Header onFallAlertTest={() => setIsFallAlertOpen(true)} />

        <S.Content>{children}</S.Content>
      </S.MainArea>

      <FallAlertModal
        isOpen={isFallAlertOpen}
        onClose={() => setIsFallAlertOpen(false)}
      />
    </S.PageWrapper>
  );
}
