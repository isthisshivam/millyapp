import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Header from "../components/Header";
import GoBack from "../components/GoBack";
import { MyTransition } from "./transitions";

import DepositScreen from "../screens/deposit/DepositScreen";
import DepositRecentActivity from "../screens/deposit/depositRecentActivity/DepositRecentActivity";
import DepositDetails from "../screens/deposit/depositDetails/DepositDetails";
import DepositDisclosures from "../screens/deposit/DepositDisclosures";

const DepositStack = createNativeStackNavigator();

const DepositNavigator = (props, { navigation }) => {
  return (
    <DepositStack.Navigator
      screenOptions={{
        ...MyTransition,
      }}
    >
      <DepositStack.Screen
        name="DepositMain"
        component={DepositScreen}
        options={{
          headerTitle: (props) => <Header {...props} />,
          headerTitleAlign: "center",
          headerLeft: () => {
            return <GoBack {...props} />;
          },
        }}
      ></DepositStack.Screen>

      <DepositStack.Screen
        name="DepositRecentActivity"
        component={DepositRecentActivity}
        options={{
          headerTitle: (props) => <Header {...props} />,
          headerTitleAlign: "center",
          headerBackVisible: false,
        }}
      />
      <DepositStack.Screen
        name="DepositDetails"
        component={DepositDetails}
        options={{
          headerTitle: (props) => <Header {...props} />,
          headerTitleAlign: "center",
          headerBackVisible: false,
          headerLeft: () => {
            return <GoBack {...props} goTo={"DepositRecentActivity"} />;
          },
        }}
      />
      <DepositStack.Screen
        name="Deposit Disclosures"
        component={DepositDisclosures}
        options={{
          headerTitle: (props) => <Header {...props} />,
          headerTitleAlign: "center",
          headerBackVisible: false,
          headerLeft: () => {
            return <GoBack {...props} goTo={"DepositMain"} />;
          },
        }}
      />
    </DepositStack.Navigator>
  );
};

export default DepositNavigator;
