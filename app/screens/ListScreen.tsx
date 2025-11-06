import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import type { Status, Task } from "../models/types";
import { STATUS_COLORS } from "../styles/colors";
import { listStyles } from "../styles/ListScreen.styles";

type Props = {
  tasks: Task[];
  onOpen: (t: Task) => void;
  updateStatus: (id: string, s: Status) => void;
};

export default function ListScreen({ tasks, onOpen, updateStatus }: Props) {
  function statusColor(s: Status) {
    return STATUS_COLORS[s] ?? "#ffffff";
  }

  function renderItem({ item }: { item: Task }) {
    const bg = statusColor(item.status);

    return (
      <TouchableOpacity style={[listStyles.card, { backgroundColor: bg }]} onPress={() => onOpen(item)}>
        <View style={{ flex: 1 }}>
          <Text style={listStyles.title}>{item.title}</Text>

          {item.address ? <Text style={listStyles.small}>Address: {item.address}</Text> : null}

          {item.description ? (
            <Text style={listStyles.small} numberOfLines={2}>
              {item.description}
            </Text>
          ) : null}

          <Text style={[listStyles.small, { marginTop: 8 }]}>Status: {item.status}</Text>
        </View>

        <View style={listStyles.indicatorWrapper}>
          <View style={[listStyles.circleIndicator, { backgroundColor: STATUS_COLORS[item.status] ?? "#bdbdbd" }]} />
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={listStyles.wrapper}>
      <FlatList
        data={tasks}
        keyExtractor={(i) => i.id}
        renderItem={renderItem}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={<Text style={listStyles.emptyText}>No tasks yet.</Text>}
      />
    </View>
  );
}