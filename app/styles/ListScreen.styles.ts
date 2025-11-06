import { StyleSheet } from "react-native";

export const listStyles = StyleSheet.create({
  wrapper: { flex: 1 },

  
  card: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
    marginHorizontal: 12,
  },

  
  title: { fontWeight: "700", fontSize: 18, marginBottom: 6, color: "#000" },

  
  small: { color: "#000", fontSize: 14 },

  actionsRow: { flexDirection: "row", alignItems: "center" },

  btn: { backgroundColor: "#eee", padding: 8, borderRadius: 6, marginLeft: 8 },
  btnText: { fontSize: 14, color: "#000" },

  emptyText: { textAlign: "center", marginTop: 20, fontSize: 16, color: "#000" },

  circleBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  circleBtnText: { color: "#fff", fontWeight: "700", fontSize: 18 },
  circleBtnDisabled: { backgroundColor: "#bdbdbd" },

  circleIndicator: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: 12,
  },

  indicatorWrapper: { justifyContent: "center", alignItems: "center", marginLeft: 12 },
});