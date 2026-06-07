import type { CoinName, GameDefinition, StickerDefinition } from "../types";

export const coins: Record<CoinName, { label: string; value: number; color: string }> = {
  penny: { label: "Penny", value: 1, color: "#d46d3d" },
  nickel: { label: "Nickel", value: 5, color: "#a9b0b7" },
  dime: { label: "Dime", value: 10, color: "#c7d0d8" },
  quarter: { label: "Quarter", value: 25, color: "#8e9aa6" }
};

export const games: GameDefinition[] = [
  {
    id: "coin-catcher",
    title: "Coin Catcher",
    shortTitle: "Catch",
    world: "money",
    mascot: "penny",
    goal: "Hear the coin name, then tap the matching coin.",
    color: "#e95d3f",
    levels: [
      { id: "cc-1", title: "Find the penny", narrator: "Tap the penny.", stars: 2, targetCoin: "penny" },
      { id: "cc-2", title: "Find the nickel", narrator: "Tap the nickel.", stars: 2, targetCoin: "nickel" },
      { id: "cc-3", title: "Find the dime", narrator: "Tap the dime.", stars: 3, targetCoin: "dime" }
    ]
  },
  {
    id: "piggy-bank",
    title: "Piggy Bank",
    shortTitle: "Save",
    world: "money",
    mascot: "penny",
    goal: "Drag every coin into the bank to save.",
    color: "#f184a3",
    levels: [
      { id: "pb-1", title: "Save 3 coins", narrator: "Drag three coins into the bank.", stars: 2, targetCount: 3 },
      { id: "pb-2", title: "Save 4 coins", narrator: "Drag four coins into the bank.", stars: 3, targetCount: 4 },
      { id: "pb-3", title: "Save 5 coins", narrator: "Drag five coins into the bank.", stars: 3, targetCount: 5 }
    ]
  },
  {
    id: "count-match",
    title: "Count & Match",
    shortTitle: "Count",
    world: "money",
    mascot: "penny",
    goal: "Count the coins, then tap the matching number.",
    color: "#36a269",
    levels: [
      { id: "cm-1", title: "Count to 3", narrator: "Count the coins. Tap three.", stars: 2, targetCount: 3 },
      { id: "cm-2", title: "Count to 4", narrator: "Count the coins. Tap four.", stars: 2, targetCount: 4 },
      { id: "cm-3", title: "Count to 5", narrator: "Count the coins. Tap five.", stars: 3, targetCount: 5 }
    ]
  },
  {
    id: "step-shuffle",
    title: "Step Shuffle",
    shortTitle: "Steps",
    world: "code",
    mascot: "pixel",
    goal: "Drag the picture cards into the right order.",
    color: "#7f77dd",
    levels: [
      {
        id: "ss-1",
        title: "Morning steps",
        narrator: "Put wake, eat, hop in order.",
        stars: 2,
        sequence: ["Wake", "Eat", "Hop"],
        shuffled: ["Eat", "Hop", "Wake"]
      },
      {
        id: "ss-2",
        title: "Garden steps",
        narrator: "Put seed, water, flower in order.",
        stars: 3,
        sequence: ["Seed", "Water", "Flower"],
        shuffled: ["Flower", "Seed", "Water"]
      }
    ]
  },
  {
    id: "move-bot",
    title: "Move Bot",
    shortTitle: "Move",
    world: "code",
    mascot: "pixel",
    goal: "Build the arrows that guide Pixel to the star.",
    color: "#248bd6",
    levels: [
      { id: "mb-1", title: "Two steps", narrator: "Move right, then down.", stars: 2, path: ["right", "down"] },
      { id: "mb-2", title: "Three steps", narrator: "Move right, right, then down.", stars: 3, path: ["right", "right", "down"] },
      { id: "mb-3", title: "Turn around", narrator: "Move down, right, then up.", stars: 3, path: ["down", "right", "up"] }
    ]
  }
];

export const stickers: StickerDefinition[] = [
  { id: "rainbow-star", label: "Rainbow Star", cost: 2, palette: "#ffcf5a" },
  { id: "rocket", label: "Rocket", cost: 3, palette: "#73d4f3" },
  { id: "garden", label: "Garden", cost: 4, palette: "#7bd389" },
  { id: "party-hat", label: "Party Hat", cost: 5, palette: "#f184a3" },
  { id: "moon", label: "Moon", cost: 6, palette: "#7f77dd" }
];

export function getGame(gameId: string | undefined) {
  return games.find((game) => game.id === gameId);
}

export function levelKey(gameId: string, levelId: string) {
  return `${gameId}:${levelId}`;
}
