// src/utils/analyzeCsiInWorker.ts

import type { CsiAnalysis } from "./csiAnalysis";
import type { CsiWorkerRequest, CsiWorkerResponse } from "../workers/csiAnalysis.worker";

export class CsiWorkerError extends Error {
  reason: "format" | "analysis";

  constructor(reason: "format" | "analysis", message: string) {
    super(message);
    this.reason = reason;
  }
}

let worker: Worker | null = null;
let nextId = 1;
const listeners = new Map<number, (response: CsiWorkerResponse) => void>();

const getWorker = () => {
  if (!worker) {
    worker = new Worker(new URL("../workers/csiAnalysis.worker.ts", import.meta.url), { type: "module" });
    worker.onmessage = (event: MessageEvent<CsiWorkerResponse>) => listeners.get(event.data.id)?.(event.data);
  }
  return worker;
};

// source: 업로드한 파일 또는 번들된 예시 CSV의 URL
export function analyzeCsiInWorker(
  source: Blob | string,
  onProgress?: (ratio: number) => void,
): Promise<CsiAnalysis> {
  const id = nextId++;
  const request: CsiWorkerRequest = typeof source === "string" ? { id, url: source } : { id, file: source };

  return new Promise((resolve, reject) => {
    listeners.set(id, (response) => {
      if (response.type === "progress") {
        onProgress?.(response.ratio);
        return;
      }
      listeners.delete(id);
      if (response.type === "done") resolve(response.analysis);
      else reject(new CsiWorkerError(response.reason, response.message));
    });
    getWorker().postMessage(request);
  });
}
