import { useState } from "react";

import AlertSummaryCard from "../components/AlertHistory/AlertSummaryCard";
import AlertFilterCard from "../components/AlertHistory/AlertFilterCard";
import AlertEventTable from "../components/AlertHistory/AlertEventTable";
import AlertDetailCard from "../components/AlertHistory/AlertDetailCard";

import { alertEvents, type AlertEvent } from "../data/alertEvents";

import * as S from "../styles/AlertHistory/AlertHistoryPage";

export default function AlertHistoryPage() {
  const [selectedEvent, setSelectedEvent] = useState<AlertEvent | null>(
    alertEvents[0]
  );

  const uncheckedCount = alertEvents.filter(
    (event) => event.status === "미확인"
  ).length;

  return (
    <S.Container>
      <S.TopSection>
        <AlertSummaryCard uncheckedCount={uncheckedCount} />
        <AlertFilterCard />
      </S.TopSection>

      <S.MainSection $hasDetail={selectedEvent !== null}>
        <AlertEventTable
          events={alertEvents}
          selectedEventId={selectedEvent?.id}
          onSelectEvent={setSelectedEvent}
        />

        {selectedEvent && (
          <AlertDetailCard
            event={selectedEvent}
            onClose={() => setSelectedEvent(null)}
          />
        )}
      </S.MainSection>
    </S.Container>
  );
}
