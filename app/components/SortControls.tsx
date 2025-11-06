import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { sortControlsStyles } from "../styles/SortControls.styles";

type SortBy = "date" | "status";

type Props = {
  sortBy: SortBy;
  setSortBy: (s: SortBy) => void;
};

export default function SortControls({ sortBy, setSortBy }: Props) {
  return (
    <View style={sortControlsStyles.container}>
      <Text style={sortControlsStyles.label}>Sorting</Text>

      <View style={sortControlsStyles.btnRow}>
        <TouchableOpacity
          style={[sortControlsStyles.btn, sortBy === "date" && sortControlsStyles.btnActive]}
          onPress={() => setSortBy("date")}
        >
          <Text style={sortControlsStyles.btnText}>Date</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[sortControlsStyles.btn, sortBy === "status" && sortControlsStyles.btnActive, sortControlsStyles.btnSpacing]}
          onPress={() => setSortBy("status")}
        >
          <Text style={sortControlsStyles.btnText}>Status</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}