import React from "react";
import Header from "../components/Header";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EditAccount from "../screensCommercial/users/editAccount/EditAccount";
import Users from "../screensCommercial/users/Users";
import CashACH from "../screensCommercial/cashACh/CashACH";
import EditPermissions from "../screensCommercial/users/components/EditPermissions";
import CommercialScreen from "../screensCommercial/CommercialScreen";
import Requests from "../screensCommercial/requests/Requests";
import Pending from "../screensCommercial/pending/Pending";
import Collect from "../screensCommercial/cashACh/collectMoney/Collect";
import Send from "../screensCommercial/cashACh/sendMoney/Send";
import AchRequests from "../screensCommercial/cashACh/admin/achRequests/AchRequests";
import TemplateRequest from "../screensCommercial/cashACh/components/templateRequest/TemplateRequest";
import History from "../screensCommercial/cashACh/history/History";
import TemplateApproval from "../screensCommercial/cashACh/admin/templateApproval/TemplateApproval";
import Transmit from "../screensCommercial/cashACh/admin/transmit/Transmit";
import Templates from "../screensCommercial/cashACh/templates/Templates";
import AddTemplate from "../screensCommercial/cashACh/templates/addTemplate/AddTemplate";
import EditTemplate from "../screensCommercial/cashACh/templates/editTemplate/EditTemplate";
import OneTimeRequest from "../screensCommercial/cashACh/components/oneTimeRequest/OneTimeRequest";
import Review from "../screensCommercial/cashACh/admin/components/Review";
import AddNewUser from "../screensCommercial/users/addNewUser/AddNewUser";

const AdminNavigator = (props) => {
  const AdminStack = createNativeStackNavigator();
  return (
    <AdminStack.Navigator
      initialRouteName="ACH"
      screenOptions={{
        headerTitleAlign: "center",
        headerBackVisible: true,
        headerBackTitleVisible: true,
        headerTitle: (props) => <Header {...props} />,
      }}
    >
      <AdminStack.Screen
        name="CommercialScreen"
        component={CommercialScreen}
      ></AdminStack.Screen>
      <AdminStack.Screen
        options={({ navigation }) => ({
          headerBackTitle: "Commercial",
          headerBackVisible: true,
        })}
        name="Users"
        component={Users}
      ></AdminStack.Screen>
      <AdminStack.Screen
        options={({ navigation }) => ({
          headerBackTitle: "Users",
          headerBackVisible: true,
        })}
        name="Add User"
        component={AddNewUser}
      ></AdminStack.Screen>
      <AdminStack.Screen
        name="editAccount"
        component={EditAccount}
      ></AdminStack.Screen>
      <AdminStack.Screen
        name="editPermissions"
        component={EditPermissions}
      ></AdminStack.Screen>
      <AdminStack.Screen
        name="requests"
        component={Requests}
        options={({ navigation }) => ({
          headerBackTitle: "Admin",
        })}
      ></AdminStack.Screen>
      <AdminStack.Screen name="request" component={Request}></AdminStack.Screen>
      <AdminStack.Screen name="pending" component={Pending}></AdminStack.Screen>
      <AdminStack.Screen
        options={({ navigation }) => ({
          headerBackTitle: "Commercial",
        })}
        name="ACH"
        component={CashACH}
      ></AdminStack.Screen>
      {/* CASH ACH SCREENS  CASH ACH  CASH ACH CASH ACH CASH ACH CASH ACH CASH ACH CASH ACH */}
      {/* CASH ACH SCREENS  CASH ACH  CASH ACH CASH ACH CASH ACH CASH ACH CASH ACH CASH ACH */}
      {/* CASH ACH SCREENS  CASH ACH  CASH ACH CASH ACH CASH ACH CASH ACH CASH ACH CASH ACH */}
      {/* CASH ACH SCREENS  CASH ACH  CASH ACH CASH ACH CASH ACH CASH ACH CASH ACH CASH ACH */}
      {/* CASH ACH SCREENS  CASH ACH  CASH ACH CASH ACH CASH ACH CASH ACH CASH ACH CASH ACH */}
      {/* CASH ACH SCREENS  CASH ACH  CASH ACH CASH ACH CASH ACH CASH ACH CASH ACH CASH ACH */}
      <AdminStack.Screen
        name="Templates"
        component={Templates}
      ></AdminStack.Screen>
      <AdminStack.Screen
        name="Add Template"
        component={AddTemplate}
      ></AdminStack.Screen>
      <AdminStack.Screen
        name="Edit Template"
        component={EditTemplate}
      ></AdminStack.Screen>
      <AdminStack.Screen
        name="Template Approval"
        component={TemplateApproval}
      ></AdminStack.Screen>
      <AdminStack.Screen
        name="OneTimeRequest"
        component={OneTimeRequest}
      ></AdminStack.Screen>
      <AdminStack.Screen
        options={({ navigation }) => ({
          headerBackTitle: "Request Details",
        })}
        name="TemplateRequest"
        component={TemplateRequest}
      ></AdminStack.Screen>
      <AdminStack.Screen name="Send" component={Send}></AdminStack.Screen>
      <AdminStack.Screen name="collect" component={Collect}></AdminStack.Screen>
      <AdminStack.Screen
        options={({ navigation }) => ({
          headerBackTitle: "Cash ACH",
        })}
        name="Transmit"
        component={Transmit}
      ></AdminStack.Screen>
      <AdminStack.Screen
        options={({ navigation }) => ({
          headerBackTitle: "Cash ACH",
        })}
        name="history"
        component={History}
      ></AdminStack.Screen>
      <AdminStack.Screen
        options={({ navigation }) => ({
          headerBackTitle: "Cash ACH",
        })}
        name="ACH Requests"
        component={AchRequests}
      ></AdminStack.Screen>
      <AdminStack.Screen
        options={({ navigation }) => ({
          headerBackTitle: "Cash ACH",
        })}
        name="ACH Review"
        component={Review}
      ></AdminStack.Screen>
    </AdminStack.Navigator>
  );
};

export default AdminNavigator;
