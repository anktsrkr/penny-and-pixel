import { create } from "zustand";
import type { GameKind, ParentSettings, ProgressState } from "../types";
import { buySticker as buyStickerPure, completeLevel as completeLevelPure, createInitialProgress, normalizeProgress } from "../lib/rewards";
import { loadProgress, saveProgress } from "../lib/storage";
import { setAudioEnabled } from "../lib/audio";

interface ProgressStore {
  progress: ProgressState;
  hydrated: boolean;
  hydrate: () => Promise<void>;
  completeLevel: (gameId: GameKind, levelId: string, stars: number) => void;
  buySticker: (stickerId: string, cost: number) => void;
  updateParentSettings: (settings: Partial<ParentSettings>) => void;
  logSession: () => void;
}

function persist(progress: ProgressState) {
  void saveProgress(progress);
  setAudioEnabled(progress.parentSettings.audioEnabled);
}

export const useProgressStore = create<ProgressStore>((set, get) => ({
  progress: createInitialProgress(),
  hydrated: false,
  hydrate: async () => {
    const stored = await loadProgress();
    const progress = stored ? normalizeProgress(stored) : createInitialProgress();
    setAudioEnabled(progress.parentSettings.audioEnabled);
    set({ progress, hydrated: true });
    await saveProgress(progress);
  },
  completeLevel: (gameId, levelId, stars) => {
    const progress = completeLevelPure(get().progress, gameId, levelId, stars);
    set({ progress });
    persist(progress);
  },
  buySticker: (stickerId, cost) => {
    const progress = buyStickerPure(get().progress, stickerId, cost);
    set({ progress });
    persist(progress);
  },
  updateParentSettings: (settings) => {
    const progress = {
      ...get().progress,
      parentSettings: {
        ...get().progress.parentSettings,
        ...settings
      }
    };
    set({ progress });
    persist(progress);
  },
  logSession: () => {
    const today = new Date().toISOString();
    const progress = {
      ...get().progress,
      sessionLog: [...get().progress.sessionLog, today].slice(-60)
    };
    set({ progress });
    persist(progress);
  }
}));
