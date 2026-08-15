// src/components/monitoring/TopStatusCards.tsx

import { useEffect, useRef, useState } from "react";

import * as S from "../../styles/Monitoring/TopStatusCards";

import normalIcon from "../../assets/monitoring/nomal.svg";
import peopleIcon from "../../assets/monitoring/people.svg";
import graphIcon from "../../assets/monitoring/graph.svg";
import wifiIcon from "../../assets/monitoring/wifi.svg";

interface PresenceData {
  status: "재실" | "공실" | string;
  confidence: number;
  rx: "RX1" | "RX2" | "RX3" | string;
  detected_at: string;
}

export default function TopStatusCards() {
  const [selectedRoom, setSelectedRoom] = useState("101");
  const [presence, setPresence] = useState<PresenceData | null>(null);
  const [isSocketConnected, setIsSocketConnected] = useState(false);

  const hasLoggedMessage = useRef(false);

  useEffect(() => {
    console.log("🔥 TopStatusCards useEffect 실행됨");
    let socket: WebSocket | null = null;
    let reconnectTimer: number | null = null;
    let isUnmounted = false;

    const connectWebSocket = () => {
      if (isUnmounted) return;

      const socketUrl =
        window.location.protocol === "https:"
          ? "wss://43.201.215.82:8000/ws/presence"
          : "ws://43.201.215.82:8000/ws/presence";

      socket = new WebSocket(socketUrl);

      socket.onopen = () => {
        setIsSocketConnected(true);
        console.log("✅ 재실/공실 WebSocket 연결 성공");
      };

      socket.onmessage = (event) => {
        try {
          const data: PresenceData = JSON.parse(event.data);

          if (!hasLoggedMessage.current) {
            console.log("✅ 재실/공실 데이터 수신 성공:", data);
            hasLoggedMessage.current = true;
          }

          setPresence(data);
        } catch (error) {
          console.error("❌ 재실/공실 데이터 파싱 오류:", error);
        }
      };

      socket.onerror = (error) => {
        console.error("❌ 재실/공실 WebSocket 오류:", error);
      };

      socket.onclose = (event) => {
        setIsSocketConnected(false);
        console.log(
          `🔌 재실/공실 WebSocket 연결 종료 code=${event.code}, reason=${event.reason}`
        );

        if (!isUnmounted) {
          reconnectTimer = window.setTimeout(() => {
            console.log("🔄 재실/공실 WebSocket 재연결 시도...");
            connectWebSocket();
          }, 3000);
        }
      };
    };

    connectWebSocket();

    return () => {
      isUnmounted = true;

      if (reconnectTimer) {
        clearTimeout(reconnectTimer);
      }

      if (socket) {
        socket.close();
      }
    };
  }, []);

  const formatDetectedTime = (dateString?: string) => {
    if (!dateString) return "-";

    const date = new Date(dateString);

    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hour = String(date.getHours()).padStart(2, "0");
    const minute = String(date.getMinutes()).padStart(2, "0");
    const second = String(date.getSeconds()).padStart(2, "0");

    return `${month}.${day} ${hour}:${minute}:${second}`;
  };

  const presenceStatus = presence?.status ?? "수신 대기";

  const confidenceText =
    presence?.confidence !== undefined
      ? `신뢰도 ${Math.round(presence.confidence * 100)}%`
      : "신뢰도 -";

  return (
    <S.Container>
      <S.RoomSelectWrapper>
        <S.SelectLabel>방 선택</S.SelectLabel>

        <S.SelectBox
          value={selectedRoom}
          onChange={(e) => setSelectedRoom(e.target.value)}
        >
          <option value="101">101호</option>
          <option value="102">102호</option>
          <option value="103">103호</option>
          <option value="104">104호</option>
        </S.SelectBox>
      </S.RoomSelectWrapper>

      <S.CardGrid>
        <S.Card>
          <S.IconCircle>
            <img src={normalIcon} alt="정상 아이콘" />
          </S.IconCircle>

          <div>
            <S.GreenTitle>정상</S.GreenTitle>
            <S.Description>이상 징후가 감지되지 않았습니다.</S.Description>
            <S.SmallStatus>● 정상</S.SmallStatus>
          </div>
        </S.Card>

        <S.Card>
          <S.IconCircle>
            <img src={peopleIcon} alt="재실 아이콘" />
          </S.IconCircle>

          <div>
            <S.Title>{presenceStatus}</S.Title>

            <S.Description>
              {presence?.rx
                ? `${presence.rx} · ${confidenceText}`
                : "감지 대기 중"}
            </S.Description>

            <S.TimeText>{formatDetectedTime(presence?.detected_at)}</S.TimeText>
          </div>
        </S.Card>

        <S.Card>
          <S.IconCircle $active>
            <img src={graphIcon} alt="그래프 아이콘" />
          </S.IconCircle>

          <div>
            <S.Title>윈도우 단위</S.Title>
            <S.Description>25프레임마다 예측</S.Description>
            <S.Tag>약 1~3초 간격 업데이트</S.Tag>
          </div>
        </S.Card>

        <S.Card>
          <S.IconCircle>
            <img src={wifiIcon} alt="와이파이 아이콘" />
          </S.IconCircle>

          <div>
            <S.Title>{isSocketConnected ? "연결 양호" : "연결 대기"}</S.Title>

            <S.Description>
              {isSocketConnected
                ? "WebSocket 연결이 안정적입니다."
                : "WebSocket 연결을 기다리는 중입니다."}
            </S.Description>
          </div>
        </S.Card>
      </S.CardGrid>
    </S.Container>
  );
}
