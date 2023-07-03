import { StyleSheet } from "react-native";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";

export const styles = StyleSheet.create({
  titleContainer: {
    paddingVertical: config.hp("1%"),
    paddingHorizontal: config.wp("2%"),
    backgroundColor: "white",
  },
  title: {
    fontSize: config.hp("3.5%"),
    fontWeight: "600",
    color: theme.colors.primary,
  },
  navContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    elevation: config.hp("1.0%"),
  },
  link: {
    flex: 0.25,
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderRightWidth: StyleSheet.hairlineWidth,
    paddingVertical: config.hp("1%"),
  },
  linkText: {
    textAlign: "center",
    fontSize: config.hp("2.1%"),
    color: theme.colors.fade5,
  },
  isSelected: {
    borderBottomWidth: config.hp(".8%"),
    borderBottomColor: theme.colors.primary,
  },
  isSelectedText: {
    color: theme.colors.black,
    fontWeight: "bold",
  },
});
