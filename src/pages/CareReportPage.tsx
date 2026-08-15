import CareReportSummary from "../components/CareReport/CareReportSummary";
import KeyMetrics from "../components/CareReport/KeyMetrics";
import NightActivityPattern from "../components/CareReport/NightActivityPattern";
import EventReportManagement from "../components/CareReport/EventReportManagement";

import monthIcon from "../assets/CareReport/month.svg";
import arrowIcon from "../assets/CareReport/Arrow.png";
import alertYellowIcon from "../assets/CareReport/Alert_yellow.svg";

import * as S from "../styles/CareReport/CareReportPage";

export default function CareReportPage() {
  return (
    <S.Page>
      <S.TopControlArea>
        <S.DateSelectBox>
          <S.ControlLabel>날짜 선택</S.ControlLabel>

          <S.DateControl>
            <S.DateValue>
              <span>2025.05.20</span>
              <S.SmallIcon src={monthIcon} alt="달력" />
            </S.DateValue>

            <S.ArrowButton type="button">‹</S.ArrowButton>
            <S.ArrowButton type="button">›</S.ArrowButton>
          </S.DateControl>
        </S.DateSelectBox>

        <S.ElderSelectBox>
          <S.ControlLabel>어르신 선택</S.ControlLabel>

          <S.ElderContentRow>
            <S.ElderButtonArea>
              <S.ElderButton $selected type="button">
                홍길동 (101호)
              </S.ElderButton>

              <S.ElderButton type="button">김영희 (102호)</S.ElderButton>

              <S.ElderButton type="button">이순자 (103호)</S.ElderButton>
            </S.ElderButtonArea>

            <S.RegenerateArea>
              <S.RegenerateButton type="button">
                <S.RegenerateIcon src={arrowIcon} alt="" />
                리포트 재생성
              </S.RegenerateButton>

              <S.LastGeneratedText>
                마지막 생성: 2025.05.21 06:00
              </S.LastGeneratedText>
            </S.RegenerateArea>
          </S.ElderContentRow>
        </S.ElderSelectBox>
      </S.TopControlArea>

      <S.WarningBox>
        <S.WarningIconBox>
          <S.WarningIcon src={alertYellowIcon} alt="" />
        </S.WarningIconBox>

        <S.WarningContent>
          <S.WarningTitle>평소와 다른 패턴 감지됨</S.WarningTitle>

          <S.WarningDescription>
            Isolation Forest 분석 결과, 전일 대비 이상 패턴이 감지되었습니다.
          </S.WarningDescription>
        </S.WarningContent>
      </S.WarningBox>

      <S.ContentGrid>
        <CareReportSummary />
        <KeyMetrics />

        <NightActivityPattern />
        <EventReportManagement />
      </S.ContentGrid>
    </S.Page>
  );
}
