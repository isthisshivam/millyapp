import { StyleSheet } from "react-native";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";

export const styles = StyleSheet.create({
  titleContainer: {
    paddingVertical: config.hp("3.5%"),
    paddingHorizontal: config.wp("4%"),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: config.hp("2.5%"),
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  rightButton: {
    maxWidth: "60%",
    paddingVertical: config.hp("1%"),
    paddingHorizontal: config.wp("4%"),
    backgroundColor: theme.colors.primary,
    borderRadius: config.hp(".75%"),
    elevation: config.hp(".75%"),
  },
  rightButtonText: {
    color: "white",
    fontSize: config.hp("2.25%"),
  },
  scrollContainer: {
    backgroundColor: "white",
    paddingHorizontal: config.wp("4%"),
  },
});
