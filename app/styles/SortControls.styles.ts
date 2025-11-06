import { StyleSheet } from "react-native";

export const sortControlsStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  label: { fontWeight: "600", fontSize: 16, color: "#000" },
  btnRow: { flexDirection: "row", alignItems: "center" },

  btn: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, alignItems: "center", backgroundColor: "#fff" },
  btnActive: { backgroundColor: "#dbeeff" },
  btnSpacing: { marginLeft: 8 },
  btnText: { fontSize: 14, color: "#000" },
});