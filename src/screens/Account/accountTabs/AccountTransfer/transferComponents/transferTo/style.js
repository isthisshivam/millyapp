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
    height: config.hp("35%"),

    paddingTop: config.deviceHeight * 0.0125,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: config.hp(".5%"),
    paddingLeft: config.wp("4%"),
  },
  title: {
    color: theme.colors.primary,
    fontWeight: "bold",
    fontSize: config.hp("2.15%"),
  },
});
