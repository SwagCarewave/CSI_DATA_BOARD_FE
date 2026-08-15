import styled from "styled-components";

export const Card = styled.section`
  min-height: 200px;
  padding: 18px;

  background-color: ${({ theme }) => theme.colors.white};

  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.card};

  box-shadow: ${({ theme }) => theme.shadow.card};
`;

export const TitleArea = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const Title = styled.h3`
  color: ${({ theme }) => theme.colors.DeepBlue};

  font-size: 14px;
  font-weight: 800;
`;

export const Subtitle = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};

  font-size: 9px;
  font-weight: 500;
`;

export const Chart = styled.div`
  position: relative;

  width: 100%;
  margin-top: 15px;
  padding-bottom: 28px;
`;

export const TimeRow = styled.div`
  margin-left: 70px;
  margin-bottom: 8px;

  display: flex;
  justify-content: space-between;

  color: ${({ theme }) => theme.colors.DeepBlue};

  font-size: 8px;
  font-weight: 600;
`;

export const ChartRow = styled.div`
  display: grid;
  grid-template-columns: 65px 1fr;
  align-items: center;

  margin-bottom: 8px;
`;

export const RowLabel = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};

  font-size: 8px;
  font-weight: 600;
`;

export const Track = styled.div`
  position: relative;

  height: 17px;

  overflow: hidden;

  background-color: #f5f6f8;
`;

export const ActivitySegment = styled.div`
  position: absolute;
  top: 0;

  height: 100%;

  background-color: #bed6fa;
`;

export const TurnSegment = styled.div`
  position: absolute;
  top: 0;

  height: 100%;

  background-color: #8cb6ed;
`;

export const DangerArea = styled.div`
  position: absolute;
  top: 0;
  left: 57%;

  width: 8%;
  height: 100%;

  background-color: rgba(85, 139, 205, 0.48);
`;

export const SleepTrack = styled.div`
  height: 17px;

  display: flex;

  overflow: hidden;

  background-color: #d5d5d5;
`;

export const SleepLow = styled.div`
  width: 16%;
  height: 100%;

  background-color: #c5c5c5;
`;

export const SleepDeep = styled.div`
  width: 68%;
  height: 100%;

  background-color: #316cae;
`;

export const SleepEnd = styled.div`
  flex: 1;

  background-color: #bdbdbd;
`;

export const DangerGuide = styled.div`
  position: absolute;
  top: 16px;
  bottom: 26px;
  left: calc(70px + (100% - 70px) * 0.57);

  width: calc((100% - 70px) * 0.08);

  border: 1px dashed #df4b3b;

  pointer-events: none;
`;

export const DangerText = styled.p`
  position: absolute;
  left: 58%;
  bottom: 0;

  color: #df493c;

  font-size: 8px;
  font-weight: 700;
  line-height: 1.3;
`;

export const Legend = styled.div`
  padding-left: 70px;

  display: flex;
  align-items: center;
  gap: 15px;
  flex-wrap: wrap;
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;

  color: ${({ theme }) => theme.colors.textSecondary};

  font-size: 8px;
  font-weight: 600;
`;

export const LegendDot = styled.div<{
  $type: "low" | "normal" | "high" | "sleep" | "awake";
}>`
  width: 10px;
  height: 6px;

  border-radius: 999px;

  background-color: ${({ $type }) => {
    switch ($type) {
      case "low":
        return "#919191";
      case "normal":
        return "#8db7ec";
      case "high":
        return "#316cae";
      case "sleep":
        return "#dddddd";
      case "awake":
        return "#a7a7a7";
    }
  }};
`;
