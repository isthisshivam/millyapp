import { View, Text, StyleSheet } from "react-native";
import React, { useState, useCallback } from "react";
import * as Progress from "react-native-progress";
import { useAppSelector, useAppDispatch } from "../../store/Store";
import { config } from "../../config/Config";
import { theme } from "../../config/Theme";
import Profile from "./interview/Profile";
import Household from "./household/Household";
import Vehicles from "./vehicles/Vehicles";
import Goals from "./goals/Goals";
import Settings from "./settings/Settings";
import WelcomeScreen from "./welcome/WelcomeScreen";
import { GetNameAndProfilePic } from "../../store/actions/ProfileAction";

type Props = {
  navigation: {
    navigate: (screen: string) => void;
    goBack: () => void;
  };
};

const Onboarding: React.FC<Props> = ({ navigation }) => {
  const state = useAppSelector((state) => state.onboarding);
  const [step, setStep] = useState<number>(0);
  const dispatch = useAppDispatch();

  function handleNext() {
    if (step < 6) {
      setStep(step + 1);
    }
  }
  function handleBack() {
    if (step > 0) {
      let newStep = step - 1;
      setStep(newStep);
    }
  }

  const handleStep = () => {
    switch (step) {
      case 0:
        return (
          <WelcomeScreen
            handleNext={handleNext}
            onboardingStyles={onboardingStyles}
          />
        );
      case 1:
        return (
          <Profile
            onboardingStyles={onboardingStyles}
            handleBack={handleBack}
            handleNext={handleNext}
          ></Profile>
        );

      case 2:
        return (
          <Household
            onboardingStyles={onboardingStyles}
            handleBack={handleBack}
            handleNext={handleNext}
          />
        );

      case 3:
        return (
          <Vehicles
            onboardingStyles={onboardingStyles}
            handleBack={handleBack}
            handleNext={handleNext}
          />
        );

      case 4:
        return (
          <Goals
            onboardingStyles={onboardingStyles}
            handleBack={handleBack}
            handleNext={handleNext}
          />
        );

      case 5:
        return (
          <Settings
            onboardingStyles={onboardingStyles}
            handleBack={handleBack}
            navigation={navigation}
          />
        );
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={{ alignItems: "center", width: "100%" }}>
        {step > 0 ? (
          <Progress.Bar
            progress={step / 5}
            width={config.wp("90%")}
            height={config.hp("2%")}
            borderRadius={12}
            color={theme.colors.primaryLight}
            style={{ marginVertical: config.hp("1%") }}
          />
        ) : undefined}
      </View>

      <View style={{ flex: 1 }}>{handleStep()}</View>
    </View>
  );
};

const onboardingStyles = StyleSheet.create({
  title: { color: theme.colors.primary, fontSize: 22, fontWeight: "500" },
  label: {
    color: theme.colors.primary,
    fontSize: 16,
    fontWeight: "400",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "white",
    fontSize: config.hp("2.05%"),
    height: config.hp("5%"),
    borderBottomColor: theme.colors.faded,
    borderBottomWidth: 1,
    marginBottom: config.hp("1%"),
    paddingHorizontal: config.wp("1%"),
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 12,
    paddingVertical: config.hp("1.35%"),
    width: "90%",
    elevation: config.hp(".5%"),
    marginBottom: config.hp("1%"),
  },
  buttonContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
    paddingVertical: config.hp("1%"),
    height: config.hp("12%"),
    marginBottom: config.hp("1%"),
  },
  buttonText: {
    color: "white",
    fontSize: config.hp("2.35%"),
    textAlign: "center",
    fontWeight: "500",
  },
});

export default Onboarding;
