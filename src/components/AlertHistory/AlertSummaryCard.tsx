import realAlertIcon from "../../assets/Alert/RedAlert.svg";

import * as S from "../../styles/AlertHistory/AlertSummaryCard";

interface AlertSummaryCardProps {
  uncheckedCount: number;
}

export default function AlertSummaryCard({
  uncheckedCount,
}: AlertSummaryCardProps) {
  return (
    <S.Card>
      <S.IconCircle>
        <img src={realAlertIcon} alt="미확인 알림" />
      </S.IconCircle>

      <S.SummaryText>
        <span>미확인 이벤트</span>
        <strong>{uncheckedCount}</strong>
        <p>확인 필요</p>
      </S.SummaryText>
    </S.Card>
  );
}
