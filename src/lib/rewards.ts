import type { GameKind, ProgressState, RegionCode } from "../types";
import { getGamesForRegion } from "../data/games";

export const defaultUnlockedGames: GameKind[] = [
  "coin-catcher",
  "saving-pot",
  "count-match",
  "tiny-shop",
  "more-or-less",
  "coin-sorter",
  "giving-jar",
  "step-shuffle",
  "move-bot",
  "repeat-pattern",
  "if-then-weather",
  "bug-hunt",
  "shape-commands"
];

export function createInitialProgress(): ProgressState {
  return {
    completedLevels: {},
    unlockedGames: defaultUnlockedGames,
    rewards: {
      stars: 0,
      coins: 0,
      stickers: []
    },
    sessionLog: [new Date().toISOString()],
    parentSettings: {
      pinHash: null,
      dailyLimitMinutes: 10,
      moneyUnlocked: true,
      codeUnlocked: true,
      audioEnabled: true,
      region: "uk"
    }
  };
}

export function normalizeProgress(progress: ProgressState): ProgressState {
  const defaults = createInitialProgress();
  return {
    ...defaults,
    ...progress,
    unlockedGames: progress.unlockedGames?.length ? progress.unlockedGames : defaultUnlockedGames,
    rewards: {
      ...defaults.rewards,
      ...progress.rewards
    },
    parentSettings: {
      ...defaults.parentSettings,
      ...progress.parentSettings
    }
  };
}

export function completeLevel(state: ProgressState, gameId: GameKind, levelId: string, stars: number): ProgressState {
  const current = state.completedLevels[gameId] ?? [];
  if (current.includes(levelId)) {
    return state;
  }

  return {
    ...state,
    completedLevels: {
      ...state.completedLevels,
      [gameId]: [...current, levelId]
    },
    rewards: {
      ...state.rewards,
      stars: state.rewards.stars + stars,
      coins: state.rewards.coins + stars
    }
  };
}

export function buySticker(state: ProgressState, stickerId: string, cost: number): ProgressState {
  if (state.rewards.stickers.includes(stickerId) || state.rewards.coins < cost) {
    return state;
  }

  return {
    ...state,
    rewards: {
      stars: state.rewards.stars,
      coins: state.rewards.coins - cost,
      stickers: [...state.rewards.stickers, stickerId]
    }
  };
}

export function completionPercent(state: ProgressState, region: RegionCode = state.parentSettings.region) {
  const games = getGamesForRegion(region);
  const total = games.reduce((sum, game) => sum + game.levels.length, 0);
  const complete = games.reduce((sum, game) => sum + (state.completedLevels[game.id]?.length ?? 0), 0);
  return total === 0 ? 0 : Math.round((complete / total) * 100);
}
