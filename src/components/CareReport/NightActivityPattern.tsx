import * as S from "../../styles/CareReport/NightActivityPattern";

const MOVE_SEGMENTS = [
  { left: "12%", width: "2%" },
  { left: "17%", width: "2%" },
  { left: "33%", width: "3%" },
  { left: "38%", width: "2%" },
  { left: "43%", width: "2%" },
  { left: "57%", width: "7%" },
  { left: "67%", width: "3%" },
  { left: "82%", width: "2%" },
];

const TURN_SEGMENTS = [
  { left: "14%", width: "2%" },
  { left: "18%", width: "2%" },
  { left: "31%", width: "4%" },
  { left: "39%", width: "3%" },
  { left: "56%", width: "9%" },
  { left: "68%", width: "3%" },
  { left: "82%", width: "2%" },
];

export default function NightActivityPattern() {
  return (
    <S.Card>
      <S.TitleArea>
        <S.Title>야간 활동 패턴</S.Title>
        <S.Subtitle>(타임라인)</S.Subtitle>
      </S.TitleArea>

      <S.Chart>
        <S.TimeRow>
          <span>21:00</span>
          <span>23:00</span>
          <span>01:00</span>
          <span>03:00</span>
          <span>05:00</span>
          <span>07:00</span>
        </S.TimeRow>

        <S.ChartRow>
          <S.RowLabel>활동 감지</S.RowLabel>

          <S.Track>
            {MOVE_SEGMENTS.map((segment, index) => (
              <S.ActivitySegment
                key={index}
                style={{
                  left: segment.left,
                  width: segment.width,
                }}
              />
            ))}

            <S.DangerArea />
          </S.Track>
        </S.ChartRow>

        <S.ChartRow>
          <S.RowLabel>뒤척임 강도</S.RowLabel>

          <S.Track>
            {TURN_SEGMENTS.map((segment, index) => (
              <S.TurnSegment
                key={index}
                style={{
                  left: segment.left,
                  width: segment.width,
                }}
              />
            ))}

            <S.DangerArea />
          </S.Track>
        </S.ChartRow>

        <S.ChartRow>
          <S.RowLabel>수면 상태</S.RowLabel>

          <S.SleepTrack>
            <S.SleepLow />
            <S.SleepDeep />
            <S.SleepEnd />
          </S.SleepTrack>
        </S.ChartRow>

        <S.DangerGuide />

        <S.DangerText>
          03:00 ~ 03:15
          <br />
          활동 감지 구간
        </S.DangerText>
      </S.Chart>

      <S.Legend>
        <S.LegendItem>
          <S.LegendDot $type="low" />
          낮음
        </S.LegendItem>

        <S.LegendItem>
          <S.LegendDot $type="normal" />
          보통
        </S.LegendItem>

        <S.LegendItem>
          <S.LegendDot $type="high" />
          높음
        </S.LegendItem>

        <S.LegendItem>
          <S.LegendDot $type="sleep" />
          수면
        </S.LegendItem>

        <S.LegendItem>
          <S.LegendDot $type="awake" />
          각성
        </S.LegendItem>
      </S.Legend>
    </S.Card>
  );
}
