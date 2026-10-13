// src/api/client.ts

import type { ApiErrorBody } from "./types";

// 배포 환경에서는 VITE_API_BASE_URL / VITE_WS_BASE_URL 로 바꿀 수 있다
const env = import.meta.env as Record<string, string | undefined>;

export const API_BASE_URL = (env.VITE_API_BASE_URL || "https://api.leewatertrue.site").replace(/\/$/, "");
export const WS_BASE_URL = (env.VITE_WS_BASE_URL || API_BASE_URL.replace(/^http/, "ws")).replace(/\/$/, "");

export class ApiError extends Error {
  status: number;
  code: string;
  detail: Record<string, unknown>;

  constructor(status: number, code: string, message: string, detail: Record<string, unknown> = {}) {
    super(message);
    this.status = status;
    this.code = code;
    this.detail = detail;
  }
}

const fallbackMessage = (status: number) =>
  status >= 500
    ? "서버에서 오류가 발생했습니다. 잠시 후 다시 시도해 주세요."
    : "요청을 처리하지 못했습니다. 입력 내용을 확인해 주세요.";

// 서버 오류 응답 {"error": {code, message, detail}} 의 message는 화면에 그대로 보여 줄 수 있다
export async function apiRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  const isForm = init.body instanceof FormData;
  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      headers: {
        Accept: "application/json",
        ...(init.body && !isForm ? { "Content-Type": "application/json" } : {}),
        ...init.headers,
      },
    });
  } catch {
    // 네트워크 끊김뿐 아니라, CORS 헤더가 없는 서버 오류 응답도 브라우저에서는 여기로 온다
    throw new ApiError(
      0,
      "network_error",
      "서버에 연결할 수 없거나 서버에서 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
    );
  }

  if (response.status === 204) return undefined as T;

  const text = await response.text();
  let body: unknown = null;
  try {
    body = text ? JSON.parse(text) : null;
  } catch {
    // 예: "Internal Server Error" 같은 텍스트 응답 → body는 null 그대로
  }

  if (!response.ok) {
    const error = (body as ApiErrorBody | null)?.error;
    throw new ApiError(
      response.status,
      error?.code ?? `http_${response.status}`,
      error?.message ?? fallbackMessage(response.status),
      error?.detail ?? {},
    );
  }

  return body as T;
}

export const errorMessage = (error: unknown) =>
  error instanceof ApiError ? error.message : "알 수 없는 오류가 발생했습니다.";

// 파일 내려받기 (CSV 등). 실패하면 서버 오류 문구로 ApiError를 던진다.
export async function apiDownload(path: string): Promise<{ blob: Blob; filename: string | null }> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`);
  } catch {
    throw new ApiError(0, "network_error", "서버에 연결할 수 없거나 서버에서 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
  }

  if (!response.ok) {
    let body: ApiErrorBody | null = null;
    try {
      body = (await response.json()) as ApiErrorBody;
    } catch {
      // 텍스트 오류 응답
    }
    throw new ApiError(
      response.status,
      body?.error?.code ?? `http_${response.status}`,
      body?.error?.message ?? fallbackMessage(response.status),
      body?.error?.detail ?? {},
    );
  }

  // attachment; filename="csi_raw_live_20261013_231800.csv"
  const disposition = response.headers.get("Content-Disposition") ?? "";
  const filename = /filename\*?=(?:UTF-8'')?"?([^";]+)"?/i.exec(disposition)?.[1] ?? null;
  return { blob: await response.blob(), filename: filename ? decodeURIComponent(filename) : null };
}
