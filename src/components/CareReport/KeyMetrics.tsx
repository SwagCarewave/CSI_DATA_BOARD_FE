import bedIcon from "../../assets/CareReport/bed.svg";
import moonIcon from "../../assets/CareReport/moon.svg";
import manIcon from "../../assets/CareReport/man.png";
import fallRedIcon from "../../assets/CareReport/Fall_red.svg";

import * as S from "../../styles/CareReport/KeyMetrics";

const METRICS = [
  {
    id: 1,
    title: "야간 뒤척임 횟수",
    value: "28",
    unit: "회",
    change: "▲ 40%",
    changeType: "increase",
    description: "(전주 평균 20회)",
    icon: bedIcon,
  },
  {
    id: 2,
    title: "총 수면 시간",
    value: "6",
    unit: "시간 15분",
    change: "▼ 15%",
    changeType: "decrease",
    description: "(전주 평균 7시간 20분)",
    icon: moonIcon,
  },
  {
    id: 3,
    title: "활동량 변화율",
    value: "-18",
    unit: "%",
    change: "▼ 18%",
    changeType: "decrease",
    description: "(전주 대비)",
    icon: manIcon,
  },
  {
    id: 4,
    title: "낙상 감지 횟수",
    value: "0",
    unit: "회",
    change: "",
    changeType: "normal",
    description: "(전주 평균 0회)",
    icon: fallRedIcon,
  },
];

export default function KeyMetrics() {
  return (
    <S.Card>
      <S.Header>
        <S.Title>주요 지표</S.Title>
        <S.Subtitle>(전일 기준)</S.Subtitle>
      </S.Header>

      <S.MetricGrid>
        {METRICS.map((metric) => (
          <S.MetricCard key={metric.id}>
            <S.MetricTitle>{metric.title}</S.MetricTitle>

            <S.IconCircle>
              <S.Icon src={metric.icon} alt={`${metric.title} 아이콘`} />
            </S.IconCircle>

            <S.ValueArea>
              <S.Value>{metric.value}</S.Value>
              <S.Unit>{metric.unit}</S.Unit>
            </S.ValueArea>

            {metric.change && (
              <S.ChangeText $type={metric.changeType}>
                {metric.change}
              </S.ChangeText>
            )}

            <S.Description>{metric.description}</S.Description>
          </S.MetricCard>
        ))}
      </S.MetricGrid>

      <S.AverageText>
        * 전주 평균: 최근 7일(5/13 ~ 5/19) 평균값 기준
      </S.AverageText>
    </S.Card>
  );
}
