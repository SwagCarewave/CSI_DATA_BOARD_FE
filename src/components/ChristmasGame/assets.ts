// src/components/ChristmasGame/assets.ts

// 크리스마스 미로 게임 이미지 (원본: assets/졸작게임이미지, 피그마에서 받거나 잘라 낸 것: assets/christmasGame)

import lobbyBackground from "../../assets/졸작게임이미지/졸작게임이미지/로비 화면.png";
import titleLogo from "../../assets/졸작게임이미지/졸작게임이미지/ChatGPT 이미지 2026년 10월 16일 오후 04_34_50.png";
import sleigh from "../../assets/졸작게임이미지/졸작게임이미지/sparkle-sleigh-sheet.apng";
import backButton from "../../assets/졸작게임이미지/졸작게임이미지/돌아가기 버튼.png";
import howToButton from "../../assets/졸작게임이미지/졸작게임이미지/게임 방법.png";
import gameBackground from "../../assets/졸작게임이미지/졸작게임이미지/본편 게임 배경.png";
import gameFrame from "../../assets/졸작게임이미지/졸작게임이미지/본편 게임 액자.png";
import maze from "../../assets/졸작게임이미지/졸작게임이미지/본편 게임 미로4.png";
import cottage from "../../assets/졸작게임이미지/졸작게임이미지/집 도착.png";
import candyCane from "../../assets/졸작게임이미지/졸작게임이미지/본편 게임 지팡이사탕.png";
import ribbonDeco from "../../assets/졸작게임이미지/졸작게임이미지/본편 게임 리본 데코.png";
import timerBoard from "../../assets/졸작게임이미지/졸작게임이미지/본편 게임 시간 재기.png";
import arrowBubble from "../../assets/졸작게임이미지/졸작게임이미지/본편 게임 화살표 말풍선.png";
import pickerBar from "../../assets/졸작게임이미지/졸작게임이미지/모델 값 피커.png";
import pickerKnob from "../../assets/졸작게임이미지/졸작게임이미지/본편 게임 피커.png";
import readySign from "../../assets/졸작게임이미지/졸작게임이미지/준비.png";
import startSign from "../../assets/졸작게임이미지/졸작게임이미지/시작.png";
import resultBackground from "../../assets/졸작게임이미지/졸작게임이미지/본편 게임 배경 원본.png";
import resultBoard from "../../assets/졸작게임이미지/졸작게임이미지/점수결과.png";
import resultGirl from "../../assets/졸작게임이미지/졸작게임이미지/결과 화면.png";
import resultRibbon from "../../assets/졸작게임이미지/졸작게임이미지/결과 화면 리본.png";
import resultReindeer from "../../assets/졸작게임이미지/졸작게임이미지/결과 화면 순록.png";
import saveButton from "../../assets/졸작게임이미지/졸작게임이미지/크리스마스 장식 저장 버튼.png";
import rankingBackground from "../../assets/졸작게임이미지/졸작게임이미지/랭킹_화면_개발용.png";
import rankingPopup from "../../assets/졸작게임이미지/졸작게임이미지/랭킹 팝업.png";
import rankBoard1 from "../../assets/졸작게임이미지/졸작게임이미지/1등.png";
import rankBoard2 from "../../assets/졸작게임이미지/졸작게임이미지/2등.png";
import rankBoard3 from "../../assets/졸작게임이미지/졸작게임이미지/3등.png";
import rankBoardTop10 from "../../assets/졸작게임이미지/졸작게임이미지/4등~10등.png";
import rankBoardOther from "../../assets/졸작게임이미지/졸작게임이미지/논외.png";

import santaFrontIdle from "../../assets/졸작게임이미지/졸작게임이미지/santa-front-idle.gif";
import santaLeftIdle from "../../assets/졸작게임이미지/졸작게임이미지/santa-left-idle.gif";
import santaRightIdle from "../../assets/졸작게임이미지/졸작게임이미지/santa-right-idle.gif";
import santaBackIdle from "../../assets/졸작게임이미지/졸작게임이미지/santa-back-idle.gif";
import santaRunUp from "../../assets/졸작게임이미지/졸작게임이미지/santa_run_5.gif";
import santaRunLeft from "../../assets/졸작게임이미지/졸작게임이미지/santa-run-6.gif";
import santaRunRight from "../../assets/졸작게임이미지/졸작게임이미지/santa-run-7.gif";

import startButton from "../../assets/christmasGame/start-button.png";
import startButtonDisabled from "../../assets/christmasGame/start-button-disabled.png";
import howToStart from "../../assets/christmasGame/howto-start.png";
import howToGoal from "../../assets/christmasGame/howto-goal.png";
import arrowUp from "../../assets/christmasGame/arrow-up.png";
import arrowLeft from "../../assets/christmasGame/arrow-left.png";
import arrowRight from "../../assets/christmasGame/arrow-right.png";
import ornamentGreen from "../../assets/christmasGame/ornament-green.png";
import ornamentOrange from "../../assets/christmasGame/ornament-orange.png";
import ornamentRed from "../../assets/christmasGame/ornament-red.png";
import ornamentGreenOff from "../../assets/christmasGame/ornament-green-off.png";
import ornamentOrangeOff from "../../assets/christmasGame/ornament-orange-off.png";
import ornamentRedOff from "../../assets/christmasGame/ornament-red-off.png";

import type { EspLevel } from "../../hooks/useEspFeed";
import type { Direction } from "./mazeGame";

export const images = {
  lobbyBackground,
  titleLogo,
  sleigh,
  backButton,
  howToButton,
  startButton,
  startButtonDisabled,
  howToStart,
  howToGoal,
  gameBackground,
  gameFrame,
  maze,
  cottage,
  candyCane,
  ribbonDeco,
  timerBoard,
  arrowBubble,
  pickerBar,
  pickerKnob,
  readySign,
  startSign,
  resultBackground,
  resultBoard,
  resultGirl,
  resultRibbon,
  resultReindeer,
  saveButton,
  rankingBackground,
  rankingPopup,
};

export const arrowImages: Record<Direction, string> = { up: arrowUp, left: arrowLeft, right: arrowRight };

// 순위별 판: 1·2·3등, 4~10등, 그 밖(논외)
export const rankBoardImage = (rank: number) =>
  rank === 1 ? rankBoard1 : rank === 2 ? rankBoard2 : rank === 3 ? rankBoard3 : rank <= 10 ? rankBoardTop10 : rankBoardOther;

export const ornamentImages: Record<EspLevel, { on: string; off: string }> = {
  green: { on: ornamentGreen, off: ornamentGreenOff },
  orange: { on: ornamentOrange, off: ornamentOrangeOff },
  red: { on: ornamentRed, off: ornamentRedOff },
};

// 산타 GIF: 멈춰 있을 때는 마지막으로 움직인 방향을 바라보고, 한 칸 가는 동안에는 달리기 GIF를 반복
export const santaIdle = { front: santaFrontIdle, up: santaBackIdle, left: santaLeftIdle, right: santaRightIdle };
export const santaRun: Record<Direction, string> = { up: santaRunUp, left: santaRunLeft, right: santaRunRight };

// 게임 화면에 들어가기 전에 미리 받아 두면 처음 움직일 때 GIF가 끊기지 않는다
export const preloadImages = (sources: string[]) => {
  sources.forEach((src) => {
    const image = new Image();
    image.src = src;
  });
};

export const gameScreenImages = [
  gameBackground,
  gameFrame,
  maze,
  cottage,
  candyCane,
  ribbonDeco,
  timerBoard,
  arrowBubble,
  pickerBar,
  pickerKnob,
  readySign,
  startSign,
  arrowUp,
  arrowLeft,
  arrowRight,
  ...Object.values(santaIdle),
  ...Object.values(santaRun),
];
