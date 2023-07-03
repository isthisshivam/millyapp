import { StyleSheet } from "react-native";
import { config } from "../../../../../config/Config";
import { theme } from "../../../../../config/Theme";

export const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "rgba(0,0,0,0.70)",
    position: "absolute",
    bottom: 0,
    height: config.hp("45%"),
    width: "100%",
    paddingVertical: config.hp("2%"),
    paddingHorizontal: config.wp("1%"),
    flexDirection: "column",
    justifyContent: "space-between",
  },

  modalInfoContainer: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    width: "100%",
  },
  inputContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: config.hp("1%"),
  },
  icon: {
    width: "5%",
  },

  buttonText: {
    fontSize: config.hp("2.7%"),
    color: "white",
    fontWeight: "bold",
    letterSpacing: 1,
  },

  modalText: {
    fontSize: config.hp("2.5%"),
    textAlign: "center",
    marginBottom: 2,
    fontWeight: "500",
    color: "black",
  },
  modalSelectedText: {
    color: theme.colors.primary,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: config.hp("1%"),
    width: "90%",
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
});
