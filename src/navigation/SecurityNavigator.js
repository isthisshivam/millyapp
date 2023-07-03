import React from "react";
import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GoBack from "../components/GoBack";
import Header from "../components/Header";
import SecuritySettings from "../screens/profile&settings/security/SecuritySettings";
import UpdatePassword from "../screens/profile&settings/security/updatePassword/UpdatePassword";
import UpdateQuestions from "../screens/profile&settings/security/updateQuestions/UpdateQuestions";

const Stack = createNativeStackNavigator();

const SecurityNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="Security"
      screenOptions={{ headerShown: true }}
    >
      <Stack.Screen
        name="Security"
        component={SecuritySettings}
        options={{
          headerTitle: "Security Center",
          headerTitleAlign: "center",
          headerBackVisible: false,
          headerLeft: () => {
            return <GoBack goTo={"profileMain"} navigation={navigation} />;
          },
        }}
      ></Stack.Screen>

      <Stack.Screen
        name="Update Password"
        component={UpdatePassword}
        options={{
          headerTitle: (props) => <Header {...props} />,
          headerTitleAlign: "center",
          headerBackVisible: false,
          headerLeft: () => {
            return <GoBack goTo={"Security"} navigation={navigation} />;
          },
        }}
      />
      <Stack.Screen
        name="Update Questions"
        component={UpdateQuestions}
        options={{
          headerTitle: (props) => <Header {...props} />,
          headerTitleAlign: "center",
          headerBackVisible: false,
          headerLeft: () => {
            return <GoBack goTo={"Security"} navigation={navigation} />;
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default SecurityNavigator;
