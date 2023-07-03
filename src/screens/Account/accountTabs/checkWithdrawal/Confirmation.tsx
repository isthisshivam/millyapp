import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import AnimatedLottieView from "lottie-react-native";

import React from "react";
import globalStyles from "../../../../globalStyles/styles";
import { useAppSelector } from "../../../../store/Store";
import { theme } from "../../../../config/Theme";
import { config } from "../../../../config/Config";

type Props = {
  payload: {
    amount: number;
    description: string;
    accountId: string;
  };
  handleSubmit: () => void;
  handleBack: () => void;
};

const Confirmation: React.FC<Props> = ({
  payload,
  handleSubmit,
  handleBack,
}) => {
  const state = useAppSelector((state) => state.alerts);
  return (
    <View style={{ flex: 1 }}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "500",
          color: theme.colors.primary,
          marginBottom: config.hp("2%"),
        }}
      >
        Confirmation
      </Text>
      {state.loading ? (
        <View
          style={{
            alignItems: "center",
            justifyContent: "flex-start",
            height: "100%",
            paddingTop: 25,
          }}
        >
          <AnimatedLottieView
            loop
            autoPlay
            style={{
              width: 160,
              height: 160,
            }}
            source={require("../../../../components/ui/loading-spinner.json")}
          />
        </View>
      ) : (
        <>
          <View style={{ flex: 1, paddingHorizontal: config.hp("4%") }}>
            <View style={globalStyles.inputContainer}>
              <Text
                style={{
                  fontSize: 16,
                  color: theme.colors.primary,
                  fontWeight: "500",
                }}
              >
                Account
              </Text>
              <Text>{payload.accountId}</Text>
            </View>
            <View style={globalStyles.inputContainer}>
              <Text
                style={{
                  fontSize: 16,
                  color: theme.colors.primary,
                  fontWeight: "500",
                }}
              >
                Amount
              </Text>
              <Text>${payload.amount}</Text>
            </View>
            <View style={globalStyles.inputContainer}>
              <Text
                style={{
                  fontSize: 16,
                  color: theme.colors.primary,
                  fontWeight: "500",
                }}
              >
                Description
              </Text>
              <Text>{payload.description}</Text>
            </View>
          </View>
          <View style={globalStyles.submitButtonContainer}>
            <TouchableOpacity
              onPress={handleSubmit}
              style={globalStyles.submitButton}
            >
              <Text style={globalStyles.submitButtonText}>Continue</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleBack}>
              <Text style={{ fontSize: 16 }}>Back</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default Confirmation;

const styles = StyleSheet.create({});
