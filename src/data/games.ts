import type { AgeBand, GameDefinition, RegionCode, StickerDefinition } from "../types";
import { codingGames } from "./coding";
import { discoveryGames } from "./discovery";
import { createMoneyGames } from "./money";
import { storyGames } from "./stories";

export function getGamesForRegion(region: RegionCode = "uk"): GameDefinition[] {
  return [...storyGames, ...discoveryGames, ...createMoneyGames(region), ...codingGames];
}

export function getGamesForProfile(region: RegionCode = "uk", ageBand: AgeBand = "4-5"): GameDefinition[] {
  return getGamesForRegion(region)
    .filter((game) => !game.ageBands || game.ageBands.includes(ageBand))
    .map((game) => ({
      ...game,
      levels: game.levels.filter((level) => !level.ageBands || level.ageBands.includes(ageBand))
    }))
    .filter((game) => game.levels.length > 0);
}

export const games = getGamesForRegion("uk");

export function getGame(gameId: string | undefined, region: RegionCode = "uk", ageBand: AgeBand = "4-5") {
  return getGamesForProfile(region, ageBand).find((game) => game.id === gameId);
}

export const stickers: StickerDefinition[] = [
  { id: "rainbow-star", label: "Rainbow Star", cost: 2, palette: "#ffcf5a" },
  { id: "rocket", label: "Rocket", cost: 3, palette: "#73d4f3" },
  { id: "garden", label: "Garden", cost: 4, palette: "#7bd389" },
  { id: "party-hat", label: "Party Hat", cost: 5, palette: "#f184a3" },
  { id: "moon", label: "Moon", cost: 6, palette: "#7f77dd" },
  { id: "bus-pass", label: "Bus Pass", cost: 7, palette: "#e95d3f" },
  { id: "tea-cup", label: "Tea Cup", cost: 8, palette: "#20c997" },
  { id: "bubble", label: "Bubble", cost: 3, palette: "#63d2ff" },
  { id: "kite", label: "Kite", cost: 5, palette: "#74c0fc" },
  { id: "music-note", label: "Music Note", cost: 4, palette: "#ffd43b" }
];

export function levelKey(gameId: string, levelId: string) {
  return `${gameId}:${levelId}`;
}
