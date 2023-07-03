import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useAppSelector } from "../../../store/Store";
import LottieView from "lottie-react-native";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";
import SelfieScan from "./components/SelfieScan";
import IdScan from "./components/IdScan";
import { registerStyles } from "../registerStyles";

type Props = {
  handleNext: () => void;
  // navigation: {
  //   goBack: () => void;
  //   navigate: () => void;
  // };
};

const IdVerification = ({ handleNext }: Props) => {
  const state = useAppSelector((state) => state.register);
  //console.log(state);

  return (
    <>
      <ScrollView
        style={{
          flex: 1,
          paddingVertical: config.hp("2%"),
          paddingHorizontal: config.wp("4%"),
        }}
        contentContainerStyle={{ flex: 1 }}
      >
        <View style={{}}>
          <Text style={registerStyles.title}>Verification</Text>

          {state.attempts > 0 && state.attempts < 2 ? (
            <Text style={{ fontSize: 16, color: "red" }}>
              You have 1 more attempt remaining.
            </Text>
          ) : undefined}
        </View>
        {state.loading == true ? (
          <View
            style={{
              alignItems: "center",
              justifyContent: "flex-start",
              height: "100%",
              paddingTop: 25,
            }}
          >
            <LottieView
              loop
              autoPlay
              style={{
                width: 160,
                height: 160,
              }}
              source={require("../../../components/ui/loading-spinner.json")}
            />
            <Text>Verifying. This may take a while, please wait...</Text>
          </View>
        ) : state.idVerified || state.attempts == 2 ? (
          <SelfieScan
            handleNext={handleNext}
            // navigation={navigation}
          ></SelfieScan>
        ) : (
          <IdScan
            handleNext={handleNext}
            // navigation={navigation}
          ></IdScan>
        )}
      </ScrollView>
    </>
  );
};

export default IdVerification;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
  },
});
