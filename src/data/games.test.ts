import { describe, expect, it } from "vitest";
import { getGamesForProfile, getGamesForRegion } from "./games";
import { getDenominationsForRegion } from "./money";

describe("MVP game content", () => {
  it("ships UK denominations by default", () => {
    expect(getDenominationsForRegion("uk").map((coin) => coin.shortLabel)).toEqual(["1p", "2p", "5p", "10p", "20p", "50p", "\u00A31", "\u00A32"]);
  });

  it("filters money content by region while keeping coding games", () => {
    const ukGames = getGamesForRegion("uk");
    const usGames = getGamesForRegion("us");

    expect(ukGames.filter((game) => game.world === "money")).toHaveLength(9);
    expect(ukGames.filter((game) => game.world === "code")).toHaveLength(9);
    expect(ukGames.filter((game) => game.world === "discover")).toHaveLength(5);
    expect(ukGames.filter((game) => game.world === "story")).toHaveLength(3);
    expect(usGames.find((game) => game.id === "coin-catcher")?.levels[0].targetDenomination).toBe("us-penny");
  });

  it("offers a simpler 3-4 profile with starter games", () => {
    const starterGames = getGamesForProfile("uk", "3-4");
    const olderGames = getGamesForProfile("uk", "4-5");

    expect(starterGames.map((game) => game.id)).toContain("coin-peekaboo");
    expect(starterGames.map((game) => game.id)).toContain("alphabet-garden");
    expect(starterGames.map((game) => game.id)).toContain("bedtime-stories");
    expect(starterGames.map((game) => game.id)).toContain("gentle-rhymes");
    expect(starterGames.map((game) => game.id)).toContain("animal-friends");
    expect(starterGames.map((game) => game.id)).toContain("same-different");
    expect(starterGames.map((game) => game.id)).not.toContain("bug-hunt");
    expect(olderGames.length).toBeGreaterThan(starterGames.length);
  });

  it("keeps levels within the planned small action range", () => {
    for (const game of getGamesForProfile("uk", "4-5")) {
      expect(game.levels.length).toBeGreaterThanOrEqual(4);
      for (const level of game.levels) {
        const actionCount = level.path?.length ?? level.sequence?.length ?? level.targetCount ?? level.choices?.length ?? 3;
        expect(actionCount).toBeGreaterThanOrEqual(1);
        expect(actionCount).toBeLessThanOrEqual(10);
      }
    }
  });
});
