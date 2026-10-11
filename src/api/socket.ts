// src/api/socket.ts

import { WS_BASE_URL } from "./client";

interface SocketOptions<T> {
  onMessage: (message: T) => void;
  // 서버가 정상 종료(1000)했거나 없는 대상(4404 등)이라 다시 접속하지 않을 때
  onFinalClose?: (code: number) => void;
}

// 끊기면 1·2·4…최대 10초 간격으로 다시 접속한다. 반환한 함수를 부르면 연결을 닫는다.
// 1000(정상 종료)과 4xxx(서버가 거절) 코드는 다시 접속하지 않는다.
export function openSocket<T>(path: string, { onMessage, onFinalClose }: SocketOptions<T>) {
  let socket: WebSocket | null = null;
  let retry = 0;
  let timer: number | undefined;
  let closedByClient = false;

  const connect = () => {
    socket = new WebSocket(`${WS_BASE_URL}${path}`);

    socket.onopen = () => {
      retry = 0;
    };

    socket.onmessage = (event) => {
      try {
        onMessage(JSON.parse(event.data) as T);
      } catch (error) {
        console.error("WebSocket 메시지를 읽지 못했습니다.", error);
      }
    };

    socket.onclose = (event) => {
      if (closedByClient) return;
      if (event.code === 1000 || (event.code >= 4000 && event.code < 5000)) {
        onFinalClose?.(event.code);
        return;
      }
      const delay = Math.min(10000, 1000 * 2 ** retry++);
      timer = window.setTimeout(connect, delay);
    };
  };

  connect();

  return () => {
    closedByClient = true;
    window.clearTimeout(timer);
    socket?.close(1000);
  };
}
