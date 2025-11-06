import React, { useCallback, useState } from "react";
import { Alert, Modal, Text, TouchableOpacity, View } from "react-native";
import SortControls from "./components/SortControls";
import TopTabBar from "./components/TopTabBar";
import CreateScreen from "./screens/CreateScreen";
import DetailsModal from "./screens/DetailsModal";
import ListScreen from "./screens/ListScreen";
import { commonStyles } from "./styles/Common.styles";
import { useTasks } from "./useTasks";

export default function Index() {
  const { tasks, sortedByStatus, addTask, updateStatus, deleteTask, selected, openDetails, closeDetails, modalVisible } = useTasks();
  const statusSorted = sortedByStatus;

  // sort control state: 'status' or 'date'
  const [sortBy, setSortBy] = useState<"status" | "date">("status");

 
  const visibleTasks = sortBy === "date" ? [...tasks].sort((a, b) => b.createdAt - a.createdAt) : statusSorted;

  // create modal visibility and form state
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");

  const handleAdd = useCallback(() => {
    const missing: string[] = [];
    if (!title.trim()) missing.push("Title");
    if (!description.trim()) missing.push("Description");
    if (!address.trim()) missing.push("Address");

    if (missing.length) {
      Alert.alert("Validation", `Required fields: ${missing.join(", ")}`);
      return;
    }

    addTask({ title: title.trim(), description: description.trim(), address: address.trim() });
    setTitle("");
    setDescription("");
    setAddress("");
    setCreateModalVisible(false);
  }, [title, description, address, addTask]);

  const confirmDelete = useCallback(
    (id: string) => {
      Alert.alert("Delete task", "Are you sure?", [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => deleteTask(id) },
      ]);
    },
    [deleteTask]
  );

  return (
    <>
      <TopTabBar total={visibleTasks.length} />

      
      <SortControls sortBy={sortBy} setSortBy={setSortBy} />

      <ListScreen tasks={visibleTasks} onOpen={openDetails} updateStatus={updateStatus} />

      
      <TouchableOpacity style={commonStyles.fab} onPress={() => setCreateModalVisible(true)} accessibilityLabel="Create task">
        <Text style={commonStyles.fabText}>＋</Text>
      </TouchableOpacity>

      <Modal visible={createModalVisible} animationType="slide" onRequestClose={() => setCreateModalVisible(false)}>
        <View style={{ flex: 1 }}>
          <CreateScreen
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            address={address}
            setAddress={setAddress}
            onAdd={handleAdd}
          />
          <View style={commonStyles.modalCloseWrap}>
            <TouchableOpacity onPress={() => setCreateModalVisible(false)}>
              <Text style={commonStyles.modalCloseText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <DetailsModal
        visible={!!modalVisible}
        task={selected}
        onClose={closeDetails}
        updateStatus={updateStatus}
        deleteTask={deleteTask}
        onConfirmDelete={confirmDelete}
      />
    </>
  );
}
