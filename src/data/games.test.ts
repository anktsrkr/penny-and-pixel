import { describe, expect, it } from "vitest";
import { games } from "./games";

describe("MVP game content", () => {
  it("ships the balanced three money and two coding games", () => {
    expect(games.filter((game) => game.world === "money")).toHaveLength(3);
    expect(games.filter((game) => game.world === "code")).toHaveLength(2);
  });

  it("keeps early levels within the planned small action range", () => {
    for (const game of games) {
      expect(game.levels.length).toBeGreaterThanOrEqual(2);
      for (const level of game.levels) {
        const actionCount = level.path?.length ?? level.sequence?.length ?? level.targetCount ?? 3;
        expect(actionCount).toBeGreaterThanOrEqual(2);
        expect(actionCount).toBeLessThanOrEqual(5);
      }
    }
  });
});
