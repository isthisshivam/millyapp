import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";

const SubItem = ({ item, navigation }) => {
  const { name, amount, frequency, id } = item;
  return (
    <TouchableOpacity
      style={styles.itemContainer}
      activeOpacity={0.55}
      onPress={() => navigation.navigate("Edit Subscription", { id: id })}
    >
      <Text style={styles.itemName}>{name}</Text>
      <View>
        <Text style={styles.rightSideNames}>
          ${amount}/{frequency}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  itemContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: config.hp(".05%"),
    borderBottomColor: theme.colors.faded,
    height: config.hp("9%"),
  },
  itemName: {
    fontSize: config.hp("2.15%"),
  },
  rightSideNames: {
    fontSize: config.hp("2.15%"),
    color: theme.colors.primary,
  },
});
export default SubItem;
