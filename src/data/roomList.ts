export type DeviceStatus = "정상" | "연결 불가";

export interface Room {
  id: number;
  roomNumber: string;
  deviceCount: number;
  status: DeviceStatus;
}

export const initialRoomNumbers: string[] = [
  "101호",
  "102호",
  "103호",
  "104호",
  "105호",
];

export const initialCaregivers: string[] = [
  "김케어 요양보호사",
  "박사랑 요양보호사",
  "이행복 요양보호사",
];

export const initialRoomList: Room[] = [
  { id: 1, roomNumber: "101호", deviceCount: 4, status: "정상" },
];
