import * as S from "../styles/AlertHistoryPage";

const events = [
  {
    type: "낙상 감지",
    description: "낙상 위험으로 판단되어 알림 발생",
    room: "101호",
    time: "2025.05.21 14:28:15",
    status: "미확인",
    color: "danger",
  },
  {
    type: "이상 호흡",
    description: "호흡수 이상을 감지했습니다.",
    room: "102호",
    time: "2025.05.21 13:47:09",
    status: "미확인",
    color: "warning",
  },
  
  {
    type: "이상탐지 사전경고",
    description: "평소와 다른 패턴이 감지되었습니다.",
    room: "104호",
    time: "2025.05.20 23:05:41",
    status: "확인 완료",
    color: "purple",
  },
  {
    type: "낙상 감지",
    description: "낙상 위험으로 판단되어 알림 발생",
    room: "101호",
    time: "2025.05.20 21:18:02",
    status: "미확인",
    color: "danger",
  },
];

export default function AlertHistoryPage() {
  return (
    <S.Container>
      <S.TopSection>
        <S.SummaryCard>
          <S.EmptyIconCircle />
          <S.SummaryText>
            <span>미확인 이벤트</span>
            <strong>3</strong>
            <p>확인 필요</p>
          </S.SummaryText>
        </S.SummaryCard>

        <S.FilterCard>
          <S.CardTitle>필터 검색</S.CardTitle>

          <S.FilterGrid>
            <S.FilterGroup>
              <S.Label>기간 선택</S.Label>
              <S.DateInput>2025.05.14</S.DateInput>
              <S.DateInput>2025.05.21</S.DateInput>
            </S.FilterGroup>

            <S.FilterGroup>
              <S.Label>이벤트 유형</S.Label>
              <S.CheckItem color="danger">낙상 감지</S.CheckItem>
              <S.CheckItem color="warning">이상 호흡</S.CheckItem>
              <S.CheckItem color="purple">이상탐지 사전경고</S.CheckItem>
            </S.FilterGroup>

            <S.FilterGroup>
              <S.Label>확인 상태</S.Label>
              <S.RadioItem>전체</S.RadioItem>
              <S.RadioItem>미확인</S.RadioItem>
              <S.RadioItem>확인 완료</S.RadioItem>
            </S.FilterGroup>

            <S.ExportButton>CSV 내보내기</S.ExportButton>
          </S.FilterGrid>
        </S.FilterCard>
      </S.TopSection>

      <S.MainGrid>
        <S.TableCard>
          <S.TotalText>총 18건</S.TotalText>

          <S.Table>
            <thead>
              <tr>
                <th>이벤트</th>
                <th>방 번호</th>
                <th>발생 시각 ↓</th>
                <th>확인 상태</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {events.map((event, index) => (
                <tr key={index}>
                  <td>
                    <S.EventInfo>
                      <S.EventIcon color={event.color} />
                      <div>
                        <strong>{event.type}</strong>
                        <p>{event.description}</p>
                      </div>
                    </S.EventInfo>
                  </td>
                  <td>{event.room}</td>
                  <td>{event.time}</td>
                  <td>
                    <S.StatusBadge $active={event.status === "미확인"}>
                      {event.status}
                    </S.StatusBadge>
                  </td>
                  <td>
                    <S.ArrowButton>›</S.ArrowButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </S.Table>

          <S.Pagination>
            <button>‹</button>
            <button className="active">1</button>
            <button>2</button>
            <button>3</button>
            <button>›</button>
          </S.Pagination>
        </S.TableCard>

        <S.DetailCard>
          <S.DetailHeader>
            <h3>이벤트 상세</h3>
            <button>×</button>
          </S.DetailHeader>

          <S.DetailTitle>
            <S.EventIcon color="danger" />
            <strong>낙상 감지</strong>
            <S.DetailStatus>미확인</S.DetailStatus>
          </S.DetailTitle>

          <S.InfoList>
            <div>
              <span>발생 시각</span>
              <strong>2025.05.21 14:28:15</strong>
            </div>
            <div>
              <span>방 번호</span>
              <strong>101호</strong>
            </div>
            <div>
              <span>감지 유형</span>
              <strong>낙상 감지</strong>
            </div>
            <div>
              <span>확인 여부</span>
              <strong>미확인</strong>
            </div>
          </S.InfoList>

          <S.DetailSection>
            <h4>AI 판단 근거 요약</h4>
            <p>
              스펙트럼의 급격한 수직 하강과 움직임 정지 패턴이 감지되었으며, 약
              2.1초 동안 움직임이 없었습니다.
            </p>
          </S.DetailSection>

          <S.DetailSection>
            <h4>담당 요양보호사</h4>
            <p>김케어 요양보호사</p>
          </S.DetailSection>

          <S.DetailButtons>
            <button>닫기</button>
            <button className="primary">확인 완료</button>
          </S.DetailButtons>
        </S.DetailCard>
      </S.MainGrid>
    </S.Container>
  );
}
