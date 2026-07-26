import fallIcon from "../assets/Alert/Fall.svg";
import breathIcon from "../assets/Alert/breath.svg";
import warningIcon from "../assets/Alert/alertwhite.svg";

export type EventColor = "danger" | "warning" | "purple";

export interface AlertEvent {
  id: number;
  type: string;
  description: string;
  room: string;
  time: string;
  status: "미확인" | "확인 완료";
  color: EventColor;
  icon: string;
  aiSummary: string;
  caregiver: string;
}

export const alertEvents: AlertEvent[] = [
  {
    id: 1,
    type: "낙상 감지",
    description: "낙상 위험으로 판단되어 알림 발생",
    room: "101호",
    time: "2025.05.21 14:28:15",
    status: "미확인",
    color: "danger",
    icon: fallIcon,
    aiSummary:
      "스펙트럼의 급격한 수직 하강과 움직임 정지 패턴이 감지되었으며, 약 2.1초 동안 움직임이 없었습니다.",
    caregiver: "김케어 요양보호사",
  },
  {
    id: 2,
    type: "이상 호흡",
    description: "호흡수 이상을 감지했습니다.",
    room: "102호",
    time: "2025.05.21 13:47:09",
    status: "미확인",
    color: "warning",
    icon: breathIcon,
    aiSummary:
      "최근 측정 구간에서 평소보다 불규칙한 호흡 패턴이 감지되었습니다.",
    caregiver: "박돌봄 요양보호사",
  },
  {
    id: 3,
    type: "이상탐지 사전경고",
    description: "평소와 다른 패턴이 감지되었습니다.",
    room: "104호",
    time: "2025.05.20 23:05:41",
    status: "확인 완료",
    color: "purple",
    icon: warningIcon,
    aiSummary:
      "평소 활동 패턴과 비교해 움직임 빈도와 진폭에서 차이가 감지되었습니다.",
    caregiver: "이안심 요양보호사",
  },
  {
    id: 4,
    type: "낙상 감지",
    description: "낙상 위험으로 판단되어 알림 발생",
    room: "101호",
    time: "2025.05.20 21:18:02",
    status: "미확인",
    color: "danger",
    icon: fallIcon,
    aiSummary:
      "짧은 시간 동안 큰 진폭 변화가 발생한 후 움직임이 급격히 감소했습니다.",
    caregiver: "김케어 요양보호사",
  },
];
