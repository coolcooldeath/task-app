import type { Status, Task } from "../models/types";

export function sortByStatusThenDate(tasks: Task[]) {
  const order: Record<Status, number> = {
    "In Progress": 0,
    Pending: 1,
    Completed: 2,
    Cancelled: 3,
  };
  return [...tasks].sort((a, b) => {
    const ra = order[a.status] ?? 99;
    const rb = order[b.status] ?? 99;
    if (ra !== rb) return ra - rb;
    return b.createdAt - a.createdAt;
  });
}

export function sortByDateDesc(tasks: Task[]) {
  return [...tasks].sort((a, b) => b.createdAt - a.createdAt);
}