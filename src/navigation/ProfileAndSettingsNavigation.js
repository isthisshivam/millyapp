import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GoBack from "../components/GoBack";
import Header from "../components/Header";

import ProfileAndSettingsScreen from "../screens/profile&settings/ProfileAndSettingsScreen";

import AccountSettings from "../screens/profile&settings/accountSettings/AccountSettings";
import EditContactInfo from "../screens/profile&settings/accountSettings/contactInfo/EditContactInfo";
import DeleteAccount from "../screens/profile&settings/accountSettings/deleteAccount/DeleteAccount";

import Expenses from "../screens/profile&settings/expenses/Expenses";
import AddExpense from "../screens/profile&settings/expenses/addExpense/AddExpense";
import EditExpense from "../screens/profile&settings/expenses/editExpense/EditExpense";

import RemindersScreen from "../screens/profile&settings/reminders/RemindersScreen";
import AddReminder from "../screens/profile&settings/reminders/addReminder/AddReminder";

import SecurityNavigator from "./SecurityNavigator";
import HouseNavigator from "./HouseNavigator";
import Goals from "../screens/profile&settings/goals/Goals";
import Disclosures from "../screens/profile&settings/disclosures/Disclosures";
import EditReminder from "../screens/profile&settings/reminders/editReminder/EditReminder";

const ProfileAndSettingsStack = createNativeStackNavigator();

const ProfileAndSettingsNavigation = ({ navigation }) => {
  return (
    <ProfileAndSettingsStack.Navigator
      initialRouteName="profileMain"
      screenOptions={{}}
    >
      <ProfileAndSettingsStack.Screen
        name="profileMain"
        component={ProfileAndSettingsScreen}
        options={{
          headerTitle: (props) => <Header {...props} />,
          headerTitleAlign: "center",
          headerBackVisible: false,
          // headerLeft: () => {
          //   return <GoBack navigation={navigation} />;
          // },
        }}
      />
      <ProfileAndSettingsStack.Screen
        name="Account Settings"
        component={AccountSettings}
        options={{
          headerTitle: (props) => <Header {...props} />,
          headerTitleAlign: "center",
          headerBackVisible: false,
          headerLeft: () => {
            return <GoBack goTo={"profileMain"} navigation={navigation} />;
          },
        }}
      />
      <ProfileAndSettingsStack.Screen
        name="Security Settings"
        component={SecurityNavigator}
        options={{
          headerShown: false,
          headerBackVisible: false,
          // headerLeft: () => {
          //   return <GoBack goTo={"profileMain"} navigation={navigation} />;
          // },
        }}
      />

      <ProfileAndSettingsStack.Screen
        name="House"
        component={HouseNavigator}
        options={{
          headerTitleAlign: "center",
          headerBackVisible: false,
          headerShown: false,
          headerLeft: () => {
            return <GoBack goTo={"profileMain"} navigation={navigation} />;
          },
        }}
      />
      {/* ////////////////////////////////////////////////////////////////////////////// */}

      <ProfileAndSettingsStack.Screen
        name="Reminders"
        component={RemindersScreen}
        options={{
          headerTitle: (props) => <Header {...props} />,
          headerTitleAlign: "center",
          headerBackVisible: false,
          headerLeft: () => {
            return <GoBack goTo={"profileMain"} navigation={navigation} />;
          },
        }}
      />
      <ProfileAndSettingsStack.Screen
        name="Add Reminder"
        component={AddReminder}
        options={{
          headerTitle: (props) => <Header {...props} />,
          headerTitleAlign: "center",
          headerBackVisible: false,
          headerLeft: () => {
            return <GoBack navigation={navigation} />;
          },
        }}
      />
      <ProfileAndSettingsStack.Screen
        name="Edit Reminder"
        component={EditReminder}
        options={{
          headerTitle: (props) => <Header {...props} />,
          headerTitleAlign: "center",
          headerBackVisible: false,
          headerLeft: () => {
            return <GoBack navigation={navigation} />;
          },
        }}
      />
      {/* ////////////////////////////////////////////////////////////////////////////// */}
      <ProfileAndSettingsStack.Screen
        name="editContactInfo"
        component={EditContactInfo}
        options={{
          headerTitle: (props) => <Header {...props} />,
          headerTitleAlign: "center",
          headerBackVisible: false,
          headerLeft: () => {
            return <GoBack goTo={"profileMain"} navigation={navigation} />;
          },
        }}
      />

      <ProfileAndSettingsStack.Screen
        name="Delete Account"
        component={DeleteAccount}
        options={{
          headerTitle: (props) => <Header {...props} />,
          headerTitleAlign: "center",
          headerBackVisible: false,
          headerLeft: () => {
            return <GoBack navigation={navigation} />;
          },
        }}
      />

      <ProfileAndSettingsStack.Screen
        name="Expenses"
        component={Expenses}
        options={{
          headerTitle: (props) => <Header {...props} />,
          headerTitleAlign: "center",
          headerBackVisible: false,
          headerLeft: () => {
            return <GoBack goTo={"profileMain"} navigation={navigation} />;
          },
        }}
      />

      <ProfileAndSettingsStack.Screen
        name="Add Expense"
        component={AddExpense}
        options={{
          headerTitle: (props) => <Header {...props} />,
          headerTitleAlign: "center",
          headerBackVisible: false,
          headerLeft: () => {
            return <GoBack goTo={"Expenses"} navigation={navigation} />;
          },
        }}
      />
      <ProfileAndSettingsStack.Screen
        name="editExpense"
        component={EditExpense}
        options={{
          headerTitle: (props) => <Header {...props} />,
          headerTitleAlign: "center",
          headerBackVisible: false,
          headerLeft: () => {
            return <GoBack goTo={"Expenses"} navigation={navigation} />;
          },
        }}
      />
      <ProfileAndSettingsStack.Screen
        name="Goals"
        component={Goals}
        options={{
          headerTitle: (props) => <Header {...props} />,
          headerTitleAlign: "center",
          headerBackVisible: false,
          headerLeft: () => {
            return <GoBack goTo={"profileMain"} navigation={navigation} />;
          },
        }}
      />
      <ProfileAndSettingsStack.Screen
        name="Disclosures"
        component={Disclosures}
        options={{
          headerTitle: (props) => <Header {...props} />,
          headerTitleAlign: "center",
          headerBackVisible: false,
          headerLeft: () => {
            return <GoBack goTo={"profileMain"} navigation={navigation} />;
          },
        }}
      />
    </ProfileAndSettingsStack.Navigator>
  );
};

export default ProfileAndSettingsNavigation;
