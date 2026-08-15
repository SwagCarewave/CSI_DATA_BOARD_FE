import breathIcon from "../../assets/Alert/breath.svg";
import fallIcon from "../../assets/Alert/Fall.svg";
import alertWhiteIcon from "../../assets/Alert/alertwhite.svg";

import * as S from "../../styles/CareReport/EventReportManagement";

const EVENTS = [
  {
    id: 1,
    label: "이상 호흡",
    value: "발생 없음",
    type: "normal",
    icon: breathIcon,
  },
  {
    id: 2,
    label: "낙상 감지",
    value: "발생 없음",
    type: "danger",
    icon: fallIcon,
  },
  {
    id: 3,
    label: "이상탐지 사전경고",
    value: "1회 감지 (02:45)",
    type: "alert",
    icon: alertWhiteIcon,
  },
];

export default function EventReportManagement() {
  return (
    <S.Container>
      <S.EventCard>
        <S.Title>이벤트 요약</S.Title>

        <S.EventList>
          {EVENTS.map((event) => (
            <S.EventRow key={event.id}>
              <S.EventInfo>
                <S.EventIconCircle $type={event.type}>
                  <S.EventIcon src={event.icon} alt={`${event.label} 아이콘`} />
                </S.EventIconCircle>

                <S.EventLabel>{event.label}</S.EventLabel>
              </S.EventInfo>

              <S.EventValue>{event.value}</S.EventValue>
            </S.EventRow>
          ))}
        </S.EventList>
      </S.EventCard>

      <S.ReportCard>
        <S.Title>리포트 생성 및 관리</S.Title>

        <S.Table>
          <S.TableRow>
            <S.TableLabel>자동 생성</S.TableLabel>
            <S.TableValue>매일 06:00 자동 생성 (전날 데이터 기준)</S.TableValue>
          </S.TableRow>

          <S.TableRow>
            <S.TableLabel>생성 상태</S.TableLabel>

            <S.TableValue>
              <S.SuccessBadge>성공</S.SuccessBadge>
            </S.TableValue>
          </S.TableRow>

          <S.TableRow>
            <S.TableLabel>생성 일시</S.TableLabel>
            <S.TableValue>2025.05.21 06:00</S.TableValue>
          </S.TableRow>

          <S.TableRow>
            <S.TableLabel>다음 생성 예정</S.TableLabel>
            <S.TableValue>2025.05.22 06:00</S.TableValue>
          </S.TableRow>

          <S.TableRow>
            <S.TableLabel>생성 모델</S.TableLabel>
            <S.TableValue>LLM (Spring AI + GPT-4o)</S.TableValue>
          </S.TableRow>
        </S.Table>
      </S.ReportCard>
    </S.Container>
  );
}
