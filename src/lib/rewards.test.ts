import { describe, expect, it } from "vitest";
import { stickers } from "../data/games";
import { buySticker, completeLevel, completionPercent, createInitialProgress } from "./rewards";

describe("reward logic", () => {
  it("adds stars and virtual coins once per completed level", () => {
    const initial = createInitialProgress();
    const once = completeLevel(initial, "coin-catcher", "cc-1", 2);
    const twice = completeLevel(once, "coin-catcher", "cc-1", 2);

    expect(once.rewards.stars).toBe(2);
    expect(once.rewards.coins).toBe(2);
    expect(twice.rewards.stars).toBe(2);
    expect(twice.completedLevels["coin-catcher"]).toEqual(["cc-1"]);
  });

  it("spends coins only when a sticker is affordable and new", () => {
    const progress = {
      ...createInitialProgress(),
      rewards: { stars: 5, coins: 5, stickers: [] }
    };
    const sticker = stickers[0];
    const bought = buySticker(progress, sticker.id, sticker.cost);
    const duplicate = buySticker(bought, sticker.id, sticker.cost);

    expect(bought.rewards.stickers).toContain(sticker.id);
    expect(bought.rewards.coins).toBe(5 - sticker.cost);
    expect(duplicate.rewards).toEqual(bought.rewards);
  });

  it("reports completion percentage across all MVP levels", () => {
    const progress = completeLevel(createInitialProgress(), "move-bot", "mb-1", 2);
    expect(completionPercent(progress)).toBeGreaterThan(0);
  });
});
