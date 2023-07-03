import { StyleSheet } from "react-native";
import { config } from "../config/Config";
import { theme } from "../config/Theme";

const globalStyles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: theme.colors.primary,
  },

  input: {
    backgroundColor: "white",
    height: config.hp("5%"),
    width: "50%",
    borderRadius: 7,
    borderWidth: 1,
    borderColor: theme.colors.faded,
    paddingHorizontal: config.wp("1.5%"),
  },
  inputText: {},

  inputLabel: { fontSize: 18, color: theme.colors.primary, fontWeight: "500" },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: config.hp("2%"),
  },

  submitButtonContainer: {
    height: config.hp("12%"),
    alignItems: "center",
    justifyContent: "flex-end",
    paddingVertical: config.hp("1%"),
    width: "100%",
  },
  submitButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    marginBottom: config.hp("1%"),
    borderRadius: 12,
    backgroundColor: theme.colors.primary,
    paddingVertical: config.hp("1%"),
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
});

export default globalStyles;
