import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import type { DenominationId, MoneyDenomination, PictureKey, StickerDefinition } from "../types";
import { getDenomination } from "../data/money";

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

export function CoinVisual({ denomination, size = "large" }: { denomination: DenominationId | MoneyDenomination; size?: "small" | "large" }) {
  const coin = typeof denomination === "string" ? getDenomination(denomination) : denomination;
  return (
    <span className={`coin-visual coin-${size}`} style={{ background: coin.color }} aria-label={coin.label}>
      <span>{coin.symbol}</span>
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

export function PictureArt({ picture, label, compact = false }: { picture: PictureKey; label?: string; compact?: boolean }) {
  return (
    <svg className={`picture-art ${compact ? "compact" : ""}`} viewBox="0 0 160 130" role={label ? "img" : undefined} aria-label={label}>
      <rect x="8" y="8" width="144" height="114" rx="18" fill="#fff8e7" stroke="#2f2933" strokeWidth="5" />
      {renderPicture(picture)}
    </svg>
  );
}

function renderPicture(picture: PictureKey) {
  if (picture === "apple") return <><circle cx="78" cy="72" r="32" fill="#e95d3f" /><circle cx="96" cy="72" r="30" fill="#e95d3f" /><path d="M88 42c5-17 18-19 27-15-7 9-16 15-27 15z" fill="#7bd389" /><path d="M87 44c-5-13 1-21 8-27" stroke="#5b3b24" strokeWidth="7" strokeLinecap="round" /></>;
  if (picture === "ball") return <><circle cx="80" cy="70" r="38" fill="#73d4f3" stroke="#2f2933" strokeWidth="5" /><path d="M45 70h70M80 32c15 18 15 55 0 76M80 32c-15 18-15 55 0 76" stroke="#fffdf6" strokeWidth="7" strokeLinecap="round" /></>;
  if (picture === "cat") return <AnimalFace fill="#f59f00" ears="point" />;
  if (picture === "dog") return <><AnimalFace fill="#b87945" ears="flop" /><circle cx="80" cy="83" r="8" fill="#2f2933" /></>;
  if (picture === "lion") return <><circle cx="80" cy="68" r="47" fill="#ffb703" /><circle cx="80" cy="68" r="31" fill="#ffd166" /><AnimalDetails /></>;
  if (picture === "rabbit") return <><ellipse cx="64" cy="37" rx="12" ry="30" fill="#fffdf6" stroke="#2f2933" strokeWidth="5" /><ellipse cx="96" cy="37" rx="12" ry="30" fill="#fffdf6" stroke="#2f2933" strokeWidth="5" /><AnimalFace fill="#fffdf6" /></>;
  if (picture === "fish") return <><ellipse cx="76" cy="70" rx="40" ry="26" fill="#63d2ff" stroke="#2f2933" strokeWidth="5" /><path d="M113 70l28-24v48z" fill="#63d2ff" stroke="#2f2933" strokeWidth="5" /><circle cx="62" cy="63" r="5" fill="#2f2933" /></>;
  if (picture === "cow") return <><AnimalFace fill="#fffdf6" /><path d="M51 58c11-18 27-15 29 1-13 4-23 3-29-1zM92 83c8-18 24-18 32-5-8 10-20 11-32 5z" fill="#2f2933" /></>;
  if (picture === "robin") return <BirdArt body="#7f5539" chest="#e95d3f" />;
  if (picture === "duck") return <BirdArt body="#ffd43b" chest="#fff8e7" beak="#ff9f43" />;
  if (picture === "owl") return <><circle cx="80" cy="67" r="40" fill="#7f5539" stroke="#2f2933" strokeWidth="5" /><circle cx="65" cy="62" r="13" fill="#fffdf6" /><circle cx="95" cy="62" r="13" fill="#fffdf6" /><circle cx="65" cy="62" r="5" fill="#2f2933" /><circle cx="95" cy="62" r="5" fill="#2f2933" /><path d="M80 72l10 12H70z" fill="#ffb703" /></>;
  if (picture === "swan") return <><path d="M45 88c20 21 72 18 88-8-24-9-44-8-58 4-9-15 9-35 21-43" fill="#fffdf6" stroke="#2f2933" strokeWidth="5" strokeLinecap="round" /><circle cx="98" cy="41" r="8" fill="#fffdf6" stroke="#2f2933" strokeWidth="5" /><path d="M105 42h16" stroke="#ff9f43" strokeWidth="7" strokeLinecap="round" /></>;
  if (picture === "rose") return <FlowerArt petals="#e64980" center="#ffd43b" />;
  if (picture === "sunflower") return <FlowerArt petals="#ffca3a" center="#7f5539" />;
  if (picture === "daisy") return <FlowerArt petals="#fffdf6" center="#ffd43b" />;
  if (picture === "tulip") return <><path d="M80 104V72" stroke="#36a269" strokeWidth="7" strokeLinecap="round" /><path d="M80 75c-24-14-27-41-16-52 8 12 16 12 26 0 11 13 10 41-10 52z" fill="#f783ac" stroke="#2f2933" strokeWidth="5" /></>;
  if (picture === "one-flower") return <MiniGroup items={["rose"]} />;
  if (picture === "two-birds") return <MiniGroup items={["robin", "duck"]} />;
  if (picture === "three-cats") return <MiniGroup items={["cat", "cat", "cat"]} />;
  return <MiniGroup items={["duck", "duck", "duck", "duck"]} />;
}

function AnimalFace({ fill, ears = "round" }: { fill: string; ears?: "round" | "point" | "flop" }) {
  return (
    <>
      {ears === "point" ? <><path d="M50 50l15-28 15 29z" fill={fill} stroke="#2f2933" strokeWidth="5" /><path d="M92 51l15-29 15 28z" fill={fill} stroke="#2f2933" strokeWidth="5" /></> : null}
      {ears === "flop" ? <><ellipse cx="48" cy="57" rx="13" ry="28" fill={fill} stroke="#2f2933" strokeWidth="5" /><ellipse cx="112" cy="57" rx="13" ry="28" fill={fill} stroke="#2f2933" strokeWidth="5" /></> : null}
      <circle cx="80" cy="70" r="38" fill={fill} stroke="#2f2933" strokeWidth="5" />
      <AnimalDetails />
    </>
  );
}

function AnimalDetails() {
  return <><circle cx="66" cy="64" r="5" fill="#2f2933" /><circle cx="94" cy="64" r="5" fill="#2f2933" /><path d="M80 72l-8 8h16z" fill="#2f2933" /><path d="M66 91c12 8 36 8 48 0" stroke="#2f2933" strokeWidth="5" strokeLinecap="round" fill="none" /></>;
}

function BirdArt({ body, chest, beak = "#ffb703" }: { body: string; chest: string; beak?: string }) {
  return <><ellipse cx="78" cy="72" rx="38" ry="34" fill={body} stroke="#2f2933" strokeWidth="5" /><ellipse cx="88" cy="82" rx="20" ry="18" fill={chest} /><circle cx="67" cy="61" r="5" fill="#2f2933" /><path d="M45 65L27 57l18-9" fill={beak} stroke="#2f2933" strokeWidth="4" /><path d="M88 101v14M64 101v14" stroke="#2f2933" strokeWidth="5" strokeLinecap="round" /></>;
}

function FlowerArt({ petals, center }: { petals: string; center: string }) {
  return <><path d="M80 104V77" stroke="#36a269" strokeWidth="7" strokeLinecap="round" /><circle cx="80" cy="58" r="14" fill={center} stroke="#2f2933" strokeWidth="4" />{[0, 60, 120, 180, 240, 300].map((angle) => <ellipse key={angle} cx="80" cy="58" rx="14" ry="27" fill={petals} stroke="#2f2933" strokeWidth="4" transform={`rotate(${angle} 80 58)`} />)}<circle cx="80" cy="58" r="12" fill={center} /></>;
}

function MiniGroup({ items }: { items: PictureKey[] }) {
  const positions = [[80, 70], [54, 72], [106, 72], [80, 42]];
  return <>{items.map((item, index) => <g key={`${item}-${index}`} transform={`translate(${positions[index][0] - 80} ${positions[index][1] - 70}) scale(.58)`}>{renderPicture(item)}</g>)}</>;
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
