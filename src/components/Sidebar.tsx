import * as S from "../styles/Sidebar";
import signIcon from "../assets/monitoring/sign.svg";

export default function Sidebar() {
  return (
    <S.SidebarContainer>
      <div>
        <S.LogoBox>
          <S.Logo>CAREWAVE</S.Logo>
          <S.SubLogo>REAL-TIME MONITORING</S.SubLogo>
        </S.LogoBox>

        <S.MenuList>
          <S.MenuItem $active>
            <S.MenuNumber>01</S.MenuNumber>
            <S.MenuText>실시간 모니터링 페이지</S.MenuText>
          </S.MenuItem>

          <S.MenuItem>
            <S.MenuNumber>02</S.MenuNumber>
            <S.MenuText>알림 이력 페이지</S.MenuText>
          </S.MenuItem>

          <S.MenuItem>
            <S.MenuNumber>03</S.MenuNumber>
            <S.MenuText>AI 케어 리포트 페이지</S.MenuText>
          </S.MenuItem>

          <S.MenuItem>
            <S.MenuNumber>04</S.MenuNumber>
            <S.MenuText>설정 페이지</S.MenuText>
          </S.MenuItem>
        </S.MenuList>
      </div>

      <S.ConnectionBox>
        <S.ConnectionIcon src={signIcon} alt="연결 상태 아이콘" />

        <S.ConnectionLabel>연결 상태</S.ConnectionLabel>
        <S.ConnectionStatus>ONLINE</S.ConnectionStatus>

        <S.ConnectionDescription>
          모든 시스템이 정상적으로
          <br />
          작동 중입니다.
        </S.ConnectionDescription>
      </S.ConnectionBox>
    </S.SidebarContainer>
  );
}