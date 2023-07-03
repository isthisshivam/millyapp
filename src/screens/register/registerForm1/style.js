import { StyleSheet } from "react-native";
import { configureFonts } from "react-native-paper";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";

export const styles = StyleSheet.create({
  acctContainer: {
    paddingBottom: config.hp("4%"),
  },
  blackButton: {
    backgroundColor: "black",
    borderRadius: config.hp(".5%"),
    paddingVertical: config.hp("1.35%"),
    width: "100%",
    elevation: config.hp(".5%"),
    marginTop: config.hp("2%"),
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: config.hp(".5%"),
    paddingVertical: config.hp("1.35%"),
    width: "100%",
    elevation: config.hp(".5%"),
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: config.hp("1%"),
  },
  buttonText: {
    color: "white",
    fontSize: config.hp("2.35%"),
    textAlign: "center",
  },
  colorPrimary: {
    color: theme.colors.primary,
  },
  disabled: {
    backgroundColor: theme.colors.inActive,
    borderRadius: config.hp(".5%"),
    paddingVertical: config.hp("1.35%"),
    width: "100%",
    elevation: config.hp(".5%"),
  },
  eyeIcon: {
    color: theme.colors.primary,
    fontSize: config.hp("3.5%"),
  },
  inputContainer: {
    marginBottom: config.hp("1%"),
  },
  input: {
    backgroundColor: "white",
    fontSize: config.hp("2.05%"),
  },
  ssnContainer: {
    paddingBottom: config.hp("4%"),
  },

  textContainer: {
    display: "flex",
    flexDirection: "column",
    marginBottom: config.hp(".75%"),
  },
  textContainerWelcome: {
    marginBottom: config.hp("5.75%"),
    marginTop: config.hp("3.75%"),
  },
  textSecondary: {
    fontWeight: "bold",
    lineHeight: config.hp("2.7%"),
    fontSize: config.hp("1.95%"),
  },
  textTitle: {
    fontSize: config.hp("2.25%"),
    color: theme.colors.primary,
    fontWeight: "bold",
  },
  welcomeTextSecondary: {
    fontSize: 14,
    lineHeight: config.hp("2.7%"),
  },
  usernameContainer: {
    paddingBottom: config.hp("4%"),
  },
});
