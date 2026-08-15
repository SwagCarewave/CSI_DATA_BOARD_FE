import * as S from "../../styles/CareReport/CareReportSummary";

export default function CareReportSummary() {
  return (
    <S.Card>
      <S.Title>AI 케어 리포트 요약</S.Title>

      <S.Content>
        <S.Paragraph>
          어제(5월 20일) 홍길동 어르신은 평소보다 야간 뒤척임이 증가하였으며,
          <br />
          수면 중 짧은 각성 구간이 여러 차례 관찰되었습니다.
        </S.Paragraph>

        <S.Paragraph>
          야간 뒤척임이 평소 대비 <strong>40% 증가</strong>하였고, 새벽 3시경 약{" "}
          <strong>15분간 활동</strong>이 감지되었습니다.
        </S.Paragraph>

        <S.Paragraph>
          이상 호흡이나 낙상은 발생하지 않았습니다.
          <br />
          오늘 컨디션 확인 및 휴식 상태 점검을 권장드립니다.
        </S.Paragraph>
      </S.Content>

      <S.Notice>
        ※ 본 리포트는 AI 분석 결과로 실제 건강 상태를 진단하는 용도가 아닙니다.
      </S.Notice>
    </S.Card>
  );
}
