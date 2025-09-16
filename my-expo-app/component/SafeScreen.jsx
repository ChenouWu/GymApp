// component/SafeScreen.js
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SafeScreen({ children, bg = "#fff", edges = ["top", "bottom"], style }) {
  return (
    <SafeAreaView style={[styles.root, { backgroundColor: bg }, style]} edges={edges}>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});
