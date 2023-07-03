import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GoBack from "../components/GoBack";
import Header from "../components/Header";
import AddVehicleDetails from "../screens/profile&settings/houshold/vehicles/AddVehicleDetails";
import EditVehicleDetails from "../screens/profile&settings/profile/vehicleDetailsSection/VehicleDetailItem.js/editVehicleDetails/EditVehicleDetails";
import Household from "../screens/profile&settings/houshold/createHousehold/Household";
import MyHouse from "../screens/profile&settings/houshold/MyHouse";
import PersonalDetails from "../screens/profile&settings/houshold/components/PersonalDetails";
import EditVehicle from "../screens/profile&settings/houshold/vehicles/EditVehicle";

const HouseStack = createNativeStackNavigator();

const HouseNavigator = ({ navigation }) => {
  return (
    <HouseStack.Navigator initialRouteName="My House" screenOptions={{}}>
      <HouseStack.Screen
        name="My House"
        component={MyHouse}
        options={{
          headerTitle: (props) => <Header {...props} />,
          headerTitleAlign: "center",
          headerBackVisible: false,
          headerLeft: () => {
            return <GoBack goTo={"profileMain"} navigation={navigation} />;
          },
        }}
      />
      <HouseStack.Screen
        name="Personal Details"
        component={PersonalDetails}
        options={{
          headerTitle: (props) => <Header {...props} />,
          headerTitleAlign: "center",
          headerBackVisible: false,
          headerLeft: () => {
            return <GoBack goTo={"My House"} navigation={navigation} />;
          },
        }}
      />

      <HouseStack.Screen
        name="Create Household"
        component={Household}
        options={{
          headerTitle: (props) => <Header {...props} />,
          headerTitleAlign: "center",
          headerBackVisible: false,
          headerLeft: () => {
            return <GoBack navigation={navigation} />;
          },
        }}
      />

      <HouseStack.Screen
        name="Add Vehicle"
        component={AddVehicleDetails}
        options={{
          headerTitle: (props) => <Header {...props} />,
          headerTitleAlign: "center",
          headerBackVisible: false,
          headerLeft: () => {
            return <GoBack goTo={"My House"} navigation={navigation} />;
          },
        }}
      />
      <HouseStack.Screen
        name="Edit Vehicle"
        component={EditVehicle}
        options={{
          headerTitle: (props) => <Header {...props} />,
          headerTitleAlign: "center",
          headerBackVisible: false,
          headerLeft: () => {
            return <GoBack navigation={navigation} />;
          },
        }}
      />
    </HouseStack.Navigator>
  );
};

export default HouseNavigator;
