import { StyleSheet, Dimensions } from "react-native";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";

const windowHeight = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  textContainer: {
    display: "flex",
    flexDirection: "column",
    marginBottom: config.hp(".5%"),
  },
  textTitle: {
    fontSize: config.hp("2.25%"),
    color: theme.colors.primary,
    fontWeight: "bold",
  },
  textSecondary: {
    lineHeight: config.hp("2.7%"),
    fontSize: config.hp("1.95%"),
    textTransform: "capitalize",
  },
  arrowIcon: {
    fontSize: config.hp("2.5%"),
    color: theme.colors.fade2,
    paddingVertical: config.hp(".2%"),
  },
  verificationTypesContainer: {
    marginVertical: config.hp("2%"),
  },
  verificationType: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: config.hp("1%"),
    borderBottomWidth: config.hp(".05%"),
    marginVertical: config.hp(".5%"),
  },
  verificationRightSide: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    minWidth: "30%",
  },

  verificationTextMain: {
    fontSize: config.hp("2.1%"),
  },
  verificationTextSecondary: {
    color: theme.colors.primary,
    fontSize: config.hp("2.1%"),
  },
  verificationContainer: {
    paddingVertical: config.hp("3%"),
  },
  inputContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "80%",
    paddingVertical: config.hp("2.5%"),
    fontSize: config.hp("2.5%"),
    borderColor: theme.colors.primary,
    borderWidth: StyleSheet.hairlineWidth,
    marginBottom: config.hp("1%"),
    paddingLeft: config.wp("2%"),
    letterSpacing: config.wp(".8%"),
  },
  inputFocused: {
    letterSpacing: config.wp("5%"),
  },
  inputHelp: {
    width: "100%",
    textAlign: "center",
    fontSize: config.hp("2.1%"),
    color: theme.colors.primary,
  },
  inputHelp2: {
    width: "100%",
    textAlign: "center",
    fontSize: config.hp("2.1%"),
    marginTop: config.hp("1%"),
    color: theme.colors.primary,
    fontWeight: "bold",
  },
});
