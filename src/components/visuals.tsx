import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import type { CoinName, StickerDefinition } from "../types";
import { coins } from "../data/games";

export function Mascot({ type, mood = "happy" }: { type: "penny" | "pixel"; mood?: "happy" | "proud" | "thinking" }) {
  return (
    <motion.div
      className={`mascot mascot-${type}`}
      aria-label={type === "penny" ? "Penny the piglet" : "Pixel the robot"}
      initial={{ y: 0 }}
      animate={{ y: [0, -7, 0] }}
      transition={{ duration: mood === "proud" ? 1.2 : 2.4, repeat: Infinity, ease: "easeInOut" }}
    >
      {type === "penny" ? <PennyFace /> : <PixelFace />}
    </motion.div>
  );
}

function PennyFace() {
  return (
    <svg viewBox="0 0 180 160" role="img" aria-hidden="true">
      <path d="M36 54c-12-23 3-39 28-19" fill="#ff8aaa" />
      <path d="M144 54c12-23-3-39-28-19" fill="#ff8aaa" />
      <circle cx="90" cy="82" r="58" fill="#ff8aaa" />
      <circle cx="69" cy="72" r="7" fill="#3d2d3d" />
      <circle cx="111" cy="72" r="7" fill="#3d2d3d" />
      <ellipse cx="90" cy="96" rx="30" ry="22" fill="#ffb1c8" />
      <circle cx="79" cy="96" r="6" fill="#3d2d3d" />
      <circle cx="101" cy="96" r="6" fill="#3d2d3d" />
      <path d="M72 122c13 10 43 10 56 0" stroke="#3d2d3d" strokeWidth="7" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function PixelFace() {
  return (
    <svg viewBox="0 0 180 160" role="img" aria-hidden="true">
      <path d="M90 28V13" stroke="#3d2d3d" strokeWidth="8" strokeLinecap="round" />
      <circle cx="90" cy="11" r="9" fill="#3d2d3d" />
      <rect x="42" y="30" width="96" height="104" rx="24" fill="#73d4f3" />
      <rect x="62" y="56" width="56" height="38" rx="14" fill="#fff8e7" />
      <circle cx="78" cy="75" r="6" fill="#3d2d3d" />
      <circle cx="102" cy="75" r="6" fill="#3d2d3d" />
      <path d="M73 108h34" stroke="#3d2d3d" strokeWidth="8" strokeLinecap="round" />
      <path d="M42 74H25M138 74h17" stroke="#3d2d3d" strokeWidth="8" strokeLinecap="round" />
    </svg>
  );
}

export function CoinVisual({ name, size = "large" }: { name: CoinName; size?: "small" | "large" }) {
  const coin = coins[name];
  return (
    <span className={`coin-visual coin-${size}`} style={{ background: coin.color }} aria-label={coin.label}>
      <span>{coin.value}</span>
    </span>
  );
}

export function StickerArt({ sticker }: { sticker: StickerDefinition }) {
  return (
    <svg className="sticker-art" viewBox="0 0 120 120" aria-hidden="true">
      <rect x="14" y="14" width="92" height="92" rx="18" fill={sticker.palette} />
      <path d="M60 25l10 22 24 3-18 16 5 23-21-12-21 12 5-23-18-16 24-3z" fill="#fff8e7" />
      <circle cx="45" cy="58" r="5" fill="#3d2d3d" />
      <circle cx="75" cy="58" r="5" fill="#3d2d3d" />
      <path d="M48 75c9 7 25 7 34 0" stroke="#3d2d3d" strokeWidth="6" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function ConfettiBurst({ show }: { show: boolean }) {
  if (!show) {
    return null;
  }

  return (
    <div className="confetti" aria-hidden="true">
      {Array.from({ length: 18 }).map((_, index) => (
        <motion.span
          key={index}
          style={{ "--x": `${(index % 6) * 22 - 55}px`, "--c": confettiColors[index % confettiColors.length] } as CSSProperties}
          initial={{ opacity: 0, y: 20, scale: 0.6 }}
          animate={{ opacity: [0, 1, 0], y: [-8, -90 - (index % 3) * 18], x: (index % 6) * 24 - 60, scale: [0.8, 1, 0.8] }}
          transition={{ duration: 1.1, delay: index * 0.02 }}
        />
      ))}
    </div>
  );
}

const confettiColors = ["#ffcf5a", "#e95d3f", "#73d4f3", "#7bd389", "#7f77dd"];
