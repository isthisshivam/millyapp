import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";

import Header from "../components/Header";
import RegisterPath from "../screens/register/RegisterPath";
import RegisterFormContainer from "../screens/register/RegisterFormContainer";
import NewMemberScreen from "../screens/newMember/NewMemberScreen";
import LandingScreen from "../screens/landing/LandingScreen";
import Help from "../screens/landing/Help";
import NewMemberFormContainer from "../screens/newMember/NewMemberFormContainer";
import ChooseAccountScreen from "../screens/newMember/ChooseAccountScreen";
import ForgotPassword from "../screens/landing/ForgotPassword";
import GoBack from "../components/GoBack";
import Forgot from "../screens/authentication/Forgot";

import Onboarding from "../screens/newOnboarding/Onboarding";
import RegisterContainer from "../screens/newRegister/RegisterContainer";
import TwoFactor from "../screens/landing/TwoFactor";

const AuthNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LandingScreen}
          options={{
            headerTitle: (props) => <Header {...props} />,
            headerTitleAlign: "center",
            headerStyle: styles.nav,
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="Two Factor"
          component={TwoFactor}
          options={{
            headerTitle: (props) => <Header {...props} />,
            headerTitleAlign: "center",
            headerStyle: styles.nav,
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="Forgot"
          component={Forgot}
          options={({ navigation }) => ({
            headerTitle: (props) => <Header {...props} />,
            headerTitleAlign: "center",
            headerStyle: styles.nav,
            headerBackVisible: false,
            headerLeft: () => {
              return <GoBack navigation={navigation} />;
            },
          })}
        />
        <Stack.Screen
          name="Forgot Password"
          component={ForgotPassword}
          options={({ navigation }) => ({
            headerTitle: (props) => <Header {...props} />,
            headerTitleAlign: "center",
            headerStyle: styles.nav,
            headerBackVisible: false,
            headerLeft: () => {
              return <GoBack navigation={navigation} />;
            },
          })}
        />
        {/*<Stack.Screen
          name="Forgot"
          component={Forgo}
          options={({ navigation }) => ({
            headerTitle: (props) => <Header {...props} />,
            headerTitleAlign: "center",
            headerStyle: styles.nav,
            headerBackVisible: false,
            headerLeft: () => {
              return <GoBack navigation={navigation} />;
            },
          })}
        /> */}
        <Stack.Screen
          name="RegisterPath"
          component={RegisterPath}
          options={{
            headerTitle: (props) => <Header {...props} />,
            headerTitleAlign: "center",
            headerStyle: styles.nav,
            headerBackVisible: true,
            headerLeft: () => {
              return null;
            },
          }}
        />
        <Stack.Screen
          name="Onboarding"
          component={Onboarding}
          options={{
            headerTitle: (props) => <Header {...props} />,
            headerTitleAlign: "center",
            headerStyle: styles.nav,
            headerBackVisible: false,
            //headerShown: false,
            headerLeft: () => {
              return null;
            },
          }}
        />

        <Stack.Screen
          name="Register"
          component={RegisterContainer}
          options={{
            headerTitle: (props) => <Header {...props} />,
            headerTitleAlign: "center",
            headerStyle: styles.nav,
            headerLeft: () => {
              return null;
            },
          }}
        />
        <Stack.Screen
          name="NewMemberForms"
          component={NewMemberFormContainer}
          options={{
            headerTitle: (props) => <Header {...props} />,
            headerTitleAlign: "center",
            headerStyle: styles.nav,
            headerLeft: () => {
              return null;
            },
          }}
        />
        <Stack.Screen
          name="NewMemberPath"
          component={NewMemberScreen}
          options={{
            headerTitle: (props) => <Header {...props} />,
            headerTitleAlign: "center",
            headerStyle: styles.nav,
            headerLeft: () => {
              return null;
            },
          }}
        />
        <Stack.Screen
          name="ChooseAccount"
          component={ChooseAccountScreen}
          options={{
            headerTitle: (props) => <Header {...props} />,
            headerTitleAlign: "center",
            headerStyle: styles.nav,
            headerLeft: () => {
              return null;
            },
          }}
        />
      </Stack.Navigator>
      <Help></Help>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "#0EA44B",
    fontSize: 20,
  },
  nav: {
    backgroundColor: "white",
  },
  headerTitle: {
    color: "blue",
  },
  iconContainer: {
    height: "100%",
    width: 100,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  backIcon: {
    color: "black",
    fontSize: 20,
  },
  barText: {
    fontSize: 20,
  },
  container: {
    height: "100%",
  },
});

export default AuthNavigator;
