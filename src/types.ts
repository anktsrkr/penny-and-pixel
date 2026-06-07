export type World = "money" | "code";

export type GameKind =
  | "coin-catcher"
  | "piggy-bank"
  | "count-match"
  | "step-shuffle"
  | "move-bot";

export type CoinName = "penny" | "nickel" | "dime" | "quarter";

export interface LevelDefinition {
  id: string;
  title: string;
  narrator: string;
  stars: number;
  targetCoin?: CoinName;
  targetCount?: number;
  sequence?: string[];
  shuffled?: string[];
  path?: Direction[];
}

export interface GameDefinition {
  id: GameKind;
  title: string;
  shortTitle: string;
  world: World;
  mascot: "penny" | "pixel";
  goal: string;
  color: string;
  levels: LevelDefinition[];
}

export interface RewardLedger {
  stars: number;
  coins: number;
  stickers: string[];
}

export interface ParentSettings {
  pinHash: string | null;
  dailyLimitMinutes: number;
  moneyUnlocked: boolean;
  codeUnlocked: boolean;
  audioEnabled: boolean;
}

export interface ProgressState {
  completedLevels: Record<string, string[]>;
  unlockedGames: GameKind[];
  rewards: RewardLedger;
  sessionLog: string[];
  parentSettings: ParentSettings;
}

export interface AudioCue {
  id: string;
  text: string;
  tone?: "tap" | "success" | "hint";
}

export type Direction = "up" | "right" | "down" | "left";

export interface StickerDefinition {
  id: string;
  label: string;
  cost: number;
  palette: string;
}
