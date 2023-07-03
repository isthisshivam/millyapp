import React from "react";
import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, FontAwesome5, MaterialIcons } from "@expo/vector-icons";

import { config } from "../config/Config";
import { theme } from "../config/Theme";

import TransferNavigator from "./TransferNavigator";
import DepositNavigator from "./DepositNavigator";
import BillpayNavigator from "./BillpayNavigator";
import HomeNavigator from "./HomeNavigator";
import TextButton from "../components/TextButton";
import { useRoute } from "@react-navigation/native";
import { useAppSelector } from "../store/Store";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const state = useAppSelector((state) => state.appState);

  return (
    <>
      <Tab.Navigator
        initialRouteName="homeTab"
        screenOptions={{
          tabBarHideOnKeyboard: true,
          activeTintColor: theme.colors.primary,
          activeBackgroundColor: theme.colors.primary,
          inactiveTintColor: theme.colors.inActive,
          tabStyle: {
            backgroundColor: "#FFFFFF",
          },
          labelStyle: {
            fontSize: config.hp("1.75%"),
          },
          keyboardHidesTabBar: true,
          headerShown: false,
        }}
      >
        <Tab.Screen
          name="homeTab"
          component={HomeNavigator}
          options={{
            tabBarLabel: ({ focused }) => (
              <Text
                style={{
                  color: focused ? theme.colors.primary : theme.colors.inActive,
                  fontSize: 14,
                }}
              >
                Home
              </Text>
            ),
            tabBarColor: theme.colors.primary,
            tabBarLabelPosition: "below-icon",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="home-outline"
                size={focused ? 24 : 22}
                color={focused ? theme.colors.primary : theme.colors.inActive}
                backgroundColor={
                  focused ? theme.colors.primary : theme.colors.inActive
                }
              />
            ),
          }}
        />
        <Tab.Screen
          name="Deposit"
          component={DepositNavigator}
          options={{
            tabBarLabel: ({ focused }) => (
              <Text
                style={{
                  color: focused ? theme.colors.primary : theme.colors.inActive,
                  fontSize: 14,
                }}
              >
                Deposit
              </Text>
            ),
            tabBarColor: "black",
            tabBarIcon: ({ focused }) => (
              <FontAwesome5
                name="money-check"
                size={focused ? 24 : 22}
                color={focused ? theme.colors.primary : theme.colors.inActive}
                backgroundColor={
                  focused ? theme.colors.primary : theme.colors.inActive
                }
              />
            ),
          }}
        />
        <Tab.Screen
          name="transferTab"
          component={TransferNavigator}
          options={{
            tabBarColor: "black",
            tabBarLabel: ({ focused }) => (
              <Text
                style={{
                  color: focused ? theme.colors.primary : theme.colors.inActive,
                  fontSize: 14,
                }}
              >
                Transfer
              </Text>
            ),
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="swap-horizontal"
                size={focused ? 24 : 22}
                color={focused ? theme.colors.primary : theme.colors.inActive}
                backgroundColor={
                  focused ? theme.colors.primary : theme.colors.inActive
                }
              />
            ),
          }}
        />
        <Tab.Screen
          name="BillPayStack"
          component={BillpayNavigator}
          options={{
            tabBarLabel: "Bill Pay",
            tabBarColor: "black",
            tabBarLabel: ({ focused }) => (
              <Text
                style={{
                  color: focused ? theme.colors.primary : theme.colors.inActive,
                  fontSize: 14,
                }}
              >
                BillPay
              </Text>
            ),
            tabBarIcon: ({ focused }) => (
              <MaterialIcons
                name="attach-money"
                size={focused ? 24 : 22}
                color={focused ? theme.colors.primary : theme.colors.inActive}
                backgroundColor={
                  focused ? theme.colors.primary : theme.colors.inActive
                }
              />
            ),
          }}
        />
        <Tab.Screen
          name="blank"
          component=""
          options={{
            tabBarLabel: "Menu",
            tabBarColor: "black",
            tabBarLabel: ({ focused }) => (
              <Text
                style={{
                  color: focused ? theme.colors.primary : theme.colors.inActive,
                  fontSize: 14,
                }}
              >
                Menu
              </Text>
            ),
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="menu-outline"
                size={focused ? 24 : 22}
                color={focused ? theme.colors.primary : theme.colors.inActive}
                backgroundColor={
                  focused ? theme.colors.primary : theme.colors.inActive
                }
              />
            ),
          }}
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              e.preventDefault();
              navigation.openDrawer();
            },
          })}
        />
      </Tab.Navigator>
      {state.showFab == false ? undefined : <TextButton />}
    </>
  );
};

export default BottomTabNavigator;
