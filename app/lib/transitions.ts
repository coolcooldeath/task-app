import type { Status } from "../models/types";

export const transitions: Record<Status, Status[]> = {
  Pending: ["In Progress", "Cancelled"],
  "In Progress": ["Completed", "Cancelled"],
  Completed: [],
  Cancelled: [],
};

export function isFinalStatus(s: Status) {
  return s === "Completed" || s === "Cancelled";
}