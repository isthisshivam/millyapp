import { StyleSheet } from "react-native";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";

export const styles = StyleSheet.create({
  backGroundContainer: {
    backgroundColor: "black",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "#F4F4F4",
    overflow: "hidden",
    borderTopRightRadius: config.hp("2%"),
    borderTopLeftRadius: config.hp("2%"),
    elevation: config.hp("1%"),
    backgroundColor: theme.colors.white,
  },
  titleContainer: {
    justifyContent: "center",
    backgroundColor: theme.colors.fadedBackground,
    paddingVertical: config.hp("2%"),
    elevation: config.hp(".5%"),
  },
  iconContainer: {
    position: "absolute",
    left: config.wp("2%"),
  },
  title: {
    fontSize: config.hp("2.75%"),
    textAlign: "center",
    fontWeight: "bold",
    letterSpacing: 1,
    textTransform: "capitalize",
  },
  topContainer: {
    paddingHorizontal: config.wp("4%"),
    paddingBottom: config.hp("1%"),
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  latestPaymentContainer: {
    paddingVertical: config.hp("1%"),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  latestPaymentLeft: {
    fontSize: config.hp("2.25%"),
    color: theme.colors.primary,
    fontWeight: "bold",
  },
  latestPaymentRight: {
    fontSize: config.hp("2.25%"),
  },
  merchantContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: config.hp("1.5%"),
  },
  merchantText: {
    fontSize: config.hp("2.15%"),
    maxWidth: "50%",
    fontWeight: "bold",
  },
  merchantTextSelect: {
    fontSize: config.hp("2.15%"),
    color: theme.colors.primary,
  },
  merchantRight: {
    maxWidth: "50%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 0,
  },
  icon: {
    color: theme.colors.primary,
    fontSize: config.hp("2.5%"),
  },
  scrollContainer: {
    paddingVertical: config.hp("2.5%"),
  },
  buttonContainer: {
    paddingVertical: config.hp("1.5%"),
    paddingHorizontal: config.wp("4%"),
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    height: config.hp("17%"),
  },
  button: {
    paddingVertical: config.hp("1.05%"),
    paddingHorizontal: config.wp("2%"),
    backgroundColor: theme.colors.disabled,
    borderRadius: config.hp("1%"),
    width: "50%",
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
    color: theme.colors.whiteText,
    textAlign: "center",
    fontSize: config.hp("2.5%"),
  },
  buttonText2: {
    color: theme.colors.primary,
    textAlign: "center",
    fontSize: config.hp("2.5%"),
  },
});
