"use client";

import React from "react";
import { IonList, IonReorderGroup, ItemReorderEventDetail } from "@ionic/react";
import { Task } from "../lib/useTaskStorage";
import { TaskItem } from "./TaskItem";

export function TaskReorderList({
	tasks,
	onToggle,
	onDelete,
	onReorder,
}: {
	tasks: Task[];
	onToggle: (id: string) => void;
	onDelete: (id: string) => void;
	onReorder: (from: number, to: number) => void;
}) {
	return (
		<IonList inset>
			<IonReorderGroup
				disabled={false}
				onIonItemReorder={(event) => {
					const detail = event.detail as ItemReorderEventDetail;
					onReorder(detail.from, detail.to);
					detail.complete();
				}}
			>
				{tasks.map((t) => (
					<TaskItem key={t.id} task={t} onToggle={onToggle} onDelete={onDelete} />
				))}
			</IonReorderGroup>
		</IonList>
	);
}


