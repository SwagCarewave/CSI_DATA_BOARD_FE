import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import FallAlertModal from "../components/FallAlertModal";

import * as S from "../styles/monitoring/MonitoringPage";

interface MainLayoutProps {
  children: React.ReactNode;
}

interface FallAlertData {
  event_type: string;
  occurred_at: string;
  status: string;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [isFallAlertOpen, setIsFallAlertOpen] = useState(false);

  useEffect(() => {
    const socket = new WebSocket("ws://43.201.215.82:8000/ws/fall");

    socket.onopen = () => {
      console.log("낙상 감지 WebSocket 연결 성공");
    };

    socket.onmessage = (event) => {
      try {
        const data: FallAlertData = JSON.parse(event.data);

        console.log("낙상 감지 수신:", data);

        if (data.event_type === "낙상 감지") {
          setIsFallAlertOpen(true);
        }
      } catch (error) {
        console.error("낙상 감지 WebSocket 데이터 파싱 오류:", error);
      }
    };

    socket.onerror = (error) => {
      console.error("낙상 감지 WebSocket 오류:", error);
    };

    socket.onclose = () => {
      console.log("낙상 감지 WebSocket 연결 종료");
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <S.PageWrapper>
      <Sidebar />

      <S.MainArea>
        <Header onFallAlertTest={() => setIsFallAlertOpen(true)} />

        <S.Content>{children}</S.Content>
      </S.MainArea>

      <FallAlertModal
        isOpen={isFallAlertOpen}
        onClose={() => setIsFallAlertOpen(false)}
      />
    </S.PageWrapper>
  );
}
