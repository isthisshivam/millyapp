import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
//import CurrencyFormat from "react-currency-format";
import { theme } from "../../../../../config/Theme";
import { config } from "../../../../../config/Config";

const Template = ({ item, navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("ACH Review", { item })}
      style={{
        width: "100%",
        backgroundColor: "white",
        paddingVertical: config.hp("1%"),
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between",
        paddingHorizontal: config.wp("2%"),
        borderRadius: 7,
        marginBottom: config.hp("1%"),
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "500",
            textTransform: "capitalize",
            color: theme.colors.primary,
          }}
        >
          {item.templateName}
        </Text>
        {/* <CurrencyFormat
          value={item.maxAmount}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"$"}
          renderText={(value) => (
            <Text
              style={{
                //fontWeight: "400",
                textTransform: "capitalize",
                color: item.achType == "Collect" ? "green" : "red",
                fontSize: 18,
              }}
            >
              {value}
            </Text>
          )}
        ></CurrencyFormat> */}
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          marginBottom: config.hp("2%"),
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "400",
            textTransform: "capitalize",
            color: theme.colors.primary,
          }}
        >
          Dest Accounts: {item.destAccountInfo?.length}
        </Text>
      </View>

      {/* <Text
        style={{
          fontSize: 18,
          //fontWeight: "400",
          textTransform: "capitalize",
          color: theme.colors.primary,
          marginBottom: config.hp("2%"),
        }}
      >
        Debit/Credit account: {item.account}
      </Text> */}

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <View
          style={{
            alignItems: "flex-start",
            justifyContent: "flex-start",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              textAlign: "right",
              color: theme.colors.primary,
            }}
          >
            Entered by:
          </Text>
          <Text
            style={{
              fontSize: 16,
              textAlign: "right",
              //marginBottom: config.hp("2%"),
            }}
          >
            {item.enteredBy}
          </Text>
        </View>
        <View
          style={{
            alignItems: "flex-start",
            justifyContent: "flex-start",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              textAlign: "right",
              color: theme.colors.primary,
            }}
          >
            Entered on:
          </Text>
          <Text
            style={{
              fontSize: 16,

              textAlign: "right",
              // marginBottom: config.hp("2%"),
            }}
          >
            {item.submitted}
          </Text>
        </View>
      </View>

      {/* <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
          width: "100%",
        }}
      >
        <Ionicons
          name="md-pencil"
          size={24}
          style={{ color: theme.colors.yellow, marginRight: 5 }}
        />
        <Ionicons name="trash" size={24} style={{ color: "#f44336" }} />
      </View> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default Template;
