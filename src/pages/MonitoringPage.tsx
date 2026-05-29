import TopStatusCards from "../components/monitoring/TopStatusCards";
import SkeletonCard from "../components/monitoring/SkeletonCard";
import CsiGraphCard from "../components/monitoring/CsiGraphCard";
import BottomStatusCard from "../components/monitoring/BottomStatusCard";

import * as S from "../styles/monitoring/MonitoringPage";

export default function MonitoringPage() {
  return (
    <>
      <TopStatusCards />

      <S.MiddleSection>
        <SkeletonCard />
        <CsiGraphCard />
      </S.MiddleSection>

      <BottomStatusCard />
    </>
  );
}
