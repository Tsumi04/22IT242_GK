"use client";

import {
	IonPage,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonContent,
	IonFab,
	IonFabButton,
	IonIcon,
	IonButtons,
	IonSegment,
	IonSegmentButton,
} from "@ionic/react";
import { add } from "ionicons/icons";
import React from "react";
import { TaskReorderList } from "../components/TaskReorderList";
import { AddTaskModal } from "../components/AddTaskModal";
import { useTaskStorage, Task } from "../lib/useTaskStorage";

export default function Home() {
	const {
		tasks,
		filter,
		setFilter,
		addTask,
		toggleTaskCompletion,
		deleteTask,
		reorderTasks,
	} = useTaskStorage();

	const [mounted, setMounted] = React.useState(false);
	React.useEffect(() => setMounted(true), []);

	const [isOpen, setIsOpen] = React.useState(false);

	const filteredTasks = React.useMemo(() => {
		if (filter === "active") return tasks.filter((t) => !t.completed);
		if (filter === "completed") return tasks.filter((t) => t.completed);
		return tasks;
	}, [tasks, filter]);

	if (!mounted) {
		return null;
	}

	return (
		<IonPage>
			<IonHeader translucent>
				<IonToolbar color="primary">
					<IonTitle style={{ fontWeight: "var(--app-title-weight)" }}>My Tasks</IonTitle>
				</IonToolbar>
				<IonToolbar>
					<IonSegment
						color="primary"
						value={filter}
						onIonChange={(e) =>
							setFilter((e.detail.value as "all" | "active" | "completed") ?? "all")
						}
					>
						<IonSegmentButton value="all">Tất cả</IonSegmentButton>
						<IonSegmentButton value="active">Đang làm</IonSegmentButton>
						<IonSegmentButton value="completed">Hoàn thành</IonSegmentButton>
					</IonSegment>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen className="ion-padding">
				{filteredTasks.length === 0 ? (
					<div className="emptyState">
						<div className="emptyIcon">🗒️</div>
						<div className="emptyTitle">Danh sách đang trống</div>
						<div className="emptyHint">Nhấn nút “+” để thêm công việc mới</div>
					</div>
				) : (
					<div className="card">
						<TaskReorderList
							tasks={filteredTasks}
							onToggle={toggleTaskCompletion}
							onDelete={deleteTask}
							onReorder={reorderTasks}
						/>
					</div>
				)}
				<IonFab vertical="bottom" horizontal="end" slot="fixed">
					<IonFabButton color="primary" aria-label="Thêm công việc" onClick={() => setIsOpen(true)}>
						<IonIcon icon={add} />
					</IonFabButton>
				</IonFab>
				<AddTaskModal
					isOpen={isOpen}
					onDismiss={() => setIsOpen(false)}
					onSave={(title: string) => {
						const newTask: Omit<Task, "id" | "order" | "createdAt"> = {
							title,
							completed: false,
						};
						addTask(newTask);
						setIsOpen(false);
					}}
				/>
			</IonContent>
		</IonPage>
	);
}

