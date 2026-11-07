// src/components/ChristmasGame/sounds.ts

// 게임 효과음. 파일 없이 Web Audio로 합성한다 (방울·실로폰 느낌의 짧은 소리)
// - 브라우저는 사용자가 누르기 전에는 소리를 막으므로, 버튼을 누를 때 unlockSound()로 먼저 깨운다

let ctx: AudioContext | null = null;

const audio = () => {
  if (!ctx) {
    const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
  }
  if (ctx.state === "suspended") ctx.resume().catch(() => {});
  return ctx;
};

export const unlockSound = () => {
  audio();
};

// 음 하나: 빠르게 커졌다가 서서히 줄어드는 소리
function tone(freq: number, start: number, duration: number, { type = "sine" as OscillatorType, volume = 0.18, slideTo = 0 } = {}) {
  const ac = audio();
  if (!ac) return;
  const t = ac.currentTime + start;
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t);
  if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, t + duration);
  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.exponentialRampToValueAtTime(volume, t + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);
  osc.connect(gain).connect(ac.destination);
  osc.start(t);
  osc.stop(t + duration + 0.02);
}

// 방울 소리: 기본음 + 높은 배음
const bell = (freq: number, start: number, duration = 0.5, volume = 0.16) => {
  tone(freq, start, duration, { type: "sine", volume });
  tone(freq * 2.76, start, duration * 0.5, { type: "sine", volume: volume * 0.35 });
};

const NOTE = { C5: 523.25, D5: 587.33, E5: 659.25, G5: 783.99, A5: 880, C6: 1046.5, E6: 1318.5, G6: 1568 };

// 게임 시작: 귀여운 목소리로 "Start!" (브라우저 음성 합성, 높은 음정) + 반짝 소리
export function playStart() {
  bell(NOTE.C6, 0, 0.35, 0.12);
  bell(NOTE.G6, 0.08, 0.4, 0.1);
  const synth = window.speechSynthesis;
  if (!synth) return;
  synth.cancel();
  const voice = new SpeechSynthesisUtterance("Start!");
  voice.lang = "en-US";
  voice.pitch = 2; // 최대한 높게 → 아이 같은 목소리
  voice.rate = 1.15;
  voice.volume = 1;
  const voices = synth.getVoices().filter((v) => v.lang.startsWith("en"));
  const cute = voices.find((v) => /female|zira|samantha|aria|jenny|google us english/i.test(v.name));
  if (cute ?? voices[0]) voice.voice = (cute ?? voices[0])!;
  synth.speak(voice);
}

// 화살표가 지팡이에 들어올 때: 짧은 "뿅"
export function playArrow() {
  tone(NOTE.E6, 0, 0.12, { type: "triangle", volume: 0.1, slideTo: NOTE.G6 * 1.2 });
}

// 집에 도착: 징글벨 느낌의 짧은 축하 멜로디
export function playArrive() {
  const melody: [number, number][] = [
    [NOTE.E5, 0],
    [NOTE.E5, 0.14],
    [NOTE.E5, 0.28],
    [NOTE.G5, 0.5],
    [NOTE.C5, 0.64],
    [NOTE.D5, 0.78],
    [NOTE.E5, 0.92],
  ];
  melody.forEach(([freq, at]) => bell(freq, at, 0.45, 0.15));
  [NOTE.C6, NOTE.E6, NOTE.G6].forEach((freq, i) => bell(freq, 1.1 + i * 0.06, 0.9, 0.09));
}

// 기록·순위 공개: "짜잔~"
export function playTada() {
  tone(NOTE.G5, 0, 0.12, { type: "triangle", volume: 0.14 });
  [NOTE.C6, NOTE.E6, NOTE.G6].forEach((freq) => tone(freq, 0.13, 0.9, { type: "triangle", volume: 0.1 }));
  [0.15, 0.3, 0.45].forEach((at, i) => bell(NOTE.C6 * (1 + i * 0.25), at, 0.4, 0.05));
}
