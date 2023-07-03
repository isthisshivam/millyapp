import { StyleSheet } from "react-native";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";

export const styles = StyleSheet.create({
  barcodeScanner: {
    position: "absolute",
    justifyContent: "flex-end",
    height: config.hp("95%"),
    width: config.wp("100%"),
    alignItems: "center",
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    marginBottom: config.hp(".75%"),
    paddingVertical: config.hp("1.25%"),
  },
  textContainerWelcome: {
    marginBottom: config.hp("2.75%"),
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
  inputContainer: {
    marginBottom: 10,
  },
  flexContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: config.hp("1%"),
    marginTop: config.hp("1%"),
    height: config.hp("8%"),
  },
  inputExample: {
    width: "45%",
    backgroundColor: "white",
    fontSize: config.hp("2.05%"),
  },
  inputExample2: {
    height: "100%",
    flex: 0.7,
    paddingVertical: config.hp(".95%"),
    flexDirection: "column",
    justifyContent: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.fade5,
    paddingLeft: config.wp("2%"),
    fontSize: config.hp("2.05%"),
  },
  stateTitle: {
    color: theme.colors.fade5,
    fontSize: config.hp("1.9%"),
    marginTop: -config.hp("2%"),
  },
  stateTitle2: {
    color: theme.colors.fade5,
    fontSize: config.hp("1.9%"),
    marginTop: config.hp("1%"),
    color: "black",
  },
  input: {
    backgroundColor: "white",
    fontSize: config.hp("2.05%"),
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: config.hp("1%"),
  },
  button: {
    backgroundColor: theme.colors.primary,
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
  dropDownText: {
    width: "45%",
  },
  textStyle: {
    fontSize: config.hp("2.5%"),
  },

  stateButton: {
    width: "100%",
  },
  blackButton: {
    backgroundColor: theme.colors.black,
    borderRadius: config.hp(".5%"),
    paddingVertical: config.hp("1.35%"),
    width: "100%",
    elevation: config.hp(".5%"),
    marginTop: config.hp("2%"),
  },
});
