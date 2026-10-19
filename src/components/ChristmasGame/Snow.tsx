// src/components/ChristmasGame/Snow.tsx

// 천천히, 여유롭게 내리는 도트 눈 (기획: "눈이 천천히 은은하게 내려오는 임팩트")

import { useEffect, useRef } from "react";
import styled from "styled-components";

const FLAKES = 90;

interface Flake {
  x: number;
  y: number;
  size: number;
  speed: number; // px/초
  drift: number; // 좌우로 흔들리는 폭
  phase: number;
  alpha: number;
}

const makeFlake = (width: number, height: number, anywhere: boolean): Flake => ({
  x: Math.random() * width,
  y: anywhere ? Math.random() * height : -10,
  size: [3, 3, 4, 4, 6][Math.floor(Math.random() * 5)],
  speed: 14 + Math.random() * 22,
  drift: 6 + Math.random() * 14,
  phase: Math.random() * Math.PI * 2,
  alpha: 0.45 + Math.random() * 0.45,
});

export default function Snow({ width, height }: { width: number; height: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const flakes = Array.from({ length: FLAKES }, () => makeFlake(width, height, true));
    let last = performance.now();
    let frame = 0;

    const draw = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < flakes.length; i++) {
        const flake = flakes[i];
        flake.y += flake.speed * dt;
        flake.phase += dt * 0.6;
        if (flake.y > height + 10) flakes[i] = makeFlake(width, height, false);
        const x = Math.round(flake.x + Math.sin(flake.phase) * flake.drift);
        ctx.fillStyle = `rgba(255, 255, 255, ${flake.alpha})`;
        ctx.fillRect(x, Math.round(flake.y), flake.size, flake.size);
      }
      frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [width, height]);

  return <SnowCanvas ref={canvasRef} width={width} height={height} aria-hidden="true" />;
}

const SnowCanvas = styled.canvas`
  position: absolute;
  inset: 0;
  z-index: 50;
  pointer-events: none;
  image-rendering: pixelated;
`;
