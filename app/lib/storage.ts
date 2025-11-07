import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";
import type { Task } from "../models/types";

const BASE_DIR = (FileSystem as any).documentDirectory ?? (FileSystem as any).cacheDirectory ?? null;
const TASKS_FILE = BASE_DIR ? `${BASE_DIR}tasks.json` : null;
const ASYNC_KEY = "@taskapp:tasks_v1";

export function getTasksFilePath() {
  return TASKS_FILE;
}

async function readFromFS(): Promise<Task[] | null> {
  if (!TASKS_FILE) return null;
  try {
    const info = await FileSystem.getInfoAsync(TASKS_FILE);
    if (!info.exists) {
      await FileSystem.writeAsStringAsync(TASKS_FILE, "[]");
      return [];
    }
    const content = await FileSystem.readAsStringAsync(TASKS_FILE);
    const parsed = JSON.parse(content);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error("[storage][FS] read error:", e);
    return null;
  }
}

async function writeToFS(tasks: Task[]): Promise<boolean> {
  if (!TASKS_FILE) return false;
  try {
    await FileSystem.writeAsStringAsync(TASKS_FILE, JSON.stringify(tasks));
    console.log("[storage][FS] saved OK to", TASKS_FILE);
    return true;
  } catch (e) {
    console.error("[storage][FS] write error:", e);
    return false;
  }
}

async function readFromAsync(): Promise<Task[]> {
  try {
    const raw = await AsyncStorage.getItem(ASYNC_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error("[storage][Async] read error:", e);
    return [];
  }
}

async function writeToAsync(tasks: Task[]): Promise<void> {
  try {
    await AsyncStorage.setItem(ASYNC_KEY, JSON.stringify(tasks));
    console.log("[storage][Async] saved OK to AsyncStorage");
  } catch (e) {
    console.error("[storage][Async] write error:", e);
  }
}

export async function loadTasksFromDisk(): Promise<Task[]> {
  console.log("[storage] TASKS_FILE=", TASKS_FILE, "ASYNC_KEY=", ASYNC_KEY);
  // try FS first
  const fromFs = await readFromFS();
  if (fromFs !== null) return fromFs;
  // fallback to async storage
  return await readFromAsync();
}

export async function saveTasksToDisk(tasks: Task[]): Promise<void> {
  console.log("[storage] saving items:", tasks.length, "TASKS_FILE=", TASKS_FILE);
  const ok = await writeToFS(tasks);
  if (!ok) {
    await writeToAsync(tasks);
  }
}