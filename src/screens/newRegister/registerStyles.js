import { theme } from "../../config/Theme";
import { config } from "../../config/Config";
import { StyleSheet } from "react-native";

export const registerStyles = StyleSheet.create({
  label: {
    color: theme.colors.primary,
    fontSize: 16,
    fontWeight: "400",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "white",
    fontSize: config.hp("2.05%"),
    height: config.hp("5%"),
    borderBottomColor: theme.colors.faded,
    borderBottomWidth: 1,
    marginBottom: config.hp("1%"),
    paddingHorizontal: config.wp("1%"),
  },
  buttonContainer: {
    height: config.hp("12%"),
    alignItems: "center",
    justifyContent: "center",
    marginBottom: config.hp("2%"),
    width: "100%",
  },
  submitButton: {
    backgroundColor: theme.colors.primary,
    width: "90%",
    borderRadius: 12,
    paddingVertical: config.hp("1%"),
    marginBottom: config.hp("1%"),
    alignItems: "center",
    justifyContent: "center",
  },
  submitButtonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "500",
  },

  title: {
    fontSize: 20,
    fontWeight: "500",
    color: theme.colors.primary,
  },
});
