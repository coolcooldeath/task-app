import * as FileSystem from "expo-file-system";
import type { Task } from "../models/types";

const BASE_DIR = (FileSystem as any).documentDirectory ?? (FileSystem as any).cacheDirectory ?? null;
const TASKS_FILE = BASE_DIR ? `${BASE_DIR}tasks.json` : null;

export async function loadTasksFromDisk(): Promise<Task[]> {
  try {
    if (!TASKS_FILE) {
      console.warn("FS not available — tasks won't be persisted.");
      return [];
    }
    const info = await FileSystem.getInfoAsync(TASKS_FILE);
    if (!info.exists) {
      await FileSystem.writeAsStringAsync(TASKS_FILE, "[]");
      return [];
    }
    const content = await FileSystem.readAsStringAsync(TASKS_FILE);
    const parsed = JSON.parse(content);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error("loadTasksFromDisk error:", e);
    try {
      if (TASKS_FILE) await FileSystem.writeAsStringAsync(TASKS_FILE, "[]");
    } catch {}
    return [];
  }
}

export async function saveTasksToDisk(tasks: Task[]): Promise<void> {
  try {
    if (!TASKS_FILE) return;
    await FileSystem.writeAsStringAsync(TASKS_FILE, JSON.stringify(tasks));
  } catch (e) {
    console.error("saveTasksToDisk error:", e);
  }
}