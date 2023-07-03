import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";

const SmartConfirmation = ({ payload }) => {
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
            {payload.type.name}
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
            {payload.contactMethod}
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
          <Text style={{ fontSize: 18 }}>is {payload.trigger.name}</Text>
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
          {payload.trigger.id == 1 ? (
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
                {payload.fromAccount}
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
                {payload.fromAccount}
              </Text>
            </>
          )}
        </View>
      </View>
    </View>
  );
};

export default SmartConfirmation;

const styles = StyleSheet.create({});
