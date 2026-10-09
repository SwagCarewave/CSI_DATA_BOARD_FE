// src/workers/csiAnalysis.worker.ts

// CSV 분석을 메인 스레드 밖에서 실행한다 (최대 50MB 파일도 화면이 멈추지 않도록).

import { analyzeCsiText, CsiAnalysisError } from "../utils/csiAnalysis";
import type { CsiAnalysis } from "../utils/csiAnalysis";

export type CsiWorkerRequest = { id: number; file: Blob } | { id: number; url: string };

export type CsiWorkerResponse =
  | { id: number; type: "progress"; ratio: number }
  | { id: number; type: "done"; analysis: CsiAnalysis }
  | { id: number; type: "error"; reason: "format" | "analysis"; message: string };

const scope = self as unknown as {
  onmessage: ((event: MessageEvent<CsiWorkerRequest>) => void) | null;
  postMessage: (message: CsiWorkerResponse, transfer?: Transferable[]) => void;
};

scope.onmessage = async (event) => {
  const request = event.data;
  const { id } = request;

  try {
    const text =
      "file" in request ? await request.file.text() : await (await fetch(request.url)).text();
    scope.postMessage({ id, type: "progress", ratio: 0.05 });

    const analysis = analyzeCsiText(text, (ratio) =>
      scope.postMessage({ id, type: "progress", ratio: 0.05 + ratio * 0.95 }),
    );
    scope.postMessage({ id, type: "done", analysis }, [analysis.heatmap.buffer]);
  } catch (error) {
    scope.postMessage({
      id,
      type: "error",
      reason: error instanceof CsiAnalysisError && error.message.includes("필수 열") ? "format" : "analysis",
      message: error instanceof Error ? error.message : String(error),
    });
  }
};
