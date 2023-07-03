import { StyleSheet } from "react-native";
import { config } from "../../config/Config";
import { theme } from "../../config/Theme";

export const styles = StyleSheet.create({
  titleContainer: {
    paddingVertical: config.hp("2%"),
    paddingHorizontal: config.wp("4%"),
    backgroundColor: "white",
  },
  title: {
    fontSize: config.hp("2.5%"),
    fontWeight: "bold",
  },
  navContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    elevation: config.hp("1.0%"),
  },
  link: {
    flex: 1,
    paddingVertical: config.hp("1%"),
  },
  linkText: {
    textAlign: "center",
    fontSize: config.hp("1.8%"),
    color: theme.colors.faded,
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
