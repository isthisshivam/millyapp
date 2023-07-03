import React from "react";
import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Header from "../components/Header";
import UploadScreen from "../screens/eSafe/UploadScreen";
import SafeItemsScreen from "../screens/eSafe/SafeItemsScreen";

const Safe = createNativeStackNavigator();
const ESafeNavigator = () => {
  return (
    <Safe.Navigator screenOptions={{ headerShown: false }}>
      <Safe.Screen
        name="upload"
        component={UploadScreen}
        options={{
          headerTitle: (props) => <Header {...props} />,
          headerTitleAlign: "center",
          headerLeft: () => {
            return null;
          },
        }}
      ></Safe.Screen>
      <Safe.Screen
        name="items"
        component={SafeItemsScreen}
        options={{
          headerTitle: (props) => <Header {...props} />,
          headerTitleAlign: "center",
          headerLeft: () => {
            return null;
          },
        }}
      ></Safe.Screen>
    </Safe.Navigator>
  );
};

export default ESafeNavigator;
