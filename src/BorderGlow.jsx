import React, { useCallback, useEffect, useRef } from "react";
import "./BorderGlow.css";

const gradientPositions = ["80% 55%", "69% 34%", "8% 6%", "41% 38%", "86% 85%", "82% 18%", "51% 4%"];
const gradientKeys = ["--gradient-one", "--gradient-two", "--gradient-three", "--gradient-four", "--gradient-five", "--gradient-six", "--gradient-seven"];
const colorMap = [0, 1, 2, 0, 1, 2, 1];

function parseHSL(value) {
  const match = value.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/);
  if (!match) return { h: 40, s: 80, l: 80 };
  return { h: Number(match[1]), s: Number(match[2]), l: Number(match[3]) };
}

function buildGlowVars(glowColor, intensity) {
  const { h, s, l } = parseHSL(glowColor);
  const opacities = [100, 60, 50, 40, 30, 20, 10];
  const keys = ["", "-60", "-50", "-40", "-30", "-20", "-10"];
  return Object.fromEntries(opacities.map((opacity, index) => [
    `--glow-color${keys[index]}`,
    `hsl(${h}deg ${s}% ${l}% / ${Math.min(opacity * intensity, 100)}%)`,
  ]));
}

function buildGradientVars(colors) {
  const vars = {};
  gradientPositions.forEach((position, index) => {
    const color = colors[Math.min(colorMap[index], colors.length - 1)];
    vars[gradientKeys[index]] = `radial-gradient(at ${position}, ${color} 0px, transparent 50%)`;
  });
  vars["--gradient-base"] = `linear-gradient(${colors[0]} 0 100%)`;
  return vars;
}

const easeOutCubic = (x) => 1 - Math.pow(1 - x, 3);
const easeInCubic = (x) => x * x * x;

function animateValue({ start = 0, end = 100, duration = 1000, delay = 0, ease = easeOutCubic, onUpdate, onEnd }) {
  let frame = 0;
  const timeout = window.setTimeout(() => {
    const startedAt = performance.now();
    const tick = () => {
      const progress = Math.min((performance.now() - startedAt) / duration, 1);
      onUpdate(start + (end - start) * ease(progress));
      if (progress < 1) frame = window.requestAnimationFrame(tick);
      else onEnd?.();
    };
    frame = window.requestAnimationFrame(tick);
  }, delay);
  return () => {
    window.clearTimeout(timeout);
    window.cancelAnimationFrame(frame);
  };
}

export default function BorderGlow({
  children,
  className = "",
  edgeSensitivity = 30,
  glowColor = "40 80 80",
  backgroundColor = "#120f17",
  borderRadius = 4,
  glowRadius = 40,
  glowIntensity = 1,
  coneSpread = 25,
  animated = false,
  colors = ["#c084fc", "#f472b6", "#38bdf8"],
  fillOpacity = 0.5,
}) {
  const cardRef = useRef(null);

  const handlePointerMove = useCallback((event) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const dx = x - centerX;
    const dy = y - centerY;
    const kx = dx === 0 ? Infinity : centerX / Math.abs(dx);
    const ky = dy === 0 ? Infinity : centerY / Math.abs(dy);
    const edge = Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
    let angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
    if (angle < 0) angle += 360;
    card.style.setProperty("--edge-proximity", (edge * 100).toFixed(3));
    card.style.setProperty("--cursor-angle", `${angle.toFixed(3)}deg`);
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    if (!animated || !card) return undefined;
    const cleanups = [];
    const angleStart = 110;
    const angleEnd = 465;
    card.classList.add("sweep-active");
    card.style.setProperty("--cursor-angle", `${angleStart}deg`);
    cleanups.push(animateValue({ duration: 500, onUpdate: (value) => card.style.setProperty("--edge-proximity", value) }));
    cleanups.push(animateValue({ ease: easeInCubic, duration: 1500, end: 50, onUpdate: (value) => card.style.setProperty("--cursor-angle", `${(angleEnd - angleStart) * (value / 100) + angleStart}deg`) }));
    cleanups.push(animateValue({ ease: easeOutCubic, delay: 1500, duration: 2250, start: 50, end: 100, onUpdate: (value) => card.style.setProperty("--cursor-angle", `${(angleEnd - angleStart) * (value / 100) + angleStart}deg`) }));
    cleanups.push(animateValue({ ease: easeInCubic, delay: 2500, duration: 1500, start: 100, end: 0, onUpdate: (value) => card.style.setProperty("--edge-proximity", value), onEnd: () => card.classList.remove("sweep-active") }));
    return () => {
      cleanups.forEach((cleanup) => cleanup());
      card.classList.remove("sweep-active");
    };
  }, [animated]);

  return (
    <div
      className={`border-glow-card ${className}`}
      onPointerMove={handlePointerMove}
      ref={cardRef}
      style={{
        "--card-bg": backgroundColor,
        "--edge-sensitivity": edgeSensitivity,
        "--border-radius": `${borderRadius}px`,
        "--glow-padding": `${glowRadius}px`,
        "--cone-spread": coneSpread,
        "--fill-opacity": fillOpacity,
        ...buildGlowVars(glowColor, glowIntensity),
        ...buildGradientVars(colors),
      }}
    >
      <span className="edge-light" />
      <div className="border-glow-inner">{children}</div>
    </div>
  );
}