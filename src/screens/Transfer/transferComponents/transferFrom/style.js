import { StyleSheet } from "react-native";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";

export const styles = StyleSheet.create({
  Cards: {
    height: "100%",
    overflow: "hidden",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: config.hp(".5%"),
  },
  container: {
    width: "100%",
    backgroundColor: "white",
    paddingTop: config.deviceHeight * 0.0125,
    //borderBottomWidth: config.hp(".05%"),
    height: config.hp("40%"),
  },
  titleContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    paddingTop: config.hp(".5%"),
    paddingLeft: config.wp("4%"),
  },
  title: {
    color: theme.colors.primary,
    fontWeight: "500",
    fontSize: 20,
  },
});
