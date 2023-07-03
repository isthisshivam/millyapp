import React from "react";
import { View, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { useTheme } from "react-native-paper";

import Login from "./loginSection/Login";
import { config } from "../../config/Config";
import { theme } from "../../config/Theme";
import AuthContainer from "./authContainer/AuthContainer";
import BannerImage from "./BannerImage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const LandingScreen = ({ navigation }) => {
  const { colors } = useTheme();
  return (
    <KeyboardAwareScrollView
      enableOnAndroid
      //automaticallyAdjustContentInsets
      style={styles.container}
      //contentContainerStyle={{ flex: 1 }}
    >
      <BannerImage />
      <AuthContainer colors={colors} navigation={navigation} />
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <Login navigation={navigation} colors={colors} />
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    flex: 1,
  },
  helpContainer: {
    paddingHorizontal: config.wp("4%"),
  },
});

export default LandingScreen;
