"use client";

import React from "react";
import {
	IonModal,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonButtons,
	IonButton,
	IonContent,
	IonInput,
} from "@ionic/react";

export function AddTaskModal({
	isOpen,
	onDismiss,
	onSave,
}: {
	isOpen: boolean;
	onDismiss: () => void;
	onSave: (title: string) => void;
}) {
	const [title, setTitle] = React.useState("");
	const inputRef = React.useRef<HTMLIonInputElement | null>(null);

	React.useEffect(() => {
		if (isOpen) {
			setTimeout(() => {
				inputRef.current?.setFocus();
			}, 100);
		} else {
			setTitle("");
		}
	}, [isOpen]);

	return (
		<IonModal isOpen={isOpen} onDidDismiss={onDismiss} initialBreakpoint={0.45} breakpoints={[0, 0.45, 0.75]}>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonButton aria-label="Hủy" onClick={onDismiss}>
							Hủy
						</IonButton>
					</IonButtons>
					<IonTitle>Thêm công việc</IonTitle>
					<IonButtons slot="end">
						<IonButton
							strong
							aria-label="Lưu công việc"
							onClick={() => {
								const trimmed = title.trim();
								if (trimmed.length > 0) onSave(trimmed);
							}}
						>
							Lưu
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent className="ion-padding">
				<IonInput
					ref={inputRef}
					aria-label="Tên công việc"
					placeholder="Nhập tên công việc..."
					value={title}
					onIonInput={(e) => setTitle(String(e.detail.value ?? ""))}
					autoCapitalize="sentences"
					enterkeyhint="done"
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							const trimmed = title.trim();
							if (trimmed.length > 0) onSave(trimmed);
						}
					}}
				/>
			</IonContent>
		</IonModal>
	);
}


