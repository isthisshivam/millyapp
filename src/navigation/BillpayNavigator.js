import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Header from "../components/Header";
import GoBack from "../components/GoBack";
import { MyTransition } from "./transitions";

import BillPayScreen from "../screens/BillPay/BillPayScreen";
import PendingScreen from "../screens/BillPay/pending/PendingScreen";
import MerchantScreen from "../screens/BillPay/Merchants/MerchantScreen";
import HistoryScreen from "../screens/BillPay/history/HistoryScreen";
import AddMerchant from "../screens/BillPay/Merchants/AddMerchant/AddMerchant";
import AddMerchantWithPay from "../screens/BillPay/Merchants/addMerchantWithPay/AddMerchantWithPay";
import EditMerchant from "../screens/BillPay/Merchants/EditMerchant/EditMerchant";
import MakePaymentScreen from "../screens/BillPay/payment/MakePaymentScreen";
//import MakePaymentQuickPayScreen from "../screens/BillPay/payment/quickPayExistingMerchant/MakePaymentQuickPayScreen";
import PaymentDetailScreen from "../screens/BillPay/history/PaymentDetailScreen";
import CreateAccount from "../screens/BillPay/createAccount/CreateAccount";
import EditPending from "../screens/BillPay/pending/EditPending";

const BillPayStack = createNativeStackNavigator();

const TabBillPayStack = () => {
  return (
    <BillPayStack.Navigator
      screenOptions={{
        ...MyTransition,
      }}
    >
      <BillPayStack.Screen
        name="TabBillPay"
        component={BillPayScreen}
        options={({ navigation }) => ({
          headerTitle: (props) => <Header {...props} />,
          headerTitleAlign: "center",
          ////headerBackVisible: false,
          headerLeft: () => {
            return <GoBack navigation={navigation} />;
          },
        })}
      />
      <BillPayStack.Screen
        name="Create BillPay"
        component={CreateAccount}
        options={({ navigation }) => ({
          headerTitle: (props) => <Header {...props} />,
          headerTitleAlign: "center",
          //headerBackVisible: false,
          headerLeft: () => {
            return <GoBack navigation={navigation} />;
          },
        })}
      />
      <BillPayStack.Screen
        name="BillPayPending"
        component={PendingScreen}
        options={({ navigation }) => ({
          headerTitle: (props) => <Header {...props} />,
          headerTitleAlign: "center",
          //headerBackVisible: false,
          headerLeft: () => {
            return <GoBack navigation={navigation} />;
          },
        })}
      />
      <BillPayStack.Screen
        name="Edit Pending Billpay"
        component={EditPending}
        options={({ navigation }) => ({
          headerTitle: (props) => <Header {...props} />,
          headerTitleAlign: "center",
          //headerBackVisible: false,
          headerLeft: () => {
            return <GoBack navigation={navigation} />;
          },
        })}
      />
      <BillPayStack.Screen
        name="BillPayMerchants"
        component={MerchantScreen}
        options={({ navigation }) => ({
          headerTitle: (props) => <Header {...props} />,
          headerTitleAlign: "center",
          //headerBackVisible: false,
          headerLeft: () => {
            return <GoBack navigation={navigation} />;
          },
        })}
      />
      <BillPayStack.Screen
        name="BillPayHistory"
        component={HistoryScreen}
        options={({ navigation }) => ({
          headerTitle: (props) => <Header {...props} />,
          headerTitleAlign: "center",
          //headerBackVisible: false,
          headerLeft: () => {
            return <GoBack navigation={navigation} />;
          },
        })}
      />
      <BillPayStack.Screen
        name="PaymentDetails"
        component={PaymentDetailScreen}
        options={({ navigation }) => ({
          headerTitle: (props) => <Header {...props} />,
          headerTitleAlign: "center",
          //headerBackVisible: false,
          headerLeft: () => {
            return <GoBack navigation={navigation} />;
          },
        })}
      />
      <BillPayStack.Screen
        name="AddNewMerchant"
        component={AddMerchant}
        options={({ navigation }) => ({
          headerTitle: (props) => <Header {...props} />,
          headerTitleAlign: "center",
          //headerBackVisible: false,
          headerLeft: () => {
            return <GoBack navigation={navigation} />;
          },
        })}
      />
      <BillPayStack.Screen
        name="AddNewMerchantWithPay"
        component={AddMerchantWithPay}
        options={({ navigation }) => ({
          headerTitle: (props) => <Header {...props} />,
          headerTitleAlign: "center",
          //headerBackVisible: false,
          headerLeft: () => {
            return <GoBack navigation={navigation} />;
          },
        })}
      />
      <BillPayStack.Screen
        name="EditMerchant"
        component={EditMerchant}
        options={({ navigation }) => ({
          headerTitle: (props) => <Header {...props} />,
          headerTitleAlign: "center",
          //headerBackVisible: false,
          headerLeft: () => {
            return <GoBack navigation={navigation} />;
          },
        })}
      />
      <BillPayStack.Screen
        name="PayMerchant"
        component={MakePaymentScreen}
        options={({ navigation }) => ({
          headerTitle: (props) => <Header {...props} />,
          headerTitleAlign: "center",
          ////headerBackVisible: false,
          headerLeft: () => {
            return <GoBack navigation={navigation} />;
          },
        })}
      />
      {/* <BillPayStack.Screen
        name="QuickPayExisting"
        component={MakePaymentQuickPayScreen}
        options={({ navigation }) => ({
            headerTitle: (props) => <Header {...props} />,
            headerTitleAlign: "center",
            //headerBackVisible: false,
            headerLeft: () => {
              return <GoBack navigation={navigation} />;
            },
          })}
      /> */}
    </BillPayStack.Navigator>
  );
};

export default TabBillPayStack;
