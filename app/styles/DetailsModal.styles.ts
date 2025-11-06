import { StyleSheet } from "react-native";

export const detailsStyles = StyleSheet.create({
  modal: { flex: 1, padding: 16, backgroundColor: "#fff", marginTop: 32 },

  
  headerRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },

  
  header: { fontSize: 20, fontWeight: "700", marginBottom: 8, color: "#000" },

 
  small: { color: "#000", fontSize: 14 },

  
  statusBadge: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 14 },
  statusBadgeText: { color: "#000", fontWeight: "700", fontSize: 12 },

  
  description: { marginTop: 12, fontSize: 15, color: "#000", lineHeight: 20 },
  statusText: { marginTop: 12, fontSize: 14, color: "#000" },

  
  actionsContainer: { marginTop: 12 },

  
  statusBtn: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e6eef6",
    marginBottom: 8,
    backgroundColor: "#fff",
  },
  statusActive: { borderColor: "#5887baff", borderWidth: 2 },

  
  footer: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  circleAction: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },

  circleActionDelete: { backgroundColor: "#d76f6aff" },

  circleIcon: { width: 22, height: 22, resizeMode: "contain", tintColor: "#fff" },
});