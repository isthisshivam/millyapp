import { StyleSheet } from "react-native";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingVertical: config.hp(".1%"),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: config.wp("3.5%"),
    elevation: config.hp("1%"),
  },
  barContainer: {
    height: config.hp("8%"),
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  leftShape: {
    borderTopLeftRadius: config.hp("1%"),
    borderBottomLeftRadius: config.hp("1%"),
    width: "20%",
    paddingVertical: config.hp(".5%"),
    backgroundColor: theme.colors.primary,
    elevation: config.hp("1%"),
  },
  middleShape: {
    width: "20%",
    paddingVertical: config.hp(".5%"),
    elevation: config.hp("1%"),
  },
  rightShape: {
    borderTopRightRadius: config.hp("1%"),
    borderBottomRightRadius: config.hp("1%"),
    width: "20%",
    paddingVertical: config.hp(".5%"),
    elevation: config.hp("1%"),
  },
  notSelected: {
    backgroundColor: theme.colors.fadedLight,
  },
  selected: {
    backgroundColor: theme.colors.primary,
  },
});
