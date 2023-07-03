import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";
import CurrencyFormat from "react-currency-format";

const Request = ({ item, navigation }) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Request Details", {
          item: item,
          confirmationType: "Transmit",
        })
      }
      style={styles.container}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          width: "100%",
          marginBottom: config.hp("2%"),
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            width: "40%",
          }}
        >
          <Text style={styles.label}>Name: </Text>
          <Text style={styles.info}>{item.name}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            width: "25%",
          }}
        >
          <Text style={styles.label}>Type: </Text>
          <Text style={styles.info}>{item.requestType}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            width: "30%",
          }}
        >
          <Text style={styles.label}>Date: </Text>
          <Text style={styles.info}>{item.requestDate}</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <View
          style={{
            flexDirection: "column",
            alignItems: "flex-start",
            //width: "50%",
          }}
        >
          <Text style={styles.label}>Submitted by</Text>

          <Text style={styles.info}>John Jacobs Jingle</Text>
        </View>

        <View
          style={{
            flexDirection: "column",
            alignItems: "flex-end",
            width: "50%",
          }}
        >
          <Text style={styles.label}>Total Amount</Text>
          <CurrencyFormat
            value={item.totalAmount}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
            renderText={(value) => <Text>{value}</Text>}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingHorizontal: config.wp("2%"),
    paddingVertical: config.hp("1%"),
    marginBottom: config.hp("1%"),
    borderRadius: 7,
  },
  info: {
    fontSize: 16,
  },
  label: {
    fontSize: 18,
    color: theme.colors.primary,
    fontWeight: "400",
  },
});

export default Request;
