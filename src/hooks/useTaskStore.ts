import { useState, useEffect, useCallback } from "react";
import type { Task, TaskFilters, TaskStatus, TaskPriority } from "@/types/task";

const STORAGE_KEY = "smart-tasks";

const loadTasks = (): Task[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveTasks = (tasks: Task[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

const generateId = () => crypto.randomUUID?.() ?? Date.now().toString(36) + Math.random().toString(36).slice(2);

export function useTaskStore() {
  const [tasks, setTasks] = useState<Task[]>(loadTasks);
  const [filters, setFilters] = useState<TaskFilters>({
    status: "all",
    priority: "all",
    sortByDueDate: "asc",
  });

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTask = useCallback((data: Pick<Task, "title" | "description" | "priority" | "dueDate">) => {
    const now = new Date().toISOString();
    const task: Task = {
      id: generateId(),
      ...data,
      status: "todo",
      createdAt: now,
      updatedAt: now,
    };
    setTasks((prev) => [task, ...prev]);
  }, []);

  const updateTask = useCallback((id: string, data: Partial<Omit<Task, "id" | "createdAt">>) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, ...data, updatedAt: new Date().toISOString() } : t
      )
    );
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const changeStatus = useCallback((id: string, status: TaskStatus) => {
    updateTask(id, { status });
  }, [updateTask]);

  const filteredTasks = tasks
    .filter((t) => filters.status === "all" || t.status === filters.status)
    .filter((t) => filters.priority === "all" || t.priority === filters.priority)
    .sort((a, b) => {
      const dateA = new Date(a.dueDate).getTime();
      const dateB = new Date(b.dueDate).getTime();
      return filters.sortByDueDate === "asc" ? dateA - dateB : dateB - dateA;
    });

  const summary = {
    total: tasks.length,
    todo: tasks.filter((t) => t.status === "todo").length,
    inProgress: tasks.filter((t) => t.status === "in-progress").length,
    completed: tasks.filter((t) => t.status === "completed").length,
  };

  return {
    tasks: filteredTasks,
    allTasks: tasks,
    filters,
    setFilters,
    addTask,
    updateTask,
    deleteTask,
    changeStatus,
    summary,
  };
}
