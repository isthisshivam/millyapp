import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./style";
import { theme } from "../../../../config/Theme";

const Activity = ({
  amount,
  date,
  status,
  confirmation,
  navigation,
  depositAccount,
  id,
}) => {
  let formattedAmount = Number(amount).toFixed(2);

  const StatusIcon = () => (
    <View>
      {status === "Completed" ? (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <AntDesign
            name="checkcircle"
            size={24}
            color={theme.colors.primary}
          />
          <Text style={{ fontSize: 18, marginLeft: 4 }}>{status}</Text>
        </View>
      ) : status === "Pending" ? (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons name="sync-circle" size={24} color="#ffb300" />

          <Text style={{ fontSize: 18, marginLeft: 4 }}>{status}</Text>
        </View>
      ) : status === "Rejected" ? (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons name="warning" size={24} color="#d32f2f" />
          <Text style={{ fontSize: 18, marginLeft: 4 }}>{status}</Text>
        </View>
      ) : undefined}
    </View>
  );
  return (
    <TouchableOpacity
      style={styles.activity}
      // onPress={() => {
      //   navigation.navigate("DepositDetails", {
      //     confirmation: confirmation,
      //   });
      // }}
    >
      <View style={styles.activityLeftSection}>
        <View style={styles.accountContainer}>
          <Text style={styles.accountName}>{depositAccount.account}</Text>
          <StatusIcon />
        </View>
      </View>
      <View style={styles.activityRightSection}>
        <Text style={styles.activityAmount}>${formattedAmount}</Text>
        <Icon name="chevron-forward" style={styles.Icon} />
      </View>
    </TouchableOpacity>
  );
};

export default Activity;
