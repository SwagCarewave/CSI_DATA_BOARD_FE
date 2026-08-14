export interface Elderly {
  id: number;
  name: string;
  age: number;
  roomNumber: string;
  caregiver: string;
}

export const initialElderlyList: Elderly[] = [
  { id: 1, name: "김영희", age: 82, roomNumber: "101호", caregiver: "김케어 요양보호사" },
  { id: 2, name: "이순자", age: 79, roomNumber: "102호", caregiver: "박사랑 요양보호사" },
  { id: 3, name: "박민수", age: 85, roomNumber: "103호", caregiver: "이행복 요양보호사" },
  { id: 4, name: "최정희", age: 77, roomNumber: "104호", caregiver: "김케어 요양보호사" },
  { id: 5, name: "정태수", age: 81, roomNumber: "105호", caregiver: "박사랑 요양보호사" },
  { id: 6, name: "한말순", age: 84, roomNumber: "102호", caregiver: "이행복 요양보호사" },
];
