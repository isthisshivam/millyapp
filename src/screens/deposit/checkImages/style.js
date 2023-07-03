import { StyleSheet } from "react-native";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";

export const styles = StyleSheet.create({
  container: {
    maxHeight: config.hp("140%"),
    backgroundColor: "white",
    paddingHorizontal: config.wp("5%"),
    paddingTop: config.hp("2.5%"),
  },

  title: {
    color: theme.colors.primary,
    fontSize: config.hp("2.15%"),
    fontWeight: "bold",
  },
  helperText: {
    paddingVertical: config.hp("1%"),
    lineHeight: config.hp("2.8%"),
    fontSize: config.hp("2.05%"),
  },
  frontCheckContainer: {
    width: "100%",
    height: config.hp("40%"),
    marginBottom: config.hp("2%"),
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: "column",
    marginTop: 25,
  },
  backCheckContainer: {
    width: "100%",
    height: config.hp("40%"),
    marginTop: config.hp("2%"),
  },
  checkFront: {
    height: "80%",
    backgroundColor: "grey",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  checkFrontImage: {
    height: "80%",
  },
  checkBack: {
    height: "80%",
    backgroundColor: "grey",
  },
  checkBackImage: {
    height: "80%",
  },
  containerText: {
    height: "10%",
    display: "flex",
    justifyContent: "center",
    paddingVertical: config.hp("4%"),
  },
  text: {
    fontSize: config.hp("2.15%"),
    color: "black",
    paddingVertical: config.hp("2%"),
  },
  logo: {
    width: "100%",
    height: config.hp("50%"),
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: config.hp("1.2%"),
    marginVertical: config.hp("1.5%"),
  },
  buttonText: {
    fontSize: config.hp("2.25%"),
    textAlign: "center",
    color: theme.colors.whiteText,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
});
