"use client";

import React from "react";
import { Preferences } from "@capacitor/preferences";

export interface Task {
	id: string;
	title: string;
	completed: boolean;
	order: number;
	createdAt: string; // ISO timestamp
}

type Filter = "all" | "active" | "completed";

const STORAGE_KEY = "my_tasks";

async function loadTasks(): Promise<Task[]> {
	const { value } = await Preferences.get({ key: STORAGE_KEY });
	if (!value) return [];
	try {
		const parsed: Task[] = JSON.parse(value);
		return parsed
			.map((t, idx) => ({
				...t,
				order: typeof t.order === "number" ? t.order : idx,
				createdAt: typeof t.createdAt === "string" ? t.createdAt : new Date().toISOString(),
			}))
			.sort((a, b) => a.order - b.order);
	} catch {
		return [];
	}
}

async function saveTasks(tasks: Task[]) {
	const payload = JSON.stringify(tasks);
	await Preferences.set({ key: STORAGE_KEY, value: payload });
}

export function useTaskStorage() {
	const [tasks, setTasks] = React.useState<Task[]>([]);
	const [filter, setFilter] = React.useState<Filter>("all");

	React.useEffect(() => {
		loadTasks().then(setTasks);
	}, []);

	const persist = React.useCallback((updater: (prev: Task[]) => Task[]) => {
		setTasks((prev) => {
			const next = updater(prev);
			// Persist as one large payload to minimize bridge calls
			saveTasks(next);
			return next;
		});
	}, []);

	const addTask = React.useCallback(
		(task: Omit<Task, "id" | "order" | "createdAt">) => {
			persist((prev) => {
				const nextOrder = prev.length > 0 ? Math.max(...prev.map((t) => t.order)) + 1 : 0;
				const newTask: Task = {
					id: crypto.randomUUID(),
					title: task.title,
					completed: task.completed,
					order: nextOrder,
					createdAt: new Date().toISOString(),
				};
				return [...prev, newTask];
			});
		},
		[persist]
	);

	const toggleTaskCompletion = React.useCallback(
		(id: string) => {
			persist((prev) =>
				prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
			);
		},
		[persist]
	);

	const deleteTask = React.useCallback(
		(id: string) => {
			persist((prev) => prev.filter((t) => t.id !== id));
		},
		[persist]
	);

	const reorderTasks = React.useCallback(
		(from: number, to: number) => {
			persist((prev) => {
				const next = [...prev].sort((a, b) => a.order - b.order);
				const [moved] = next.splice(from, 1);
				next.splice(to, 0, moved);
				// Reassign order to be stable
				return next.map((t, idx) => ({ ...t, order: idx }));
			});
		},
		[persist]
	);

	return {
		tasks,
		filter,
		setFilter,
		addTask,
		toggleTaskCompletion,
		deleteTask,
		reorderTasks,
	};
}


