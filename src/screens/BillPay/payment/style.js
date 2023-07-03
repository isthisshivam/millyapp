import { StyleSheet } from "react-native";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";

export const styles = StyleSheet.create({
  container: {
    //height: "100%",
    width: "100%",
    paddingVertical: config.hp("2%"),
    paddingHorizontal: config.wp("2%"),
  },

  iconContainer: {
    position: "absolute",
    left: config.wp("2%"),
  },
  title: {
    fontSize: 20,
    textAlign: "left",
    fontWeight: "bold",
    letterSpacing: 1,
    textTransform: "capitalize",
    //paddingVertical: config.hp("1%"),
    width: "100%",
    color: theme.colors.primary,
    marginBottom: config.hp("2%"),
  },
  latestPaymentContainer: {
    paddingHorizontal: config.wp("4%"),
    paddingBottom: config.hp("1%"),
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  latestPaymentLeft: {
    fontSize: config.hp("2.25%"),
    color: theme.colors.primary,
    fontWeight: "bold",
  },
  latestPaymentRight: {
    fontSize: config.hp("2.25%"),
  },

  button: {
    paddingVertical: config.hp("1%"),
    paddingHorizontal: config.wp("2%"),
    backgroundColor: theme.colors.disabled,
    borderRadius: config.hp("1%"),
    width: "80%",
    elevation: config.hp(".5%"),
  },
  buttonSafe: {
    backgroundColor: theme.colors.primary,
  },
  buttonClear: {
    paddingVertical: config.hp("1.05%"),
    paddingHorizontal: config.wp("2%"),

    borderRadius: config.hp("1%"),
    width: "50%",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: config.hp("2.5%"),
  },
  buttonText2: {
    color: theme.colors.primary,
    textAlign: "center",
    fontSize: config.hp("2.5%"),
  },
});
