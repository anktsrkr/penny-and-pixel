export type World = "money" | "code" | "discover" | "story";

export type RegionCode = "uk" | "us";

export type AgeBand = "3-4" | "4-5";

export type GameKind =
  | "alphabet-garden"
  | "number-nest"
  | "animal-friends"
  | "bird-watch"
  | "flower-patch"
  | "bedtime-stories"
  | "gentle-rhymes"
  | "sleepy-sequences"
  | "coin-peekaboo"
  | "coin-catcher"
  | "number-bubbles"
  | "saving-pot"
  | "count-match"
  | "tiny-shop"
  | "more-or-less"
  | "coin-sorter"
  | "giving-jar"
  | "same-different"
  | "tap-trail"
  | "sound-sequence"
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

export type PictureKey =
  | "apple"
  | "ball"
  | "cat"
  | "dog"
  | "one-flower"
  | "two-birds"
  | "three-cats"
  | "four-ducks"
  | "lion"
  | "rabbit"
  | "fish"
  | "cow"
  | "robin"
  | "duck"
  | "owl"
  | "swan"
  | "rose"
  | "sunflower"
  | "daisy"
  | "tulip";

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
  ageBands?: AgeBand[];
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
  targetPicture?: PictureKey;
  choicePictures?: Partial<Record<string, PictureKey>>;
  storyLines?: string[];
  refrain?: string;
  calmPrompt?: string;
}

export interface GameDefinition {
  id: GameKind;
  title: string;
  shortTitle: string;
  world: World;
  region?: RegionCode;
  ageBands?: AgeBand[];
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
  ageBand: AgeBand;
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
