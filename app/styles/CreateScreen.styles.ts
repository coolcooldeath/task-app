import { StyleSheet } from "react-native";

export const createStyles = StyleSheet.create({
  form: { padding: 16, marginTop: 40 },
  fieldLabel: { fontSize: 13, color: "#333", marginBottom: 6, fontWeight: "600" },
  input: { borderWidth: 1, borderColor: "#e6eef6", backgroundColor: "#fff", padding: 12, borderRadius: 10, marginBottom: 12 },
  inputSmall: { height: 48 },
  inputLarge: { height: 70, textAlignVertical: "top" },
});