import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import LottieView from "lottie-react-native";
import { Ionicons } from "@expo/vector-icons";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";
import {
  AlertTypeEnum,
  ComparisonOperators,
  CreateAlertType,
} from "../../../../types/alerts/alertTypes";

type Props = {
  payload: CreateAlertType;
};

const Confirmation: React.FC<Props> = ({ payload }) => {
  function handleType() {
    switch (payload.type) {
      case 0:
        return (
          <View style={styles.infoContainer}>
            <View style={styles.section}>
              <View style={styles.row}>
                <Text style={styles.text}>Alert Type: </Text>
                <Text
                  style={{
                    ...styles.text,
                    fontWeight: "500",
                    color: theme.colors.primary,
                  }}
                >
                  Account Alert
                </Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.text}>Alert Name: </Text>
                <Text
                  style={{
                    ...styles.text,
                    fontWeight: "500",
                    color: theme.colors.primary,
                  }}
                >
                  {payload.alert}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: 18 }}>Alert Method</Text>
                <Text
                  style={{
                    color: theme.colors.primary,
                    fontWeight: "500",
                    fontSize: 18,
                  }}
                >
                  {payload.text ? "Text" : payload.phone ? "Phone" : "Email"}
                </Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text
                style={{
                  fontSize: 20,
                  color: theme.colors.primary,
                  fontWeight: "500",
                  marginBottom: config.hp("1%"),
                }}
              >
                Alert me
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: config.hp(".5%"),
                }}
              >
                <Text style={{ fontSize: 18 }}>Whenever the balance of </Text>
                <Text
                  style={{
                    color: theme.colors.primary,
                    fontWeight: "500",
                    fontSize: 18,
                  }}
                >
                  {payload.accountId}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: 18 }}>
                  is{" "}
                  {payload.comparisonOperator == ComparisonOperators.LessThan
                    ? "Less than"
                    : "Greater than"}
                </Text>
                <Text
                  style={{
                    color: theme.colors.primary,
                    fontWeight: "500",
                    fontSize: 18,
                  }}
                >
                  ${payload.value}
                </Text>
              </View>
            </View>
          </View>
        );

      case 1:
        return (
          <View style={styles.infoContainer}>
            <View style={styles.section}>
              <View style={styles.row}>
                <Text style={styles.text}>Alert Type: </Text>
                <Text
                  style={{
                    ...styles.text,
                    fontWeight: "500",
                    color: theme.colors.primary,
                  }}
                >
                  Event Alert
                </Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.text}>Alert Name: </Text>
                <Text
                  style={{
                    ...styles.text,
                    fontWeight: "500",
                    color: theme.colors.primary,
                  }}
                >
                  {payload.alert}
                </Text>
              </View>
            </View>

            <View style={styles.section}>
              {/* <Text
                style={{
                  fontSize: 20,
                  color: theme.colors.primary,
                  fontWeight: "500",
                  marginBottom: config.hp("1%"),
                }}
              >
                Alert me
              </Text> */}

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: config.hp(".5%"),
                }}
              >
                <Text style={{ fontSize: 18 }}>Alert Date: </Text>
                <Text
                  style={{
                    color: theme.colors.primary,
                    fontWeight: "500",
                    fontSize: 18,
                  }}
                >
                  {payload.startDate}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: 18 }}>Alert Method</Text>
                <Text
                  style={{
                    color: theme.colors.primary,
                    fontWeight: "500",
                    fontSize: 18,
                  }}
                >
                  {payload.text ? "Text" : payload.email ? "Email" : "Phone"}
                </Text>
              </View>
            </View>
          </View>
        );

      case 2:
        return (
          <View style={styles.infoContainer}>
            <View style={styles.section}>
              <View style={styles.row}>
                <Text style={styles.text}>Alert Type: </Text>
                <Text
                  style={{
                    ...styles.text,
                    fontWeight: "500",
                    color: theme.colors.primary,
                  }}
                >
                  Smart Alert
                </Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.text}>Alert Name: </Text>
                <Text
                  style={{
                    ...styles.text,
                    fontWeight: "500",
                    color: theme.colors.primary,
                  }}
                >
                  {payload.alert}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: 18 }}>Alert Method</Text>
                <Text
                  style={{
                    color: theme.colors.primary,
                    fontWeight: "500",
                    fontSize: 18,
                  }}
                >
                  {payload.text ? "Text" : payload.email ? "Email" : "Phone"}
                </Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text
                style={{
                  fontSize: 20,
                  color: theme.colors.primary,
                  fontWeight: "500",
                  marginBottom: config.hp("1%"),
                }}
              >
                Alert me
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: config.hp(".5%"),
                }}
              >
                <Text style={{ fontSize: 18 }}>Whenever the balance of </Text>
                <Text
                  style={{
                    color: theme.colors.primary,
                    fontWeight: "500",
                    fontSize: 18,
                  }}
                >
                  {payload.accountId}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: config.hp(".5%"),
                }}
              >
                <Text style={{ fontSize: 18 }}>
                  is{" "}
                  {payload.comparisonOperator == ComparisonOperators.LessThan
                    ? "Less than"
                    : "Greater than"}
                </Text>
                <Text
                  style={{
                    color: theme.colors.primary,
                    fontWeight: "500",
                    fontSize: 18,
                  }}
                >
                  ${payload.value}
                </Text>
              </View>
            </View>
            <View style={styles.section}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "500",
                    color: theme.colors.primary,
                    marginBottom: config.hp(".5%"),
                  }}
                >
                  Transfer
                </Text>
                <Text
                  style={{
                    color: theme.colors.primary,
                    fontWeight: "500",
                    fontSize: 18,
                  }}
                >
                  ${payload.amount}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {payload.comparisonOperator == ComparisonOperators.LessThan ? (
                  <>
                    <Text
                      style={{
                        fontSize: 18,
                      }}
                    >
                      To
                    </Text>
                    <Text
                      style={{
                        color: theme.colors.primary,
                        fontWeight: "500",
                        fontSize: 18,
                      }}
                    >
                      {payload.fromAccountId}
                    </Text>
                  </>
                ) : (
                  <>
                    <Text
                      style={{
                        fontSize: 18,
                      }}
                    >
                      From
                    </Text>
                    <Text
                      style={{
                        color: theme.colors.primary,
                        fontWeight: "500",
                        fontSize: 18,
                      }}
                    >
                      {payload.fromAccountId}
                    </Text>
                  </>
                )}
              </View>
            </View>
          </View>
        );
    }
  }
  return (
    <>
      <View style={styles.container}>{handleType()}</View>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingVertical: config.hp("1%") },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: config.hp("1%"),
  },
  section: {
    marginBottom: config.hp("2%"),

    paddingBottom: config.hp("1%"),
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.faded,
  },
  text: {
    fontSize: 18,
  },
  inputContainer: {},
});

export default Confirmation;
