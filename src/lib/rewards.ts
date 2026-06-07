import type { GameKind, ProgressState } from "../types";
import { games } from "../data/games";

export const defaultUnlockedGames: GameKind[] = [
  "coin-catcher",
  "piggy-bank",
  "count-match",
  "step-shuffle",
  "move-bot"
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
      audioEnabled: true
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

export function completionPercent(state: ProgressState) {
  const total = games.reduce((sum, game) => sum + game.levels.length, 0);
  const complete = games.reduce((sum, game) => sum + (state.completedLevels[game.id]?.length ?? 0), 0);
  return total === 0 ? 0 : Math.round((complete / total) * 100);
}
