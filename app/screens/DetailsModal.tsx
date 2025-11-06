import React from "react";
import { Image, Modal, Text, TouchableOpacity, View } from "react-native";
import type { Status, Task } from "../models/types";
import { PRIMARY, STATUS_COLORS } from "../styles/colors";
import { detailsStyles } from "../styles/DetailsModal.styles";

type Props = {
  visible: boolean;
  task: Task | null;
  onClose: () => void;
  updateStatus: (id: string, s: Status) => void;
  deleteTask: (id: string) => void;
  onConfirmDelete: (id: string) => void;
};

export default function DetailsModal({ visible, task, onClose, updateStatus, deleteTask, onConfirmDelete }: Props) {
  function formatDateTimeFromTimestamp(ts: number) {
    const d = new Date(ts);
    return d.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function formatDateTimeFromISO(iso?: string) {
    if (!iso) return "";
    const d = new Date(iso);
    if (isNaN(d.getTime())) return iso;
    return d.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  // Allowed transitions (Pending and In Progress only; Completed/Cancelled are final)
  const transitions: Record<Status, Status[]> = {
    Pending: ["In Progress", "Cancelled"],
    "In Progress": ["Completed", "Cancelled"],
    Completed: [],
    Cancelled: [],
  };

  const statusColor = (s: Status) => STATUS_COLORS[s] ?? PRIMARY;

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={detailsStyles.modal}>
        {task ? (
          <>
            {/* header + status badge */}
            <View style={detailsStyles.headerRow}>
              <Text style={detailsStyles.header}>{task.title}</Text>
              <View style={[detailsStyles.statusBadge, { backgroundColor: statusColor(task.status) }]}>
                <Text style={detailsStyles.statusBadgeText}>{task.status}</Text>
              </View>
            </View>

            <Text style={detailsStyles.small}>Created: {formatDateTimeFromTimestamp(task.createdAt)}</Text>
            {task.completedAt ? <Text style={detailsStyles.small}>Completed: {formatDateTimeFromISO(task.completedAt)}</Text> : null}

            <Text style={detailsStyles.small}>Address: {task.address}</Text>

            <Text style={detailsStyles.description}>Description: {task.description}</Text>
            <Text style={detailsStyles.statusText}>Current status: {task.status}</Text>

            {/* status controls: show only allowed next statuses */}
            <View style={detailsStyles.actionsContainer}>
              {transitions[task.status].length > 0 ? (
                transitions[task.status].map((s) => (
                  <TouchableOpacity
                    key={s}
                    style={[detailsStyles.statusBtn, task.status === s && detailsStyles.statusActive]}
                    onPress={() => updateStatus(task.id, s)}
                  >
                    <Text>{s}</Text>
                  </TouchableOpacity>
                ))
              ) : (
                <Text style={[detailsStyles.small, { marginTop: 8 }]}>
                  {task.status === "Completed"
                    ? "This task is completed."
                    : "This task is cancelled."}
                </Text>
              )}
            </View>

            
            <View style={detailsStyles.footer}>
              <TouchableOpacity
                style={[detailsStyles.circleAction, detailsStyles.circleActionDelete]}
                onPress={() => onConfirmDelete(task.id)}
                accessibilityLabel="Delete task"
              >
                <Image source={require("../../assets/images/bin.png")} style={detailsStyles.circleIcon} />
              </TouchableOpacity>

              <TouchableOpacity
                style={[detailsStyles.circleAction, { backgroundColor: PRIMARY }]}
                onPress={onClose}
                accessibilityLabel="Save and close"
              >
                <Image source={require("../../assets/images/save.png")} style={detailsStyles.circleIcon} />
              </TouchableOpacity>
            </View>
          </>
        ) : null}
      </View>
    </Modal>
  );
}