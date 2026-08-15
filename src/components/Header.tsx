import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import * as S from "../styles/Header";

import grandfatherImage from "../assets/monitoring/grandfather.svg";

export default function Header() {
  const location = useLocation();

  const pageInfo = {
    "/": {
      number: "01.",
      title: "실시간 모니터링",
      description: "선택한 방의 상태를 실시간으로 모니터링합니다.",
    },
    "/alerts": {
      number: "02.",
      title: "알림 이력",
      description:
        "발생한 낙상 감지 및 이상 징후 이벤트를 조회하고 관리합니다.",
    },
    "/settings": {
      number: "04.",
      title: "설정 페이지",
      description: "시스템 설정 및 어르신, 방, 알림 설정을 관리합니다.",
    },
  };

  const currentPage =
    pageInfo[location.pathname as keyof typeof pageInfo] ?? pageInfo["/"];

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const weekList = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const year = currentTime.getFullYear();
  const month = String(currentTime.getMonth() + 1).padStart(2, "0");
  const date = String(currentTime.getDate()).padStart(2, "0");
  const week = weekList[currentTime.getDay()];

  const hours = String(currentTime.getHours()).padStart(2, "0");
  const minutes = String(currentTime.getMinutes()).padStart(2, "0");
  const seconds = String(currentTime.getSeconds()).padStart(2, "0");

  return (
    <S.HeaderContainer>
      <S.TitleArea>
        <S.PageNumber>{currentPage.number}</S.PageNumber>

        <S.TitleTextBox>
          <S.PageTitle>{currentPage.title}</S.PageTitle>
          <S.PageDescription>{currentPage.description}</S.PageDescription>
        </S.TitleTextBox>
      </S.TitleArea>

      <S.RightArea>
        <S.DateTimeBox>
          <S.DateText>
            {year}.{month}.{date} {week}
          </S.DateText>

          <S.TimeText>
            {hours}:{minutes}:{seconds}
          </S.TimeText>
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
          <S.ProfileImage src={grandfatherImage} alt="할아버지 프로필" />

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
