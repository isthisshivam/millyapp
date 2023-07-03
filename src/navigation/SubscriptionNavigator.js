import React from "react";
import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GoBack from "../components/GoBack";
import Header from "../components/Header";
import SubscriptionsScreen from "../screens/subscriptions/SubscriptionsScreen";
import AddSubscription from "../screens/subscriptions/addSubscription/AddSubscription";
import EditSubscriptions from "../screens/subscriptions/editSubscription/EditSubscription";

const Stack = createNativeStackNavigator();

const SubscriptionNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="Subscription Tracker"
      screenOptions={{ headerShown: true }}
    >
      <Stack.Screen
        name="Subscription Tracker"
        component={SubscriptionsScreen}
        options={{
          headerTitle: (props) => <Header {...props} />,
          headerTitleAlign: "center",
          headerBackVisible: false,
          headerLeft: () => {
            return <GoBack navigation={navigation} />;
          },
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="Add Subscription"
        component={AddSubscription}
        options={{
          headerTitle: (props) => <Header {...props} />,
          headerTitleAlign: "center",
          headerBackVisible: false,
          headerLeft: () => {
            return <GoBack navigation={navigation} />;
          },
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="Edit Subscription"
        component={EditSubscriptions}
        options={{
          headerTitle: (props) => <Header {...props} />,
          headerTitleAlign: "center",
          headerBackVisible: false,
          headerLeft: () => {
            return <GoBack navigation={navigation} />;
          },
        }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default SubscriptionNavigator;
