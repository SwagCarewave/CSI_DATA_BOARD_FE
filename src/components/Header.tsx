import * as S from "../styles/Header";

export default function Header() {
  return (
    <S.HeaderContainer>
      <S.TitleArea>
        <S.PageNumber>01.</S.PageNumber>

        <S.TitleTextBox>
          <S.PageTitle>실시간 모니터링</S.PageTitle>

          <S.PageDescription>
            선택한 방의 상태를 실시간으로 모니터링합니다.
          </S.PageDescription>
        </S.TitleTextBox>
      </S.TitleArea>

      <S.RightArea>
        <S.DateTimeBox>
          <S.DateText>2025.05.21 WED</S.DateText>
          <S.TimeText>14:32:18</S.TimeText>
        </S.DateTimeBox>

        <S.SystemStatusBox>
          <S.StatusTitle>시스템 상태</S.StatusTitle>

          <S.StatusRow>
            <span>FastAPI</span>
            <S.StatusDot />
            <span>OPERATION</span>
          </S.StatusRow>

          <S.StatusRow>
            <span>SpringBoot</span>
            <S.StatusDot />
            <span>OPERATION</span>
          </S.StatusRow>

          <S.StatusRow>
            <span>MySQL</span>
            <S.StatusDot />
            <span>OPERATION</span>
          </S.StatusRow>
        </S.SystemStatusBox>

        <S.ProfileBox>
          <S.ProfileImage />

          <S.ProfileInfo>
            <S.ProfileName>홍길동 보호자</S.ProfileName>
            <S.ProfileRole>보호자 계정</S.ProfileRole>

            <S.LogoutButton>LOGOUT</S.LogoutButton>
          </S.ProfileInfo>
        </S.ProfileBox>
      </S.RightArea>
    </S.HeaderContainer>
  );
}
