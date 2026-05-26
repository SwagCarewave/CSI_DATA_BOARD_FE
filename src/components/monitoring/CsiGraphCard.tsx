// src/components/monitoring/CsiGraphCard.tsx

import { useEffect, useRef, useState } from "react";

import * as S from "../../styles/monitoring/CsiGraphCard";

interface BreathingData {
  breathing_rate: number;
  heart_rate: number;
  timestamp: string;
  hardware_connected: boolean;
}

export default function CsiGraphCard() {
  const [sampleCount, setSampleCount] = useState("100");
  const [bioSignal, setBioSignal] = useState<BreathingData | null>(null);

  const hasLoggedMessage = useRef(false);

  useEffect(() => {
    const socket = new WebSocket("ws://43.201.215.82:8000/ws/breathing");

    socket.onopen = () => {
      console.log("✅ 호흡/심박 WebSocket 연결 성공");
    };

    socket.onmessage = (event) => {
      try {
        const data: BreathingData = JSON.parse(event.data);

        if (!hasLoggedMessage.current) {
          console.log("✅ 호흡/심박 데이터 수신 성공");
          hasLoggedMessage.current = true;
        }

        setBioSignal(data);
      } catch (error) {
        console.error("❌ 호흡/심박 데이터 파싱 오류:", error);
      }
    };

    socket.onerror = (error) => {
      console.error("❌ 호흡/심박 WebSocket 오류:", error);
    };

    socket.onclose = (event) => {
      console.log("🔌 호흡/심박 WebSocket 연결 종료");
      console.log("code:", event.code);
      console.log("reason:", event.reason);
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <S.Card>
      <S.GraphArea>
        <S.Header>
          <div>
            <S.Title>CSI 실시간 그래프</S.Title>
            <S.SubTitle>(Subcarrier Amplitude)</S.SubTitle>
          </div>

          <S.SelectBox
            value={sampleCount}
            onChange={(e) => setSampleCount(e.target.value)}
          >
            <option value="50">최근 50샘플</option>
            <option value="100">최근 100샘플</option>
            <option value="200">최근 200샘플</option>
            <option value="500">최근 500샘플</option>
          </S.SelectBox>
        </S.Header>

        <S.Legend>
          <span>━ Subcarrier 1</span>
          <span>━ Subcarrier 2</span>
          <span>━ Subcarrier 3</span>
          <span>--- 호흡 신호 (0.1~0.5Hz)</span>
        </S.Legend>

        <S.GraphPlaceholder>
          <S.LineOne />
          <S.LineTwo />
          <S.LineThree />
          <S.LineFour />
        </S.GraphPlaceholder>
      </S.GraphArea>

      <S.BioSignalBox>
        <S.BioTitle>
          생체신호 <span>(보조 지표)</span>
        </S.BioTitle>

        {bioSignal?.hardware_connected === false ? (
          <S.Note>하드웨어 전원이 꺼져 있습니다.</S.Note>
        ) : (
          <>
            <S.BioCard>
              <S.BioLabel>호흡수</S.BioLabel>
              <S.BioValue>
                {bioSignal ? Math.round(bioSignal.breathing_rate) : "-"}{" "}
                <span>회/분</span>
              </S.BioValue>
            </S.BioCard>

            <S.BioCard>
              <S.BioLabel>심박수</S.BioLabel>
              <S.BioValue>
                {bioSignal ? Math.round(bioSignal.heart_rate) : "-"}{" "}
                <span>BPM</span>
              </S.BioValue>
            </S.BioCard>

            <S.Note>
              * 참고용 추정치이며
              <br />
              의료적 진단을 대체하지 않습니다.
            </S.Note>
          </>
        )}
      </S.BioSignalBox>
    </S.Card>
  );
}
