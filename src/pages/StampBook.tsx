import { Sparkles } from "lucide-react";
import { AudioButton } from "../components/controls";
import { StickerArt } from "../components/visuals";
import { stickers } from "../data/games";
import { useProgressStore } from "../store/progressStore";

export function StampBook() {
  const progress = useProgressStore((state) => state.progress);
  const buySticker = useProgressStore((state) => state.buySticker);

  return (
    <section>
      <div className="section-heading">
        <div>
          <p className="eyebrow">Stamp Book</p>
          <h1>Collect stickers</h1>
          <p className="page-note">Stars turn into pretend coins. Coins unlock stickers.</p>
        </div>
        <div className="coin-balance">
          <strong>{progress.rewards.coins}</strong>
          <span>coins</span>
        </div>
      </div>

      <div className="sticker-grid">
        {stickers.map((sticker) => {
          const owned = progress.rewards.stickers.includes(sticker.id);
          const canBuy = progress.rewards.coins >= sticker.cost && !owned;
          return (
            <div key={sticker.id} className={`sticker-card ${owned ? "owned" : ""}`}>
              <StickerArt sticker={sticker} />
              <h2>{sticker.label}</h2>
              <p>{owned ? "In your book" : `${sticker.cost} coins`}</p>
              <AudioButton
                className="child-button"
                cue={{
                  id: `sticker-${sticker.id}`,
                  text: owned ? `${sticker.label} is in your stamp book.` : canBuy ? `Add ${sticker.label}.` : "Play more levels to earn coins.",
                  tone: owned || canBuy ? "success" : "hint"
                }}
                disabled={!canBuy}
                onClick={() => buySticker(sticker.id, sticker.cost)}
              >
                <Sparkles aria-hidden="true" />
                {owned ? "Added" : "Add"}
              </AudioButton>
            </div>
          );
        })}
      </div>
    </section>
  );
}
