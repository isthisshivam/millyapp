import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
//import CurrencyInput from "react-native-currency-input";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";

const AmountTransfer = ({ colors, setPayload, payload, amount }) => {
  const styles = StyleSheet.create({
    amount: {
      fontSize: config.hp("5.5%"),
      color: theme.colors.primary,
      maxWidth: "100%",
      width: "100%",
    },
    container: {
      width: "100%",
      paddingTop: config.hp("1%"),
      height: config.hp("18%"),
      backgroundColor: "#f0f0f0",
      paddingHorizontal: config.wp("2%"),
      borderBottomColor: theme.colors.faded,
      borderBottomWidth: config.hp(".08%"),
      borderTopWidth: config.hp(".04%"),
    },
    currencyContainer: {
      maxWidth: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
      borderBottomColor: theme.colors.primary,
      borderBottomWidth: config.hp(".2%"),
      width: "50%",
    },
    dollarSign: {
      fontSize: config.hp("3.5%"),
      flex: 0.5,
    },
    dollarSignContainer: {
      flexDirection: "row",
      justifyContent: "center",
      width: "100%",
      flex: 0.2,
    },
    inputContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      height: "60%",
      width: "100%",
    },
    inputContainerCenter: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    },

    inputField: {
      width: "80%",
      height: "100%",
      fontSize: 40,
      flex: 0.8,
    },
    title: {
      color: colors.primary,
      fontWeight: "bold",
      fontSize: 18,
    },
    titleContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      height: config.hp("5%"),
      paddingLeft: config.wp("1%"),
    },
  });
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Amount</Text>
      </View>
      <View style={styles.inputContainerCenter}>
        <View style={styles.inputContainer}>
          <View style={styles.dollarSignContainer}>
            <Text style={styles.dollarSign}>$</Text>
          </View>
          <View style={styles.currencyContainer}>
            {/* <CurrencyInput
              minValue={0.0}
              style={styles.amount}
              value={payload.amount}
              onChangeValue={(value) => {
                setPayload({
                  ...payload,
                  amount: value,
                });
              }}
              unit="$"
              delimiter=","
              separator="."
              precision={2}
            /> */}
          </View>
        </View>
      </View>
    </View>
  );
};

export default AmountTransfer;
