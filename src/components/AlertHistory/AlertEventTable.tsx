import type { AlertEvent } from "../../data/alertEvents";

import * as S from "../../styles/AlertHistory/AlertEventTable";

interface AlertEventTableProps {
  events: AlertEvent[];
  selectedEventId?: number;
  onSelectEvent: (event: AlertEvent) => void;
}

export default function AlertEventTable({
  events,
  selectedEventId,
  onSelectEvent,
}: AlertEventTableProps) {
  return (
    <S.Card>
      <S.TotalText>총 {events.length}건</S.TotalText>

      <S.TableWrapper>
        <S.Table>
          <thead>
            <tr>
              <th>이벤트</th>
              <th>방 번호</th>
              <th>발생 시각 ↓</th>
              <th>확인 상태</th>
              <th aria-label="상세 보기" />
            </tr>
          </thead>

          <tbody>
            {events.map((event) => (
              <S.TableRow
                key={event.id}
                $selected={event.id === selectedEventId}
                onClick={() => onSelectEvent(event)}
              >
                <td>
                  <S.EventInfo>
                    <S.EventIcon $color={event.color}>
                      <img src={event.icon} alt="" />
                    </S.EventIcon>

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
                  <S.ArrowButton
                    type="button"
                    aria-label={`${event.type} 상세 보기`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectEvent(event);
                    }}
                  >
                    ›
                  </S.ArrowButton>
                </td>
              </S.TableRow>
            ))}
          </tbody>
        </S.Table>
      </S.TableWrapper>

      <S.MobileList>
        {events.map((event) => (
          <S.MobileEventCard
            key={event.id}
            type="button"
            $selected={event.id === selectedEventId}
            onClick={() => onSelectEvent(event)}
          >
            <S.MobileTopRow>
              <S.EventInfo>
                <S.EventIcon $color={event.color}>
                  <img src={event.icon} alt="" />
                </S.EventIcon>

                <div>
                  <strong>{event.type}</strong>
                  <p>{event.description}</p>
                </div>
              </S.EventInfo>

              <S.ArrowText>›</S.ArrowText>
            </S.MobileTopRow>

            <S.MobileInfoGrid>
              <div>
                <span>방 번호</span>
                <strong>{event.room}</strong>
              </div>

              <div>
                <span>확인 상태</span>
                <S.StatusBadge $active={event.status === "미확인"}>
                  {event.status}
                </S.StatusBadge>
              </div>

              <div>
                <span>발생 시각</span>
                <strong>{event.time}</strong>
              </div>
            </S.MobileInfoGrid>
          </S.MobileEventCard>
        ))}
      </S.MobileList>

      <S.Pagination>
        <button type="button" aria-label="이전 페이지">
          ‹
        </button>
        <button type="button" className="active">
          1
        </button>
        <button type="button">2</button>
        <button type="button">3</button>
        <button type="button" aria-label="다음 페이지">
          ›
        </button>
      </S.Pagination>
    </S.Card>
  );
}
