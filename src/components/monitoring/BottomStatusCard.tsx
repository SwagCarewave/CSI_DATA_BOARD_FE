// src/components/monitoring/BottomStatusCard.tsx

import * as S from "../../styles/monitoring/BottomStatusCard";

export default function BottomStatusCard() {
  return (
    <S.Container>
      <S.EventCard>
        <S.Title>최근 이벤트</S.Title>

        <S.EventBox>
          <S.EventLeft>
            <S.EventTime>◉ 14:28:15</S.EventTime>

            <S.StatusBadge>정상</S.StatusBadge>

            <S.EventText>특이사항 없음</S.EventText>
          </S.EventLeft>
        </S.EventBox>
      </S.EventCard>

      <S.AlertCard>
        <S.AlertIcon>🔔</S.AlertIcon>

        <S.AlertTitle>현재 알림이 없습니다.</S.AlertTitle>

        <S.AlertDescription>
          이상 징후 발생 시 즉시 알림이 표시됩니다.
        </S.AlertDescription>
      </S.AlertCard>
    </S.Container>
  );
}