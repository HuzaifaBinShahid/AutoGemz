import React from "react";
import { StyleSheet, View } from "react-native";

const FiltersDivider = () => {
  return (
    <View style={styles.filtersDivider}>
      <View style={styles.dividerLine} />
    </View>
  );
};
export default FiltersDivider;

const styles = StyleSheet.create({
  filtersDivider: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#FFFFFF0D",
  },
});
