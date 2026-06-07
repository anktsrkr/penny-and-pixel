import { openDB } from "idb";
import type { ProgressState } from "../types";

const DB_NAME = "penny-pixel-progress";
const STORE_NAME = "state";
const STATE_KEY = "progress";

async function getDb() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      db.createObjectStore(STORE_NAME);
    }
  });
}

export async function loadProgress(): Promise<ProgressState | null> {
  const db = await getDb();
  return (await db.get(STORE_NAME, STATE_KEY)) ?? null;
}

export async function saveProgress(progress: ProgressState): Promise<void> {
  const db = await getDb();
  await db.put(STORE_NAME, progress, STATE_KEY);
}
