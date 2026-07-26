import type { AlertEvent } from "../../data/alertEvents";

import * as S from "../../styles/alertHistory/AlertDetailCard";

interface AlertDetailCardProps {
  event: AlertEvent;
  onClose: () => void;
}

export default function AlertDetailCard({
  event,
  onClose,
}: AlertDetailCardProps) {
  return (
    <S.Card>
      <S.DetailHeader>
        <h3>이벤트 상세</h3>

        <button type="button" onClick={onClose} aria-label="상세 정보 닫기">
          ×
        </button>
      </S.DetailHeader>

      <S.DetailTitle>
        <S.EventIcon $color={event.color}>
          <img src={event.icon} alt="" />
        </S.EventIcon>

        <strong>{event.type}</strong>

        <S.DetailStatus $checked={event.status === "확인 완료"}>
          {event.status}
        </S.DetailStatus>
      </S.DetailTitle>

      <S.InfoList>
        <div>
          <span>발생 시각</span>
          <strong>{event.time}</strong>
        </div>

        <div>
          <span>방 번호</span>
          <strong>{event.room}</strong>
        </div>

        <div>
          <span>감지 유형</span>
          <strong>{event.type}</strong>
        </div>

        <div>
          <span>확인 여부</span>
          <strong>{event.status}</strong>
        </div>
      </S.InfoList>

      <S.DetailSection>
        <h4>AI 판단 근거 요약</h4>
        <p>{event.aiSummary}</p>
      </S.DetailSection>

      <S.DetailSection>
        <h4>담당 요양보호사</h4>
        <p>{event.caregiver}</p>
      </S.DetailSection>

      <S.DetailButtons>
        <button type="button" onClick={onClose}>
          닫기
        </button>

        <button type="button" className="primary">
          확인 완료
        </button>
      </S.DetailButtons>
    </S.Card>
  );
}