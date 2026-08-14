import type { Room } from "../../data/roomList";
import { DeviceIcon } from "./icons";

import * as S from "../../styles/Settings/RoomListCard";

interface RoomListCardProps {
  rooms: Room[];
  onAddClick: () => void;
}

export default function RoomListCard({ rooms, onAddClick }: RoomListCardProps) {
  return (
    <S.Card>
      <S.HeaderRow>
        <S.CardTitle>방 목록 (ESP32 장치)</S.CardTitle>
        <S.AddButton type="button" onClick={onAddClick}>
          + 방 추가
        </S.AddButton>
      </S.HeaderRow>

      <S.RoomGrid>
        {rooms.map((room) => (
          <S.RoomCard key={room.id}>
            <S.RoomNumber>{room.roomNumber}</S.RoomNumber>
            <S.DeviceIconWrapper>
              <DeviceIcon />
            </S.DeviceIconWrapper>
            <S.DeviceLabel>ESP32 장치</S.DeviceLabel>
            <S.DeviceCount>{room.deviceCount}대</S.DeviceCount>
            <S.StatusText $normal={room.status === "정상"}>
              {room.status}
            </S.StatusText>
          </S.RoomCard>
        ))}
      </S.RoomGrid>

      <S.InfoNotice>
        <S.InfoIcon>i</S.InfoIcon>
        방을 추가하면 ESP32 장치를 해당 방에 등록할 수 있습니다.
      </S.InfoNotice>
    </S.Card>
  );
}
