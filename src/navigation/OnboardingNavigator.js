import React from "react";
import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Header from "../components/Header";
import Onboarding from "../screens/newOnboarding/Onboarding";

const Stack = createNativeStackNavigator();
const OnboardingNavigator = () => {
  return (
    <Stack.Navigator
      initialRoute="Onboarding"
      screenOptions={{ headerShown: true, headerBackVisible: false }}
    >
      <Stack.Screen
        name="Onboarding"
        component={Onboarding}
        options={{
          headerTitle: (props) => <Header {...props} />,
          headerTitleAlign: "center",
          headerBackVisible: false,
          headerLeft: () => {
            return null;
          },
        }}
      ></Stack.Screen>

      {/* <Stack.Screen
        name="Validate ID"
        component={IdVerification}
        options={{
          headerTitle: (props) => <Header {...props} />,
          headerTitleAlign: "center",
          headerBackVisible: false,
          headerLeft: () => {
            return null;
          },
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="Interview"
        component={Interview}
        options={{
          headerTitle: (props) => <Header {...props} />,
          headerTitleAlign: "center",
          headerBackVisible: false,
        }}
      ></Stack.Screen> */}
    </Stack.Navigator>
  );
};

export default OnboardingNavigator;
