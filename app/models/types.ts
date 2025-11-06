export type Status = "Pending" | "In Progress" | "Completed" | "Cancelled";

export type Task = {
  id: string;
  title: string;
  description?: string;
  completedAt?: string; // ISO timestamp when marked Completed
  status: Status;
  createdAt: number; // epoch ms
  address?: string;
};