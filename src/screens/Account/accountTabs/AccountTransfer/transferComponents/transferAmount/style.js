import { StyleSheet } from "react-native";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: config.hp("2%"),

    borderBottomWidth: config.hp(".05%"),
    backgroundColor: "#F4F4F4",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",

    paddingLeft: config.wp("4%"),
  },
  title: {
    color: theme.colors.primary,
    fontWeight: "bold",
    fontSize: config.hp("2.25%"),
  },
  inputContainerCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",

    width: "100%",
  },
  dollarContainer: {
    minWidth: "45%",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  dollarSign: {
    fontSize: config.hp("4.25%"),

    color: theme.colors.fade6,
  },
  inputFieldContainer: {
    maxWidth: "100%",
    paddingLeft: config.wp("1%"),
    paddingTop: config.hp("1%"),
  },
  inputField: {
    fontSize: config.hp("5%"),
    color: theme.colors.fade6,
  },
});
