import { StyleSheet, Dimensions } from "react-native";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";

const windowHeight = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  textContainer: {
    display: "flex",
    flexDirection: "column",
    marginBottom: config.hp("1.5%"),
  },
  textTitle: {
    fontSize: config.hp("2.25%"),
    color: theme.colors.primary,
    fontWeight: "bold",
  },
  textSecondary: {
    fontWeight: "bold",
    lineHeight: config.hp("2.7%"),
    fontSize: config.hp("1.95%"),
  },

  disclosureContainer2: {
    paddingVertical: config.hp("5.5%"),
    paddingHorizontal: config.wp("1.5%"),
    height: "auto",
    alignItems: "center",
    width: "100%",
  },

  radioButton: {
    width: "50%",
  },
  checkContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: config.hp(".5%"),
    marginTop: config.hp("2.5%"),
    minHeight: config.hp("16%"),
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: config.hp(".5%"),
    paddingVertical: config.hp("1.35%"),
    width: "100%",
    elevation: config.hp(".5%"),
  },
  blackButton: {
    backgroundColor: theme.colors.black,
    borderRadius: config.hp(".5%"),
    paddingVertical: config.hp("1.35%"),
    width: "100%",
    elevation: config.hp(".5%"),
  },
  buttonText: {
    color: "white",
    fontSize: config.hp("2.35%"),
    textAlign: "center",
  },
  whitePadding: {
    height: windowHeight > 900 ? config.hp("10%") : config.hp("5%"),
    backgroundColor: "white",
  },
});
