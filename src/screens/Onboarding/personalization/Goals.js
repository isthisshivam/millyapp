import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import Button from "../../../components/Button";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";
import ButtonContainer from "../ButtonContainer";

const Goals = ({
  handleChange,
  payload,
  setPayload,
  step,
  next,
  back,
  cancel,
}) => {
  const goals = [
    "Improve Credit",
    "Save for a car",
    "Buy a house",
    "Spend less",
    "Invest",
    "Pay off debt",
  ];
  let selectedGoals = [];

  function selectGoal(goal) {
    if (payload.goals.includes(goal)) {
      let array = payload.goals.filter((item) => item != goal);
      setPayload({
        goals: array,
      });
      return;
    }
    setPayload({
      ...payload,
      goals: [...payload.goals, goal],
    });
  }

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
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          paddingHorizontal: config.wp("6%"),
          paddingTop: config.hp("8%"),
        }}
      >
        {goals.map((item, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => selectGoal(item)}
            style={{
              width: config.wp("40%"),
              backgroundColor: payload.goals.includes(item)
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
      <View
        style={{
          alignItems: "center",
          justifyContent: "flex-end",
          flex: 1,
        }}
      >
        <ButtonContainer
          step={step}
          next={next}
          back={back}
          cancel={cancel}
          navigation={null}
          submit={null}
        ></ButtonContainer>
      </View>
    </View>
  );
};

export default Goals;
