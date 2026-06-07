export type World = "money" | "code";

export type RegionCode = "uk" | "us";

export type GameKind =
  | "coin-catcher"
  | "saving-pot"
  | "count-match"
  | "tiny-shop"
  | "more-or-less"
  | "coin-sorter"
  | "giving-jar"
  | "step-shuffle"
  | "move-bot"
  | "repeat-pattern"
  | "if-then-weather"
  | "bug-hunt"
  | "shape-commands";

export type DenominationId =
  | "uk-1p"
  | "uk-2p"
  | "uk-5p"
  | "uk-10p"
  | "uk-20p"
  | "uk-50p"
  | "uk-1-pound"
  | "uk-2-pound"
  | "us-penny"
  | "us-nickel"
  | "us-dime"
  | "us-quarter";

export interface MoneyDenomination {
  id: DenominationId;
  label: string;
  shortLabel: string;
  valueMinor: number;
  symbol: string;
  color: string;
  region: RegionCode;
  group: "bronze" | "silver" | "pound";
}

export interface SortGroup {
  id: string;
  label: string;
  denominationIds: DenominationId[];
}

export interface LevelDefinition {
  id: string;
  title: string;
  narrator: string;
  stars: number;
  targetDenomination?: DenominationId;
  denominations?: DenominationId[];
  targetCount?: number;
  shopItem?: string;
  priceMinor?: number;
  pileA?: DenominationId[];
  pileB?: DenominationId[];
  sortGroups?: SortGroup[];
  sequence?: string[];
  shuffled?: string[];
  path?: Direction[];
  buggyPath?: Direction[];
  condition?: string;
  choices?: string[];
  expectedChoice?: string;
  pattern?: string[];
}

export interface GameDefinition {
  id: GameKind;
  title: string;
  shortTitle: string;
  world: World;
  region?: RegionCode;
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
  region: RegionCode;
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
