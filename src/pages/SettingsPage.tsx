import { useState } from "react";

import SettingsTabs, { type SettingsTab } from "../components/Settings/SettingsTabs";
import ElderlyListCard from "../components/Settings/ElderlyListCard";
import ElderlyAddModal from "../components/Settings/ElderlyAddModal";
import RoomListCard from "../components/Settings/RoomListCard";
import RoomAddModal from "../components/Settings/RoomAddModal";
import AlertSettingCard from "../components/Settings/AlertSettingCard";

import { initialElderlyList, type Elderly } from "../data/elderlyList";
import {
  initialRoomList,
  initialRoomNumbers,
  initialCaregivers,
  type Room,
} from "../data/roomList";

import * as S from "../styles/Settings/SettingsPage";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("elderly");

  const [elderlyList, setElderlyList] = useState<Elderly[]>(initialElderlyList);
  const [rooms, setRooms] = useState<Room[]>(initialRoomList);
  const [roomNumbers, setRoomNumbers] = useState<string[]>(initialRoomNumbers);
  const [caregivers, setCaregivers] = useState<string[]>(initialCaregivers);

  const [isElderlyModalOpen, setIsElderlyModalOpen] = useState(false);
  const [editingElderly, setEditingElderly] = useState<Elderly | null>(null);
  const [isRoomModalOpen, setIsRoomModalOpen] = useState(false);

  const nextElderlyId =
    elderlyList.length > 0
      ? Math.max(...elderlyList.map((e) => e.id)) + 1
      : 1;
  const nextRoomId =
    rooms.length > 0 ? Math.max(...rooms.map((r) => r.id)) + 1 : 1;

  const handleAddRoomNumber = (value: string) => {
    setRoomNumbers((prev) => (prev.includes(value) ? prev : [...prev, value]));
  };

  const handleAddCaregiver = (value: string) => {
    setCaregivers((prev) => (prev.includes(value) ? prev : [...prev, value]));
  };

  const handleOpenAddElderly = () => {
    setEditingElderly(null);
    setIsElderlyModalOpen(true);
  };

  const handleOpenEditElderly = (elderly: Elderly) => {
    setEditingElderly(elderly);
    setIsElderlyModalOpen(true);
  };

  const handleSaveElderly = (data: Omit<Elderly, "id">) => {
    if (editingElderly) {
      setElderlyList((prev) =>
        prev.map((e) => (e.id === editingElderly.id ? { ...e, ...data } : e))
      );
    } else {
      setElderlyList((prev) => [...prev, { id: nextElderlyId, ...data }]);
    }

    setIsElderlyModalOpen(false);
    setEditingElderly(null);
  };

  const handleDeleteElderly = (id: number) => {
    setElderlyList((prev) => prev.filter((e) => e.id !== id));
  };

  const handleSaveRoom = (data: Omit<Room, "id" | "status">) => {
    setRooms((prev) => [
      ...prev,
      { id: nextRoomId, ...data, status: "연결 불가" },
    ]);
    handleAddRoomNumber(data.roomNumber);
    setIsRoomModalOpen(false);
  };

  return (
    <S.Container>
      <SettingsTabs activeTab={activeTab} onChangeTab={setActiveTab} />

      <S.TabContent>
        {activeTab === "elderly" && (
          <ElderlyListCard
            elderlyList={elderlyList}
            onAddClick={handleOpenAddElderly}
            onEditClick={handleOpenEditElderly}
            onDelete={handleDeleteElderly}
          />
        )}

        {activeTab === "room" && (
          <RoomListCard rooms={rooms} onAddClick={() => setIsRoomModalOpen(true)} />
        )}

        {activeTab === "alert" && <AlertSettingCard />}
      </S.TabContent>

      {isElderlyModalOpen && (
        <ElderlyAddModal
          editingElderly={editingElderly}
          roomNumbers={roomNumbers}
          caregivers={caregivers}
          onAddRoomNumber={handleAddRoomNumber}
          onAddCaregiver={handleAddCaregiver}
          onCancel={() => {
            setIsElderlyModalOpen(false);
            setEditingElderly(null);
          }}
          onSave={handleSaveElderly}
        />
      )}

      {isRoomModalOpen && (
        <RoomAddModal
          roomNumbers={roomNumbers}
          onAddRoomNumber={handleAddRoomNumber}
          onCancel={() => setIsRoomModalOpen(false)}
          onSave={handleSaveRoom}
        />
      )}
    </S.Container>
  );
}
