// src/utils/csiAnalysis.ts

// CSI 원본 CSV(타임스탬프 · 수신기 · 서브캐리어별 진폭)를 그래프용 데이터로 변환한다.
// DOM에 의존하지 않으므로 Web Worker와 Node 양쪽에서 실행할 수 있다.
//
// 1. 기록 시간을 최대 600개 구간(bin)으로 나눈다.
// 2. 움직임 강도: 구간 안에서 수신기별 진폭 분포가 얼마나 흔들리는지(변동계수)를 계산한다.
//    패킷마다 서브캐리어 패턴의 위상이 달라지므로, 진폭을 정렬한 분위수로 비교해 위상 영향을 없앤다.
// 3. 히트맵: 구간 × 서브캐리어별 평균 진폭(수신기 평균).
// 4. 주요 움직임 구간: 움직임 강도가 중앙값 + 3·MAD를 넘는 구간.

export type MotionKind = "surge" | "short";

export interface MotionSegment {
  startMs: number;
  endMs: number;
  peakMs: number;
  peak: number;
  kind: MotionKind; // surge: 움직임 급증, short: 짧은 움직임
}

export interface CsiAnalysis {
  startMs: number;
  endMs: number;
  receivers: string[];
  packetCount: number;
  binMs: number;
  binCount: number;
  motion: number[]; // 구간별 움직임 강도 (데이터 없는 구간은 NaN)
  motionThreshold: number;
  subcarrierCount: number;
  heatmap: Float32Array; // binCount × subcarrierCount, 데이터 없는 칸은 NaN
  heatmapMax: number;
  segments: MotionSegment[];
}

export interface CsiColumns {
  timestamp: number;
  receiver: number;
  amplitudes: number[];
}

export class CsiAnalysisError extends Error {}

const TIMESTAMP_PATTERN = /(timestamp|^time$|^ts$|datetime|타임스탬프|시각|시간)/;
const RECEIVER_PATTERN = /(^rx(_?id)?$|receiver|수신기)/;
const SUBCARRIER_PATTERN = /^(sub|sc|subcarrier|amp|amplitude|csi|진폭)[_-]?\d+$/;
const AMPLITUDE_PATTERN = /(amp|amplitude|진폭|^csi)/;

const MAX_BINS = 600;
const BIN_STEPS_MS = [500, 1000, 2000, 5000, 10000, 15000, 30000, 60000, 120000, 300000, 600000];
const QUANTILES = 16;
const MAX_SEGMENTS = 12;

export const splitCsvRow = (line: string) =>
  line.split(",").map((cell) => cell.trim().replace(/^"(.*)"$/, "$1"));

// 필수 열: 타임스탬프 · 수신기 · CSI 진폭(서브캐리어별 열 또는 진폭 열 하나)
export function detectColumns(header: string[]): CsiColumns | null {
  const cells = header.map((cell) => cell.toLowerCase());
  const timestamp = cells.findIndex((cell) => TIMESTAMP_PATTERN.test(cell));
  const receiver = cells.findIndex((cell) => RECEIVER_PATTERN.test(cell));

  let amplitudes = cells.flatMap((cell, index) => (SUBCARRIER_PATTERN.test(cell) ? [index] : []));
  if (amplitudes.length === 0) {
    const single = cells.findIndex(
      (cell, index) => index !== timestamp && index !== receiver && AMPLITUDE_PATTERN.test(cell),
    );
    amplitudes = single >= 0 ? [single] : [];
  }

  if (timestamp < 0 || receiver < 0 || amplitudes.length === 0) return null;
  return { timestamp, receiver, amplitudes };
}

export function parseTimestamp(raw: string | undefined): number | null {
  if (!raw) return null;
  if (/^\d+(\.\d+)?$/.test(raw)) {
    const value = Number(raw);
    // 초 단위 epoch와 밀리초 단위 epoch를 모두 허용
    return value < 1e12 ? value * 1000 : value;
  }
  const ms = Date.parse(raw);
  return Number.isNaN(ms) ? null : ms;
}

const quantileOf = (sorted: number[], q: number) => {
  const pos = (sorted.length - 1) * q;
  const lo = Math.floor(pos);
  const hi = Math.ceil(pos);
  return sorted[lo] + (sorted[hi] - sorted[lo]) * (pos - lo);
};

const median = (values: number[]) => {
  if (values.length === 0) return NaN;
  const sorted = [...values].sort((a, b) => a - b);
  return quantileOf(sorted, 0.5);
};

const niceCeil = (value: number, step: number) => Math.max(step, Math.ceil(value / step) * step);

export function analyzeCsiText(text: string, onProgress?: (ratio: number) => void): CsiAnalysis {
  const lines = text.split(/\r?\n/);
  const columns = detectColumns(splitCsvRow(lines[0] ?? ""));
  if (!columns) throw new CsiAnalysisError("필수 열이 없습니다.");

  const subcarrierCount = columns.amplitudes.length;
  const capacity = Math.max(0, lines.length - 1);
  const times = new Float64Array(capacity);
  const rxIndex = new Int16Array(capacity);
  const amps = new Float32Array(capacity * subcarrierCount).fill(NaN);
  const receivers: string[] = [];
  let count = 0;

  // 1) 파싱 — 일부 행은 끝 서브캐리어 값이 빠져 있으므로 빈 칸은 NaN으로 둔다
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line) continue;
    const cells = line.split(",");
    const t = parseTimestamp(cells[columns.timestamp]?.trim().replace(/^"(.*)"$/, "$1"));
    if (t === null) continue;

    const rxName = cells[columns.receiver]?.trim() || "RX";
    let rx = receivers.indexOf(rxName);
    if (rx < 0) {
      rx = receivers.length;
      receivers.push(rxName);
    }

    const base = count * subcarrierCount;
    for (let k = 0; k < subcarrierCount; k++) {
      const value = Number.parseFloat(cells[columns.amplitudes[k]]);
      if (Number.isFinite(value)) amps[base + k] = value;
    }
    times[count] = t;
    rxIndex[count] = rx;
    count++;

    if (onProgress && i % 5000 === 0) onProgress((i / lines.length) * 0.8);
  }

  if (count < 2) throw new CsiAnalysisError("분석할 데이터 행이 부족합니다.");

  let startMs = Infinity;
  let endMs = -Infinity;
  for (let i = 0; i < count; i++) {
    startMs = Math.min(startMs, times[i]);
    endMs = Math.max(endMs, times[i]);
  }
  const durationMs = endMs - startMs;
  if (!(durationMs > 0)) throw new CsiAnalysisError("기록 시간을 확인할 수 없습니다.");

  // 2) 구간 나누기
  const binMs = BIN_STEPS_MS.find((step) => durationMs / step <= MAX_BINS) ?? Math.ceil(durationMs / MAX_BINS);
  const binCount = Math.max(1, Math.ceil(durationMs / binMs));
  const binOf = (t: number) => Math.min(binCount - 1, Math.floor((t - startMs) / binMs));

  const rxCount = receivers.length;
  const qSum = new Float64Array(binCount * rxCount * QUANTILES);
  const qSumSq = new Float64Array(binCount * rxCount * QUANTILES);
  const qCount = new Uint32Array(binCount * rxCount);
  const hSum = new Float64Array(binCount * subcarrierCount);
  const hCount = new Uint32Array(binCount * subcarrierCount);
  const valid: number[] = [];

  for (let i = 0; i < count; i++) {
    const bin = binOf(times[i]);
    const base = i * subcarrierCount;

    valid.length = 0;
    for (let k = 0; k < subcarrierCount; k++) {
      const value = amps[base + k];
      if (Number.isNaN(value)) continue;
      valid.push(value);
      hSum[bin * subcarrierCount + k] += value;
      hCount[bin * subcarrierCount + k] += 1;
    }
    if (valid.length < 2) continue;

    valid.sort((a, b) => a - b);
    const slot = bin * rxCount + rxIndex[i];
    qCount[slot] += 1;
    for (let q = 0; q < QUANTILES; q++) {
      const value = quantileOf(valid, q / (QUANTILES - 1));
      qSum[slot * QUANTILES + q] += value;
      qSumSq[slot * QUANTILES + q] += value * value;
    }

    if (onProgress && i % 20000 === 0) onProgress(0.8 + (i / count) * 0.15);
  }

  // 3) 구간별 움직임 강도 (수신기 평균 변동계수)
  const rawMotion = new Array<number>(binCount).fill(NaN);
  for (let b = 0; b < binCount; b++) {
    let rxTotal = 0;
    let rxUsed = 0;
    for (let r = 0; r < rxCount; r++) {
      const slot = b * rxCount + r;
      const n = qCount[slot];
      if (n < 3) continue;
      let cvTotal = 0;
      let cvUsed = 0;
      for (let q = 0; q < QUANTILES; q++) {
        const mean = qSum[slot * QUANTILES + q] / n;
        if (mean < 0.5) continue;
        const variance = Math.max(0, qSumSq[slot * QUANTILES + q] / n - mean * mean);
        cvTotal += Math.sqrt(variance) / mean;
        cvUsed++;
      }
      if (cvUsed > 0) {
        rxTotal += cvTotal / cvUsed;
        rxUsed++;
      }
    }
    if (rxUsed > 0) rawMotion[b] = rxTotal / rxUsed;
  }

  // 구간이 충분히 많으면 3구간 이동평균으로 잡음을 줄인다
  const motion =
    binCount >= 30
      ? rawMotion.map((_, b) => {
          const window = [rawMotion[b - 1], rawMotion[b], rawMotion[b + 1]].filter(
            (value) => value !== undefined && !Number.isNaN(value),
          );
          return window.length ? window.reduce((sum, value) => sum + value, 0) / window.length : NaN;
        })
      : rawMotion;

  // 4) 주요 움직임 구간
  const finite = motion.filter((value) => !Number.isNaN(value));
  const center = median(finite);
  const mad = median(finite.map((value) => Math.abs(value - center))) * 1.4826;
  const spread = mad > 0 ? mad : center * 0.1;
  const motionThreshold = center + 3 * spread;
  const surgeThreshold = center + 6 * spread;

  const segments: MotionSegment[] = [];
  let open: { first: number; last: number } | null = null;
  const closeSegment = () => {
    if (!open) return;
    let peakBin = open.first;
    for (let b = open.first; b <= open.last; b++) if (motion[b] > motion[peakBin]) peakBin = b;
    segments.push({
      startMs: startMs + open.first * binMs,
      endMs: Math.min(endMs, startMs + (open.last + 1) * binMs),
      peakMs: startMs + (peakBin + 0.5) * binMs,
      peak: motion[peakBin],
      kind: motion[peakBin] >= surgeThreshold ? "surge" : "short",
    });
    open = null;
  };
  for (let b = 0; b < binCount; b++) {
    if (motion[b] > motionThreshold) {
      // 한 구간 이하의 끊김은 같은 움직임으로 본다
      if (open && b - open.last <= 2) open.last = b;
      else {
        closeSegment();
        open = { first: b, last: b };
      }
    }
  }
  closeSegment();

  const strongest = [...segments].sort((a, b) => b.peak - a.peak).slice(0, MAX_SEGMENTS);
  const keptSegments = segments.filter((segment) => strongest.includes(segment));

  // 5) 히트맵
  const heatmap = new Float32Array(binCount * subcarrierCount).fill(NaN);
  const heatValues: number[] = [];
  for (let i = 0; i < heatmap.length; i++) {
    if (hCount[i] > 0) {
      heatmap[i] = hSum[i] / hCount[i];
      heatValues.push(heatmap[i]);
    }
  }
  heatValues.sort((a, b) => a - b);
  const heatmapMax = niceCeil(heatValues.length ? quantileOf(heatValues, 0.99) : 1, 5);

  onProgress?.(1);

  return {
    startMs,
    endMs,
    receivers: [...receivers].sort(),
    packetCount: count,
    binMs,
    binCount,
    motion,
    motionThreshold,
    subcarrierCount,
    heatmap,
    heatmapMax,
    segments: keptSegments,
  };
}
