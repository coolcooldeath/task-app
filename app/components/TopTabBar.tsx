import React from "react";
import { Text, View } from "react-native";
import { topTabStyles } from "../styles/TopTabBar.styles";

type Props = {
  total: number;
};

export default function TopTabBar({ total }: Props) {
  return (
    <View style={topTabStyles.tabBar}>
      <View>
        <Text style={topTabStyles.appTitle}>Task Manager</Text>
        <Text style={topTabStyles.appSub}>{total} tasks</Text>
      </View>

      
      <View />
    </View>
  );
}