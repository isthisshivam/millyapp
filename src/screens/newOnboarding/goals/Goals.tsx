import { View, Text, TouchableOpacity } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import AnimatedLottieView from "lottie-react-native";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";
import { useAppDispatch, useAppSelector } from "../../../store/Store";

const Goals = ({ onboardingStyles, handleNext, handleBack }) => {
  const state = useAppSelector((state) => state.onboarding);
  const [payload, setPayload] = useState<string[]>([]);

  const dispatch = useAppDispatch();
  const goals = [
    "Improve Credit",
    "Save for a car",
    "Buy a house",
    "Spend less",
    "Invest",
    "Pay off debt",
  ];
  let selectedGoals = [];

  const selectGoal = useCallback(
    (goal: string) => {
      if (payload.includes(goal)) {
        let array = payload.filter((item) => item != goal);
        setPayload(array);
        return;
      }
      setPayload([...payload, goal]);
    },
    [payload]
  );

  const handleSubmit = useCallback(() => {
    handleNext();
  }, []);

  useEffect(() => {
    if (state.status == true) {
      handleNext();
    }
    if (state.error || state.status == "Error") {
      dispatch({ type: "onboarding/reset" });
    }
  }, [state]);

  return (
    <View style={{ flex: 1 }}>
      <Text
        style={{
          fontSize: config.wp("6%"),
          paddingHorizontal: config.hp("2%"),
        }}
      >
        What goals are you working towards?
      </Text>

      {state.loading ? (
        <>
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
              source={require("../../../components/ui/loading-spinner.json")}
            />
          </View>
        </>
      ) : (
        <>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              paddingHorizontal: config.wp("6%"),
              paddingTop: config.hp("8%"),
              flex: 1,
            }}
          >
            {goals?.map((item, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => selectGoal(item)}
                style={{
                  width: config.wp("40%"),
                  backgroundColor: payload.includes(item)
                    ? theme.colors.primary
                    : "gray",
                  marginBottom: 40,
                  height: 60,
                  borderRadius: 6,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "white" }}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={onboardingStyles.buttonContainer}>
            <TouchableOpacity onPress={handleNext}>
              <Text style={{ fontSize: 16 }}>skip</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSubmit}
              style={onboardingStyles.button}
            >
              <Text style={onboardingStyles.buttonText}>Continue</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleBack}>
              <Text style={{ fontSize: 16, fontWeight: "500" }}>Back</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default Goals;
