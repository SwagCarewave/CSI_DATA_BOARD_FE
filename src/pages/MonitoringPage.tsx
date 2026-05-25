import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

import TopStatusCards from "../components/monitoring/TopStatusCards";
import SkeletonCard from "../components/monitoring/SkeletonCard";
import CsiGraphCard from "../components/monitoring/CsiGraphCard";
import BottomStatusCard from "../components/monitoring/BottomStatusCard";

import * as S from "../styles/monitoring/MonitoringPage";

export default function MonitoringPage() {
  return (
    <S.PageWrapper>
      <Sidebar />

      <S.MainArea>
        <Header />

        <S.Content>
          <TopStatusCards />

          <S.MiddleSection>
            <SkeletonCard />
            <CsiGraphCard />
          </S.MiddleSection>

        <BottomStatusCard />
        </S.Content>
      </S.MainArea>
    </S.PageWrapper>
  );
}
