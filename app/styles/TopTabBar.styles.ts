import { Platform, StyleSheet } from "react-native";
import { PRIMARY } from "./colors";

export const topTabStyles = StyleSheet.create({
  tabBar: {
    paddingTop: Platform.OS === "ios" ? 64 : 40,
    paddingHorizontal: 16,
    paddingBottom: 10,
    backgroundColor: PRIMARY,
    borderBottomWidth: 1,
    borderColor: "#eef2f7",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  
  appTitle: { fontSize: 20, fontWeight: "600", color: "#000" },
  appSub: { fontSize: 14, color: "#000", marginTop: 2 },

  tabRow: { flexDirection: "row", alignItems: "center" },
  tabBtn: { alignItems: "center", paddingHorizontal: 10, paddingVertical: 6, marginLeft: 6 },
  tabActive: { backgroundColor: "#dbeeff", borderRadius: 8 },
});