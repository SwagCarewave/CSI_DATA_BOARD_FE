import { useEffect, useState } from "react";

import * as S from "../../styles/monitoring/TopStatusCards";

import normalIcon from "../../assets/monitoring/nomal.svg";
import peopleIcon from "../../assets/monitoring/people.svg";
import graphIcon from "../../assets/monitoring/graph.svg";
import wifiIcon from "../../assets/monitoring/wifi.svg";

interface PresenceData {
  status: "재실" | "공실" | string;
  detected_at: string;
}

export default function TopStatusCards() {
  const [selectedRoom, setSelectedRoom] = useState("101");
  const [presence, setPresence] = useState<PresenceData | null>(null);
  const [isSocketConnected, setIsSocketConnected] = useState(false);

  useEffect(() => {
    const socket = new WebSocket("ws://43.201.215.82:8000/ws/presence");

    socket.onopen = () => {
      setIsSocketConnected(true);
      console.log("재실/공실 WebSocket 연결 성공");
    };

    socket.onmessage = (event) => {
      try {
        const data: PresenceData = JSON.parse(event.data);
        setPresence(data);
      } catch (error) {
        console.error("WebSocket 데이터 파싱 오류:", error);
      }
    };

    socket.onerror = (error) => {
      setIsSocketConnected(false);
      console.error("재실/공실 WebSocket 오류:", error);
    };

    socket.onclose = () => {
      setIsSocketConnected(false);
      console.log("재실/공실 WebSocket 연결 종료");
    };

    return () => {
      socket.close();
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
            <S.Description>감지 시각</S.Description>
            <S.TimeText>{formatDetectedTime(presence?.detected_at)}</S.TimeText>
          </div>
        </S.Card>

        <S.Card>
          <S.IconCircle $active>
            <img src={graphIcon} alt="그래프 아이콘" />
          </S.IconCircle>

          <div>
            <S.Title>21 pkt/s</S.Title>
            <S.Description>마지막 수신 14:32:18</S.Description>
            <S.Tag>정상 (15~25 pkt/s)</S.Tag>
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
                ? "센서 연결이 안정적입니다."
                : "WebSocket 연결을 기다리는 중입니다."}
            </S.Description>
          </div>
        </S.Card>
      </S.CardGrid>
    </S.Container>
  );
}
