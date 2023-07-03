import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Header from "../components/Header";
import { MyTransition } from "./transitions";
import PreTransferScreen from "../screens/Transfer/PreTransferScreen";
import TransferScreen from "./../screens/Transfer/TransferScreen";
import RecentActivitySection from "../screens/Transfer/RecentActivitySection";
import DraggableScreenFrom from "../screens/Transfer/DraggableScreenFrom";
import DraggableScreenTo from "../screens/Transfer/DraggableScreenTo";
//import ExternalTransfer from "../screens/Transfer/externalTransfer/ExternalTransfer";
import OptionsScreen from "../screens/Transfer/externalTransfer/OptionsScreen";
import Sending from "../screens/Transfer/externalTransfer/sending/Sending";
import Receiving from "../screens/Transfer/externalTransfer/receiving/Receiving";
import GoBack from "../components/GoBack";
import ExternalHistory from "../screens/Transfer/externalTransfer/history/ExternalHistory";

const TransferStack = createNativeStackNavigator();

const TabTransferStack = () => {
  return (
    <TransferStack.Navigator
      screenOptions={{
        ...MyTransition,
      }}
    >
      <TransferStack.Screen
        name="PreTransfer"
        component={PreTransferScreen}
        options={({ navigation }) => ({
          headerTitle: (props) => <Header {...props} />,
          headerTitleAlign: "center",
          headerLeft: () => {
            return <GoBack navigation={navigation} />;
          },
        })}
      />

      <TransferStack.Screen
        name="TransferMain"
        component={TransferScreen}
        options={({ navigation }) => ({
          headerTitle: (props) => <Header {...props} />,
          headerTitleAlign: "center",
          headerLeft: () => {
            return <GoBack navigation={navigation} />;
          },
        })}
      />
      <TransferStack.Screen
        name="External Options"
        component={OptionsScreen}
        options={({ navigation }) => ({
          headerTitle: (props) => <Header {...props} />,
          headerTitleAlign: "center",
          headerLeft: () => {
            return <GoBack navigation={navigation} />;
          },
        })}
      />
      <TransferStack.Screen
        name="Send Money"
        component={Sending}
        options={({ navigation }) => ({
          headerTitle: (props) => <Header {...props} />,
          headerTitleAlign: "center",
          // headerLeft: () => {
          //   return <GoBack navigation={navigation} />;
          // },
        })}
      />
      <TransferStack.Screen
        name="Receive Money"
        component={Receiving}
        options={({ navigation }) => ({
          headerTitle: (props) => <Header {...props} />,
          headerTitleAlign: "center",
          // headerLeft: () => {
          //   return <GoBack navigation={navigation} />;
          // },
        })}
      />
      {/* <TransferStack.Screen
        name="External Transfer"
        component={ExternalTransfer}
        options={{
          headerTitle: (props) => <Header {...props} />,
          headerTitleAlign: "center",
           headerLeft: (navigation) => {
            return <GoBack navigation={navigation} />;
          },
        }}
      /> */}

      <TransferStack.Screen
        name="RecentActivitySection"
        component={RecentActivitySection}
        options={({ navigation }) => ({
          headerTitle: (props) => <Header {...props} />,
          headerTitleAlign: "center",
          headerLeft: () => {
            return <GoBack navigation={navigation} />;
          },
        })}
      />
      <TransferStack.Screen
        name="TransferDetails"
        component={RecentActivitySection}
        options={({ navigation }) => ({
          headerTitle: (props) => <Header {...props} />,
          headerTitleAlign: "center",
          headerLeft: () => {
            return <GoBack navigation={navigation} />;
          },
        })}
      />
      <TransferStack.Screen
        name="External History"
        component={ExternalHistory}
        options={({ navigation }) => ({
          headerTitle: (props) => <Header {...props} />,
          headerTitleAlign: "center",
          headerLeft: () => {
            return <GoBack navigation={navigation} />;
          },
        })}
      />
      <TransferStack.Screen
        name="DraggableFrom"
        component={DraggableScreenFrom}
        options={({ navigation }) => ({
          headerTitle: (props) => <Header {...props} />,
          headerTitleAlign: "center",
          headerLeft: () => {
            return <GoBack navigation={navigation} />;
          },
        })}
      />
      <TransferStack.Screen
        name="DraggableTo"
        component={DraggableScreenTo}
        options={({ navigation }) => ({
          headerTitle: (props) => <Header {...props} />,
          headerTitleAlign: "center",
          headerLeft: () => {
            return <GoBack navigation={navigation} />;
          },
        })}
      />
    </TransferStack.Navigator>
  );
};

export default TabTransferStack;
