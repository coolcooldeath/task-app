import { StyleSheet } from "react-native";

export const commonStyles = StyleSheet.create({
  fab: {
    position: "absolute",
    right: 18,
    bottom: 28,
    backgroundColor: "#568cceff", 
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
  },
  fabText: { color: "#fff", fontSize: 28, lineHeight: 30 },
  modalCloseWrap: { padding: 12 },
  modalCloseText: { color: "#000", textAlign: "center", fontSize: 16 },
});