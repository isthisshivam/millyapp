import React, { useEffect, useState, useCallback } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { useDispatch } from "react-redux";
import * as SplashScreen from "expo-splash-screen";
import { View, LogBox } from "react-native";
import * as Font from "expo-font";

import { theme } from "./src/config/Theme";
import AppNavigation from "./src/navigation/AppNavigation";
import {
  getClientPayLoad,
  getClientInfo,
} from "./src/store/actions/clientActions";
import { useAppDispatch, useAppSelector } from "./src/store/Store";
import {
  GetBannerImages,
  GetBitPanel,
} from "./src/store/actionReducers/client";

const AppWrapper = () => {
  const state = useAppSelector((state) => state.client);
  const [appIsReady, setAppIsReady] = useState(false);
  const dispatch = useDispatch();
  const appDispatch = useAppDispatch();

  const fetchFonts = async () => {
    appDispatch(GetBitPanel());
    appDispatch(GetBannerImages());
    dispatch(getClientInfo());
    dispatch(getClientPayLoad());
    if (state.status == true) {
      return await Font.loadAsync({
        "open-sans": { uri: require("./assets/fonts/OpenSans-Regular.ttf") },
        "open-sans-bold": { uri: require("./assets/fonts/OpenSans-Bold.ttf") },
      });
    }
  };

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        // Pre-load fonts, make any API calls you need to do here
        await fetchFonts();
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
      <PaperProvider theme={theme}>
        <AppNavigation />
      </PaperProvider>
    </View>
  );
};

export default AppWrapper;
