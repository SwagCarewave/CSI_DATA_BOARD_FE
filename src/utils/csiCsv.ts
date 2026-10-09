// src/utils/csiCsv.ts

// 업로드한 CSI 기록 CSV의 구조를 빠르게 확인한다 (파일 앞·뒤 일부만 읽음).
// 필수 항목: 타임스탬프 · 수신기 · CSI 진폭

import { detectColumns, parseTimestamp, splitCsvRow } from "./csiAnalysis";

export const MAX_CSV_BYTES = 50 * 1024 * 1024;

const HEAD_BYTES = 256 * 1024;
const TAIL_BYTES = 64 * 1024;

export interface CsvInspection {
  file: File;
  name: string;
  start: Date | null;
  end: Date | null;
  receivers: string[];
}

export type CsvInspectResult =
  | { ok: true; data: CsvInspection }
  | { ok: false; reason: "format" };

const toDate = (ms: number | null) => (ms === null ? null : new Date(ms));

export async function inspectCsiCsv(file: File): Promise<CsvInspectResult> {
  if (!file.name.toLowerCase().endsWith(".csv") || file.size > MAX_CSV_BYTES) {
    return { ok: false, reason: "format" };
  }

  const head = await file.slice(0, HEAD_BYTES).text();
  const headLines = head.split(/\r?\n/).filter((line) => line.trim() !== "");
  // 앞부분만 잘라 읽었으므로 마지막 줄은 중간에서 끊겼을 수 있다
  if (file.size > HEAD_BYTES) headLines.pop();

  const columns = detectColumns(splitCsvRow(headLines[0] ?? ""));
  if (!columns || headLines.length < 2) return { ok: false, reason: "format" };

  const rows = headLines.slice(1).map(splitCsvRow);
  const receivers = Array.from(new Set(rows.map((row) => row[columns.receiver]).filter(Boolean))).sort();

  let lastRow = rows[rows.length - 1];
  if (file.size > HEAD_BYTES) {
    const tail = await file.slice(Math.max(0, file.size - TAIL_BYTES)).text();
    const tailLines = tail.split(/\r?\n/).filter((line) => line.trim() !== "");
    const candidate = tailLines.length > 1 ? splitCsvRow(tailLines[tailLines.length - 1]) : null;
    if (candidate) lastRow = candidate;
  }

  return {
    ok: true,
    data: {
      file,
      name: file.name,
      start: toDate(parseTimestamp(rows[0][columns.timestamp])),
      end: toDate(parseTimestamp(lastRow[columns.timestamp])),
      receivers,
    },
  };
}
