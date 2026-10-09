// src/utils/chartScale.ts

const TIME_STEPS_MS = [
  1000, 2000, 5000, 10000, 15000, 30000, 60000, 120000, 300000, 600000, 900000, 1800000, 3600000, 7200000,
  10800000,
];

const pad = (value: number) => String(value).padStart(2, "0");

export interface TimeView {
  startMs: number;
  endMs: number;
}

// 화면 너비에 맞춰 가독성 있는 시간 눈금을 만든다 (현지 시각 기준으로 정각에 맞춤)
export function timeTicks(view: TimeView, maxTicks: number) {
  const span = view.endMs - view.startMs;
  const step = TIME_STEPS_MS.find((candidate) => span / candidate <= maxTicks) ?? TIME_STEPS_MS.at(-1)!;
  const offset = -new Date(view.startMs).getTimezoneOffset() * 60000;
  const ticks: number[] = [];
  for (let t = Math.ceil((view.startMs + offset) / step) * step - offset; t <= view.endMs; t += step) {
    ticks.push(t);
  }
  return { ticks, step };
}

// 눈금 간격이 1분 이상이면 HH:mm, 그보다 촘촘하면 HH:mm:ss
export function formatTick(ms: number, step: number) {
  const date = new Date(ms);
  const hm = `${pad(date.getHours())}:${pad(date.getMinutes())}`;
  return step >= 60000 ? hm : `${hm}:${pad(date.getSeconds())}`;
}

export const formatClock = (ms: number, withSeconds = true) => {
  const date = new Date(ms);
  const hm = `${pad(date.getHours())}:${pad(date.getMinutes())}`;
  return withSeconds ? `${hm}:${pad(date.getSeconds())}` : hm;
};

// 0부터 시작하는 보기 좋은 값 눈금 (최대 5칸)
export function valueTicks(maxValue: number) {
  const safeMax = maxValue > 0 ? maxValue : 1;
  const raw = safeMax / 4;
  const magnitude = 10 ** Math.floor(Math.log10(raw));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * magnitude).find((candidate) => candidate >= raw) ?? raw;
  const top = Math.ceil(safeMax / step) * step;
  const ticks: number[] = [];
  for (let v = 0; v <= top + step / 2; v += step) ticks.push(Number(v.toFixed(6)));
  const decimals = Math.max(0, -Math.floor(Math.log10(step)) + (step / magnitude === 2.5 ? 1 : 0));
  return { ticks, max: top, decimals };
}

// 시안의 히트맵 색 (파랑 → 하늘 → 노랑 → 빨강)
export function jetColor(ratio: number): [number, number, number] {
  const t = Math.min(1, Math.max(0, ratio));
  const channel = (offset: number) => Math.round(255 * Math.min(1, Math.max(0, 1.5 - Math.abs(4 * t - offset))));
  return [channel(3), channel(2), channel(1)];
}

export const jetGradientStops = Array.from({ length: 9 }, (_, i) => {
  const [r, g, b] = jetColor(i / 8);
  return { offset: `${(i / 8) * 100}%`, color: `rgb(${r}, ${g}, ${b})` };
});
