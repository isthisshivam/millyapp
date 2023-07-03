import { StyleSheet } from "react-native";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";

export const styles = StyleSheet.create({
  disclosure: {
    paddingVertical: config.hp(".75%"),
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: theme.colors.fade2,
    marginVertical: config.hp("1%"),
    borderBottomWidth: config.hp(".05%"),
  },
  disclosureTextLeft: {
    fontSize: config.hp("2.25%"),
    fontWeight: "bold",
  },
  disclosureTextRight: {
    fontSize: config.hp("2.15%"),
  },
  disclosureConfirmedTextColor: {
    color: theme.colors.primary,
    fontWeight: "bold",
  },
  arrowIcon: {
    fontSize: config.hp("2.5%"),
    color: theme.colors.fade5,
  },

  disclosureContainerRight: {
    minWidth: "25%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  disclosureInfoContainer: {
    backgroundColor: theme.colors.fade3,
    paddingVertical: config.hp("1.5%"),
    paddingHorizontal: config.wp("1.5%"),
    elevation: config.hp(".125%"),
  },
  disclosureText: {
    marginVertical: config.hp(".5%"),
    lineHeight: config.hp("2.7%"),
    marginVertical: config.hp("1%"),
    fontSize: config.hp("1.95%"),
  },
  confirmContainer: {
    paddingVertical: config.hp("1.2%"),
    paddingHorizontal: config.wp("5%"),
    flexDirection: "column",
    justifyContent: "space-between",
  },
  confirmedContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "65%",
    marginVertical: config.hp(".2%"),
  },
  confirmedText: {
    fontSize: config.hp("1.85%"),
  },
  confirmText: {
    fontSize: config.hp("1.85%"),
    fontWeight: "bold",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: config.hp(".5%"),
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: config.hp(".5%"),
    marginTop: config.hp(".5%"),
    paddingVertical: config.hp("0.85%"),
    width: "50%",
    elevation: config.hp(".5%"),
    marginVertical: config.hp(".2%"),
  },
  buttonText: {
    color: "white",
    fontSize: config.hp("1.95%"),
    textAlign: "center",
    fontWeight: "bold",
  },
});
