import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import BottomTabNavigator from "./BottomTabNavigator";
import DrawerContent from "./DrawerContent";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      useLegacyImplementation={false}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: "100%",
        },
        drawerType: "slide",
      }}
      //Drawer items
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="Tabs" component={BottomTabNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
