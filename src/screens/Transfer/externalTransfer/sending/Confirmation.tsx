import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";
import globalStyles from "../../../../globalStyles/styles";
import { ExternalPayload } from "../../../../../types/transfer/types";

type Props = {
  payload: ExternalPayload;
  handleSubmit: () => void;
  handleBack: () => void;
};

const Confirmation = ({ payload, handleSubmit, handleBack }: Props) => {
  return (
    <View style={{ flex: 1 }}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "600",
          color: theme.colors.primary,
          marginBottom: config.hp("2%"),
        }}
      >
        Transfers can take up to 3 business days for funds to arrive
      </Text>

      <View
        style={{
          flex: 1,
          alignItems: "center",
          backgroundColor: "white",
          borderWidth: 1,
          borderRadius: 12,
          borderColor: theme.colors.faded,
          paddingVertical: config.hp("2%"),
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
            color: theme.colors.primary,
          }}
        >
          Confirmation
        </Text>
        <Text
          style={{
            paddingHorizontal: config.wp("4%"),
            fontSize: 14,
            marginBottom: config.hp("4%"),
          }}
        >
          Please confirm the information below is correct. Once submitted
          transfers cannot be cancelled.
        </Text>

        <View
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: config.wp("12%"),
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              marginBottom: config.hp("1%"),
            }}
          >
            <Text
              style={{
                fontSize: 18,

                color: theme.colors.primary,
              }}
            >
              Send:
            </Text>
            <Text
              style={{
                fontSize: 18,

                color: theme.colors.primary,
              }}
            >
              ${payload.destinationAccounts[0].amount}
            </Text>
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
                fontSize: 18,

                color: theme.colors.primary,
              }}
            >
              From account:
            </Text>
            <Text
              style={{
                fontSize: 18,

                color: theme.colors.primary,
              }}
            >
              {payload.debitAccountId}
            </Text>
          </View>

          <Text
            style={{
              fontSize: 20,
              color: theme.colors.primary,
              fontWeight: "500",
              marginBottom: 10,
            }}
          >
            From External account
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              marginBottom: config.hp("1%"),
            }}
          >
            <Text style={{ fontSize: 18, color: theme.colors.primary }}>
              Routing Number:
            </Text>
            <Text style={{ fontSize: 18, color: theme.colors.primary }}>
              {payload.destinationAccounts[0].aba}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Text style={{ fontSize: 18, color: theme.colors.primary }}>
              Account Number:
            </Text>
            <Text style={{ fontSize: 18, color: theme.colors.primary }}>
              {payload.destinationAccounts[0].accountNumber}
            </Text>
          </View>
        </View>
      </View>
      <View style={globalStyles.submitButtonContainer}>
        <TouchableOpacity
          onPress={handleSubmit}
          style={globalStyles.submitButton}
        >
          <Text style={globalStyles.submitButtonText}>Submit</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleBack}>
          <Text>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Confirmation;
