import { useEffect, useRef, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Brush,
} from "recharts";

import * as S from "../../styles/monitoring/CsiGraphCard";

interface BreathingData {
  breathing_rate: number;
  heart_rate: number;
  timestamp: string;
  hardware_connected: boolean;
}

interface CsiSocketData {
  timestamp: string;
  rx: string;
  subcarriers: number[];
  amp_mean: number;
}

interface CsiGraphPoint {
  id: number;
  time: string;
  subcarrier1: number;
  subcarrier2: number;
  subcarrier3: number;
  ampMean: number;
}

const CSI_WS_URL = "ws://43.201.215.82:8000/ws/csi";
const BREATHING_WS_URL = "ws://43.201.215.82:8000/ws/breathing";

export default function CsiGraphCard() {
  const [sampleCount, setSampleCount] = useState("100");
  const [bioSignal, setBioSignal] = useState<BreathingData | null>(null);
  const [csiData, setCsiData] = useState<CsiGraphPoint[]>([]);

  const sampleCountRef = useRef(100);
  const pointIdRef = useRef(0);
  const hasLoggedCsi = useRef(false);
  const hasLoggedBreathing = useRef(false);

  useEffect(() => {
    sampleCountRef.current = Number(sampleCount);

    setCsiData((prev) => prev.slice(-Number(sampleCount)));
  }, [sampleCount]);

  useEffect(() => {
    const socket = new WebSocket(CSI_WS_URL);

    socket.onopen = () => {
      console.log("✅ CSI WebSocket 연결 성공");
    };

    socket.onmessage = (event) => {
      try {
        const data: CsiSocketData = JSON.parse(event.data);

        if (!hasLoggedCsi.current) {
          console.log("✅ CSI 데이터 수신 성공", data);
          hasLoggedCsi.current = true;
        }

        const time = new Date(data.timestamp).toLocaleTimeString("ko-KR", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });

        const point: CsiGraphPoint = {
          id: pointIdRef.current++,
          time,
          subcarrier1: data.subcarriers?.[0] ?? 0,
          subcarrier2: data.subcarriers?.[1] ?? 0,
          subcarrier3: data.subcarriers?.[2] ?? 0,
          ampMean: data.amp_mean ?? 0,
        };

        setCsiData((prev) => {
          const next = [...prev, point];
          return next.slice(-sampleCountRef.current);
        });
      } catch (error) {
        console.error("❌ CSI 데이터 파싱 오류:", error);
      }
    };

    socket.onerror = (error) => {
      console.error("❌ CSI WebSocket 오류:", error);
    };

    socket.onclose = (event) => {
      console.log("🔌 CSI WebSocket 연결 종료");
      console.log("code:", event.code);
      console.log("reason:", event.reason);
    };

    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    const socket = new WebSocket(BREATHING_WS_URL);

    socket.onopen = () => {
      console.log("✅ 호흡/심박 WebSocket 연결 성공");
    };

    socket.onmessage = (event) => {
      try {
        const data: BreathingData = JSON.parse(event.data);

        if (!hasLoggedBreathing.current) {
          console.log("✅ 호흡/심박 데이터 수신 성공", data);
          hasLoggedBreathing.current = true;
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
          <span className="line blue">Subcarrier 1</span>
          <span className="line gray">Subcarrier 2</span>
          <span className="line purple">Subcarrier 3</span>
          <span className="line green">평균 진폭</span>
        </S.Legend>

        <S.ChartBox>
          {csiData.length === 0 ? (
            <S.EmptyText>CSI 데이터를 수신 대기 중입니다.</S.EmptyText>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={csiData}
                margin={{ top: 4, right: 6, left: -22, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis
                  dataKey="time"
                  tick={{ fontSize: 9 }}
                  interval="preserveStartEnd"
                  minTickGap={24}
                />

                <YAxis tick={{ fontSize: 9 }} width={30} domain={[0, 40]} />
                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="subcarrier1"
                  stroke="#4f73b8"
                  dot={false}
                  strokeWidth={2}
                  isAnimationActive={false}
                  connectNulls
                />
                <Line
                  type="monotone"
                  dataKey="subcarrier2"
                  stroke="#9ca3af"
                  dot={false}
                  strokeWidth={2}
                  isAnimationActive={false}
                  connectNulls
                />
                <Line
                  type="monotone"
                  dataKey="subcarrier3"
                  stroke="#8b5fc7"
                  dot={false}
                  strokeWidth={2}
                  isAnimationActive={false}
                  connectNulls
                />
                <Line
                  type="monotone"
                  dataKey="ampMean"
                  stroke="#1a9c53"
                  dot={false}
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  isAnimationActive={false}
                  connectNulls
                />

                <Brush
                  dataKey="time"
                  height={16}
                  stroke="#12305C"
                  travellerWidth={6}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </S.ChartBox>
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
