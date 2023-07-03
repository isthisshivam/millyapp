import { StyleSheet } from "react-native";
import { config } from "../../../../../config/Config";
import { theme } from "../../../../../config/Theme";

export const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "rgba(0,0,0,0.65)",
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

  cancelButton: {
    borderRadius: config.hp("2%"),
    height: config.hp("5%"),
    backgroundColor: theme.colors.primary,
    width: "50%",
    elevation: config.hp("1%"),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: config.hp("1%"),
    width: "100%",
    position: "relative",
  },
  icon: {
    position: "absolute",
    left: 0,
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: config.hp(".5%"),
    paddingVertical: config.hp("1.35%"),
    width: "80%",
    elevation: config.hp(".25%"),
  },
  buttonText: {
    color: "white",
    fontSize: config.hp("2.35%"),
    textAlign: "center",
  },
  iconX: {},
});
