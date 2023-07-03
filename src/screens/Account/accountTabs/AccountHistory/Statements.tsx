import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";

const Statement = ({ item, navigation }) => {
  const { month, year } = item;

  const styles = StyleSheet.create({
    statement: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: config.deviceHeight * 0.01,
      borderBottomWidth: 0.2,
    },
    statementDate: {
      fontSize: 18,
    },
    activityDate: {
      fontSize: 16,
      color: theme.colors.faded,
    },
  });
  return (
    <TouchableOpacity
      style={styles.statement}
      onPress={() =>
        navigation.navigate("StatementDetails", { statement: item })
      }
    >
      <Text style={styles.statementDate}>
        Statement of {month} {year}
      </Text>
      <Text style={styles.statementIcon}>
        <Icon name="chevron-forward" style={styles.Icon} size={25} />
      </Text>
    </TouchableOpacity>
  );
};

export default Statement;
