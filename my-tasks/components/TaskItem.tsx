"use client";

import React from "react";
import {
	IonItemSliding,
	IonItemOptions,
	IonItemOption,
	IonItem,
	IonCheckbox,
	IonLabel,
	IonReorder,
	IonIcon,
} from "@ionic/react";
import { checkmarkDone, trash } from "ionicons/icons";
import { Task } from "../lib/useTaskStorage";

export const TaskItem = React.memo(function TaskItem({
	task,
	onToggle,
	onDelete,
}: {
	task: Task;
	onToggle: (id: string) => void;
	onDelete: (id: string) => void;
}) {
	const formattedTime = React.useMemo(() => {
		try {
			const dt = new Date(task.createdAt);
			return new Intl.DateTimeFormat(undefined, {
				year: "numeric",
				month: "2-digit",
				day: "2-digit",
				hour: "2-digit",
				minute: "2-digit",
				second: "2-digit",
			}).format(dt);
		} catch {
			return "";
		}
	}, [task.createdAt]);

	return (
		<IonItemSliding>
			<IonItemOptions side="start">
				<IonItemOption
					color="success"
					aria-label="Đánh dấu hoàn thành"
					onClick={() => onToggle(task.id)}
				>
					<IonIcon icon={checkmarkDone} />
				</IonItemOption>
			</IonItemOptions>

			<IonItem
				lines="inset"
				className={`taskItem${task.completed ? " taskItem--completed" : ""}`}
			>
				<IonCheckbox
					slot="start"
					aria-label={task.completed ? "Bỏ hoàn thành" : "Đánh dấu hoàn thành"}
					checked={task.completed}
					onIonChange={() => onToggle(task.id)}
				/>
				<IonLabel>
					<div>{task.title}</div>
					<div className="taskMeta">{formattedTime}</div>
				</IonLabel>
				<IonReorder slot="end" />
			</IonItem>

			<IonItemOptions side="end">
				<IonItemOption color="danger" aria-label="Xóa công việc" onClick={() => onDelete(task.id)}>
					<IonIcon icon={trash} />
				</IonItemOption>
			</IonItemOptions>
		</IonItemSliding>
	);
});


