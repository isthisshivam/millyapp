import React from "react";
import { StatusBar } from "expo-status-bar";
import { withTheme } from "react-native-paper";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useIsFocused } from "@react-navigation/native";
import Header from "../components/Header";
import GoBack from "../components/GoBack";
import { theme } from "../config/Theme";

import AccountScreen from "../screens/Account/AccountScreen";
import StopPayment from "../screens/Account/accountTabs/stopPayment/StopPayment";
import CheckWithdrawal from "../screens/Account/accountTabs/checkWithdrawal/CheckWithdrawal";
import AccountTileSettings from "../screens/Account/accountTileSettings/AccountTileSettings";
import CardControls from "../screens/cardControls/CardControlsScreen";

////////////ALERTS ///////////////////////
import AlertScreen from "../screens/Alerts/AlertScreen/AlertScreen";
import CreateAlertScreen from "../screens/Alerts/CreateAlert/CreateAlertScreen";
import EditAlertScreen from "../screens/Alerts/Edit/EditAlertScreen";

import EStatementScreen from "../screens/eStatements/EStatementScreen";
import EMessageCenterScreen from "../screens/eMessageCenter/EMessageCenterScreen";
import CreateMessageScreen from "../screens/eMessageCenter/createMsg/CreateMessageScreen";
import MessageDetailScreen from "../screens/eMessageCenter/message/MessageDetailScreen";
import HomeScreen from "../screens/home/HomeScreen";
import MyAccounts from "../screens/Account/myAccounts/MyAccounts";
import AccountActivityScreen from "../screens/Account/accountActivity/AccountActivityScreen";
import TransactionDetailScreen from "../screens/Account/accountActivity/TransactionDetailScreen";
// import StatementDetailScreen from "../screens/Account/accountTabs/AccountHistory/statements/StatementDetailScreen";
import SubscriptionNavigator from "./SubscriptionNavigator";

import MissionScreen from "../screens/missions/MissionScreen";
import RewardsScreen from "../screens/missions/rewards/RewardsScreen";

import ProfileAndSettingsNavigation from "./ProfileAndSettingsNavigation";
import ESafeNavigator from "./ESafeNavigator";

//import OnboardingScreen from "../screens/Onboarding/OnboardingScreen";
import MessageThread from "../screens/eMessageCenter/messageThread/MessageThread";
import AdminNavigator from "./AdminNavigator";
import TextButton from "../components/TextButton";

const HomeStack = createNativeStackNavigator();

const HomeNavigator = () => {
  return (
    <>
      <HomeStack.Navigator initialRouteName="Home">
        <HomeStack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            animation: "none",
            headerTitle: (props) => <Header {...props} />,
            headerTitleAlign: "center",
            // headerShown: false,
          }}
        />
        <HomeStack.Screen
          options={{
            //animation: "none",
            headerTitle: (props) => <Header {...props} />,
            headerTitleAlign: "center",

            headerShown: false,
          }}
          name="Admin"
          component={AdminNavigator}
        ></HomeStack.Screen>
        <HomeStack.Screen
          name="Accounts"
          component={MyAccounts}
          options={({ navigation }) => ({
            headerTitle: (props) => <Header {...props} />,
            headerTitleAlign: "center",
            headerBackVisible: false,
            headerLeft: () => {
              return <GoBack navigation={navigation} />;
            },
          })}
        />

        <HomeStack.Screen
          name="AccountActivity"
          component={AccountActivityScreen}
          options={({ navigation }) => ({
            headerTitle: (props) => <Header {...props} />,
            headerTitleAlign: "center",
            headerBackVisible: false,
            headerLeft: () => {
              return <GoBack navigation={navigation} />;
            },
          })}
        />
        <HomeStack.Screen
          name="TransactionDetails"
          component={TransactionDetailScreen}
          options={({ navigation }) => ({
            headerTitle: (props) => <Header {...props} />,
            headerTitleAlign: "center",
            headerBackVisible: false,
            headerLeft: () => {
              return <GoBack navigation={navigation} />;
            },
          })}
        />
        <HomeStack.Screen
          name="Account"
          component={AccountScreen}
          options={({ route, navigation }) => ({
            headerTitle: (props) => <Header {...props} />,
            headerTitleAlign: "center",
            headerBackVisible: false,
            headerLeft: () => {
              return <GoBack navigation={navigation} route={route} />;
            },
          })}
        />
        <HomeStack.Screen
          name="Stop Payment"
          component={StopPayment}
          options={({ route, navigation }) => ({
            headerTitle: (props) => <Header {...props} />,
            headerTitleAlign: "center",
            headerBackVisible: false,
            headerLeft: () => {
              return <GoBack navigation={navigation} route={route} />;
            },
          })}
        />
        <HomeStack.Screen
          name="Check Withdrawal"
          component={CheckWithdrawal}
          options={({ route, navigation }) => ({
            headerTitle: (props) => <Header {...props} />,
            headerTitleAlign: "center",
            headerBackVisible: false,
            headerLeft: () => {
              return <GoBack navigation={navigation} route={route} />;
            },
          })}
        />
        <HomeStack.Screen
          name="AccountTileSettings"
          component={AccountTileSettings}
          options={({ navigation }) => ({
            headerTitle: `Account Apperance`,
            headerTitleAlign: "center",
            headerBackVisible: false,
            headerLeft: () => {
              return <GoBack navigation={navigation} />;
            },
          })}
        />
        <HomeStack.Screen
          name="AlertEdit"
          component={EditAlertScreen}
          options={({ navigation }) => ({
            headerTitle: (props) => <Header {...props} />,
            headerTitleAlign: "center",
            headerBackVisible: false,
            headerLeft: () => {
              return <GoBack navigation={navigation} />;
            },
          })}
        />
        <HomeStack.Screen
          name="Alerts"
          options={({ navigation }) => ({
            headerTitle: (props) => <Header {...props} />,
            headerTitleAlign: "center",
            headerBackVisible: false,
            headerLeft: () => {
              return <GoBack navigation={navigation} />;
            },
          })}
        >
          {(props) => <AlertScreen theme={theme} {...props} />}
        </HomeStack.Screen>
        <HomeStack.Screen
          name="CardControls"
          component={CardControls}
          options={({ navigation }) => ({
            headerTitle: (props) => <Header {...props} />,
            headerTitleAlign: "center",
            headerBackVisible: false,
            headerLeft: () => {
              return <GoBack navigation={navigation} />;
            },
          })}
        />
        <HomeStack.Screen
          name="CreateAlert"
          options={({ navigation }) => ({
            headerTitle: (props) => <Header {...props} />,
            headerTitleAlign: "center",
            headerBackVisible: false,
            headerLeft: () => {
              return <GoBack navigation={navigation} />;
            },
          })}
          component={CreateAlertScreen}
        />
        <HomeStack.Screen
          name="E-statements"
          options={({ navigation }) => ({
            headerTitle: (props) => <Header {...props} />,
            headerTitleAlign: "center",
            headerBackVisible: false,
            headerLeft: () => {
              return <GoBack navigation={navigation} />;
            },
          })}
          component={EStatementScreen}
        />
        <HomeStack.Screen
          name="e-Message Center"
          options={({ navigation }) => ({
            headerTitleAlign: "center",
            headerTitleStyle: {
              color: theme.colors.primary,
              fontWeight: "500",
            },
            headerBackVisible: false,
            headerLeft: () => {
              return <GoBack navigation={navigation} />;
            },
          })}
          component={EMessageCenterScreen}
        />
        <HomeStack.Screen
          name="Missions"
          options={({ navigation }) => ({
            headerTitle: (props) => <Header {...props} />,
            headerTitleAlign: "center",
            headerBackVisible: false,
            headerLeft: () => {
              return <GoBack navigation={navigation} />;
            },
          })}
          component={MissionScreen}
        />
        <HomeStack.Screen
          name="Rewards"
          options={({ navigation }) => ({
            headerTitle: (props) => <Header {...props} />,
            headerTitleAlign: "center",
            headerBackVisible: false,
            headerLeft: () => {
              return <GoBack navigation={navigation} />;
            },
          })}
          component={RewardsScreen}
        />

        <HomeStack.Screen
          name="msgDetails"
          options={({ navigation }) => ({
            headerTitle: (props) => <Header {...props} />,
            headerTitleAlign: "center",
            headerBackVisible: false,
            headerLeft: () => {
              return <GoBack navigation={navigation} />;
            },
          })}
          component={MessageDetailScreen}
        />
        <HomeStack.Screen
          name="msgThread"
          options={({ navigation }) => ({
            headerTitle: (props) => <Header {...props} />,
            headerTitleAlign: "center",
            headerBackVisible: false,
            headerLeft: () => {
              return <GoBack navigation={navigation} />;
            },
          })}
          component={MessageThread}
        />
        <HomeStack.Screen
          name="CreateMsg"
          options={({ navigation }) => ({
            headerTitle: "e-Message Center",
            headerTitleAlign: "center",
            headerBackVisible: false,
            headerLeft: () => {
              return <GoBack navigation={navigation} />;
            },
          })}
          component={CreateMessageScreen}
        />
        <HomeStack.Screen
          name="e-safe"
          options={({ navigation }) => ({
            headerTitle: (props) => <Header {...props} />,
            headerTitleAlign: "center",
            headerBackVisible: false,
            headerLeft: () => {
              return <GoBack navigation={navigation} />;
            },
          })}
          component={ESafeNavigator}
        />
        <HomeStack.Screen
          name="Profile/Settings"
          options={({ navigation }) => ({
            headerShown: false,
            headerBackVisible: false,
            headerLeft: () => {
              return <GoBack navigation={navigation} />;
            },
          })}
          component={ProfileAndSettingsNavigation}
        />
        {/* <HomeStack.Screen
          name="StatementDetails"
          options={({ navigation }) => ({
            headerTitle: (props) => <Header {...props} />,

            headerBackVisible: false,
            headerLeft: () => {
              return <GoBack navigation={navigation} />;
            },
          })}
          component={StatementDetailScreen}
        /> */}
        <HomeStack.Screen
          name="Subscriptions"
          options={({ navigation }) => ({
            headerShown: false,
            headerBackVisible: false,
            headerLeft: () => {
              return <GoBack navigation={navigation} />;
            },
          })}
          component={SubscriptionNavigator}
        />
      </HomeStack.Navigator>
      {/* <TextButton /> */}
    </>
  );
};

export default HomeNavigator;
