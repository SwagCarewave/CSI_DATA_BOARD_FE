// src/components/Header.tsx

import { useEffect, useState } from "react";
import * as S from "../styles/Header";

import grandfatherImage from "../assets/monitoring/grandfather.svg";

export default function Header() {
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
