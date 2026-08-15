import TopStatusCards from "../components/Monitoring/TopStatusCards";
import SkeletonCard from "../components/Monitoring/SkeletonCard";
import CsiGraphCard from "../components/Monitoring/CsiGraphCard";
import BottomStatusCard from "../components/Monitoring/BottomStatusCard";

import * as S from "../styles/Monitoring/MonitoringPage";

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
