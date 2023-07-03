import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";
type PayloadType = {
  name: string;
  accountId: string;
  phoneNumber: string;
  checkNumber: number;
  amount: string;
  date: string;
  payeeName: string;
  reason: string;
};

type Props = {
  payload: PayloadType;
  handleSubmit: () => void;
};

const Confirmation: React.FC<Props> = ({ handleSubmit, payload }) => {
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: config.wp("2%"),
        paddingVertical: config.hp("2%"),
      }}
    >
      <Text
        style={{ fontSize: 18, fontWeight: "500", color: theme.colors.primary }}
      >
        Confirmation
      </Text>
      <Text style={{ marginBottom: 20 }}>
        Please confirm the information you entered is correct.
      </Text>

      <View style={{ flex: 1 }}>
        <View
          style={{
            backgroundColor: "white",
            paddingVertical: config.hp("1%"),
            paddingHorizontal: config.wp("8%"),
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: theme.colors.primary,
              fontWeight: "500",
              fontSize: 16,
              marginBottom: config.hp("4%"),
            }}
          >
            Stop Check Payment
          </Text>
          <View style={styles.row}>
            <Text style={styles.label}>Name: </Text>
            <Text style={styles.label}>{payload.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Account: </Text>
            <Text style={styles.label}>{payload.accountId}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Phone Number: </Text>
            <Text style={styles.label}>{payload.phoneNumber}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Check Number: </Text>
            <Text style={styles.label}>{payload.checkNumber}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Amount: </Text>
            <Text style={styles.label}>{payload.amount}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Payee Name: </Text>
            <Text style={styles.label}>{payload.payeeName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Reason: </Text>
            <Text style={styles.label}>{payload.reason}</Text>
          </View>
        </View>
      </View>

      <View
        style={{
          //flex: 1,
          height: config.hp("12%"),
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <TouchableOpacity
          onPress={handleSubmit}
          style={{
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 12,
            width: "80%",
            paddingVertical: config.hp("1%"),
            marginBottom: config.hp("1%"),
            backgroundColor: theme.colors.primary,
          }}
        >
          <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
            Stop Check
          </Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Confirmation;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: config.hp("1%"),
  },
  label: {
    fontSize: 16,
  },
});
