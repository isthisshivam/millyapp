import { StyleSheet } from "react-native";
import { config } from "../../config/Config";
import { theme } from "../../config/Theme";

export const styles = StyleSheet.create({
  buttonContainer: {
    height: config.hp("5%"),
    backgroundColor: theme.colors.primary,
    width: "80%",
    borderRadius: config.wp("2%"),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    elevation: config.hp("1%"),
    paddingBottom: 25,
  },
  buttonText: {
    fontSize: config.hp("2.5%"),
    color: "white",
  },
  helpContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: config.hp("1.2%"),
  },
  helpIcon: {
    fontSize: config.hp("4.5%"),
    color: theme.colors.primary,
  },
  buttonContainer: {
    paddingHorizontal: config.wp("3%"),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingVertical: config.hp("1.2%"),
    backgroundColor: theme.colors.white,
    paddingBottom: config.hp("5%"),
  },
  button: {
    backgroundColor: theme.colors.inActive,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: config.hp("1.5%"),
    paddingVertical: config.hp("2%"),
  },
  buttonIsActive: {
    backgroundColor: theme.colors.primary,
  },
  buttonText: {
    fontSize: config.hp("2.5%"),
    color: "white",
    fontWeight: "bold",
    textTransform: "capitalize",
    letterSpacing: config.wp(".5%"),
  },
  modalBody: {
    paddingVertical: config.hp("2"),
    alignItems: "center",
  },
  modalHeader: {
    alignItems: "flex-start",
    width: "100%",
  },
  popupContainer: {
    height: config.hp("100%"),
    width: config.wp("100%"),
    borderRadius: 12,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: config.hp("12%"),
    paddingHorizontal: config.wp("4%"),
  },
});
