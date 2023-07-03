import { StyleSheet } from "react-native";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";

export const styles = StyleSheet.create({
  Cards: {
    height: "100%",
    overflow: "hidden",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: config.hp("1%"),
    paddingHorizontal: config.wp("1%"),
  },
  container: {
    width: "100%",
    // backgroundColor: theme.colors.white,
    paddingHorizontal: config.wp("3%"),
    height: config.hp("35%"),
    paddingTop: config.hp("1%"),
    marginBottom: config.hp("2%"),
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: config.hp(".5%"),
    paddingLeft: config.wp("2%"),
  },
  title: {
    color: theme.colors.primary,
    fontWeight: "bold",
    fontSize: config.hp("2.15%"),
  },
});
