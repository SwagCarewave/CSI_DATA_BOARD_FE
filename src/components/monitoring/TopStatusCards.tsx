import { useState } from "react";

import * as S from "../../styles/monitoring/TopStatusCards";

import normalIcon from "../../assets/monitoring/nomal.svg";
import peopleIcon from "../../assets/monitoring/people.svg";
import graphIcon from "../../assets/monitoring/graph.svg";
import wifiIcon from "../../assets/monitoring/wifi.svg";

export default function TopStatusCards() {
  const [selectedRoom, setSelectedRoom] = useState("101");

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
            <S.Title>재실</S.Title>

            <S.Description>감지 시작 시각</S.Description>

            <S.TimeText>05.21 14:28:15</S.TimeText>
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
            <S.Title>연결 양호</S.Title>

            <S.Description>센서 연결이 안정적입니다.</S.Description>
          </div>
        </S.Card>
      </S.CardGrid>
    </S.Container>
  );
}