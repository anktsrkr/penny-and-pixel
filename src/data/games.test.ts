import { describe, expect, it } from "vitest";
import { getGamesForRegion } from "./games";
import { getDenominationsForRegion } from "./money";

describe("MVP game content", () => {
  it("ships UK denominations by default", () => {
    expect(getDenominationsForRegion("uk").map((coin) => coin.shortLabel)).toEqual(["1p", "2p", "5p", "10p", "20p", "50p", "£1", "£2"]);
  });

  it("filters money content by region while keeping coding games", () => {
    const ukGames = getGamesForRegion("uk");
    const usGames = getGamesForRegion("us");

    expect(ukGames.filter((game) => game.world === "money")).toHaveLength(7);
    expect(ukGames.filter((game) => game.world === "code")).toHaveLength(6);
    expect(usGames.find((game) => game.id === "coin-catcher")?.levels[0].targetDenomination).toBe("us-penny");
  });

  it("keeps early levels within the planned small action range", () => {
    for (const game of getGamesForRegion("uk")) {
      expect(game.levels.length).toBeGreaterThanOrEqual(4);
      for (const level of game.levels) {
        const actionCount = level.path?.length ?? level.sequence?.length ?? level.targetCount ?? level.choices?.length ?? 3;
        expect(actionCount).toBeGreaterThanOrEqual(2);
        expect(actionCount).toBeLessThanOrEqual(10);
      }
    }
  });
});
