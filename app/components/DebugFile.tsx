import * as FileSystem from "expo-file-system";
import React from "react";
import { Alert, Button, View } from "react-native";

const TASKS_FILE = `${FileSystem.documentDirectory}tasks.json`;

export default function DebugFile() {
  async function checkFile() {
    try {
      const info = await FileSystem.getInfoAsync(TASKS_FILE);
      console.log("file info:", info);
      if (!info.exists) {
        Alert.alert("Файл не найден", `Путь: ${TASKS_FILE}`);
        return;
      }
      const content = await FileSystem.readAsStringAsync(TASKS_FILE);
      // короткий вывод в Alert (или console.log для больших файлов)
      Alert.alert("Содержимое файла", content || "пусто");
      console.log("file content:", content);
    } catch (e) {
      console.error(e);
      Alert.alert("Ошибка", String(e));
    }
  }

  return (
    <View style={{ padding: 12 }}>
      <Button title="Проверить tasks.json" onPress={checkFile} />
    </View>
  );
}