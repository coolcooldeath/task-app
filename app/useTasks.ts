import { useCallback, useEffect, useMemo, useState } from "react";
import { sortByDateDesc, sortByStatusThenDate } from "./lib/sort";
import { loadTasksFromDisk, saveTasksToDisk } from "./lib/storage";
import type { Status, Task } from "./models/types"; // или "../models/types" в зависимости от структуры

/* Hook */
export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selected, setSelected] = useState<Task | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const loaded = await loadTasksFromDisk();
      if (mounted) setTasks(loaded);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    // persist on each change
    saveTasksToDisk(tasks);
  }, [tasks]);

  const addTask = useCallback((payload: { title: string; description?: string; address?: string }) => {
    const t: Task = {
      id: String(Date.now()),
      title: payload.title,
      description: payload.description || "",
      address: payload.address || "",
      status: "Pending",
      createdAt: Date.now(),
    };
    setTasks((s) => [t, ...s]);
  }, []);

  const updateStatus = useCallback((id: string, s: Status) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        if (t.status === "Completed" || t.status === "Cancelled") return t;
        const updated: Task = { ...t, status: s };
        if (s === "Completed") updated.completedAt = new Date().toISOString();
        else if (t.completedAt) delete (updated as any).completedAt;
        return updated;
      })
    );
    setSelected((cur) => (cur && cur.id === id ? { ...cur, status: s, completedAt: s === "Completed" ? new Date().toISOString() : cur.completedAt } : cur));
  }, []);

  const deleteTask = useCallback(
    (id: string) => {
      setTasks((prev) => prev.filter((t) => t.id !== id));
      if (selected?.id === id) {
        setSelected(null);
        setModalVisible(false);
      }
    },
    [selected]
  );

  const openDetails = useCallback((task: Task) => {
    setSelected(task);
    setModalVisible(true);
  }, []);

  const closeDetails = useCallback(() => {
    setModalVisible(false);
    setSelected(null);
  }, []);

  const sortedByStatus = useMemo(() => sortByStatusThenDate(tasks), [tasks]);
  const sortedByDate = useMemo(() => sortByDateDesc(tasks), [tasks]);

  return {
    tasks,
    sortedByStatus,
    sortedByDate,
    addTask,
    updateStatus,
    deleteTask,
    selected,
    openDetails,
    closeDetails,
    modalVisible,
  } as const;
}