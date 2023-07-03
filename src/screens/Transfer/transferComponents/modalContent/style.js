import { StyleSheet } from "react-native";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";

export const styles = StyleSheet.create({
  modalContainer: {
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: config.wp("90%"),
    minHeight: config.hp("40%"),
    backgroundColor: "white",
    borderRadius: config.hp("1%"),
    paddingVertical: config.deviceHeight * 0.025,
    paddingHorizontal: config.deviceWidth * 0.025,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    overflow: "hidden",
    bottom: 0,
  },
  titleContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  infoContainer: {
    height: config.hp("30%"),

    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  info: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    width: "100%",
  },
  infoTitle: {
    fontSize: config.hp("2.25%"),
    fontWeight: "bold",
    textTransform: "capitalize",
    textAlign: "left",
    maxWidth: "45%",
  },
  infoAmount: {
    fontSize: config.hp("3.7%"),
    maxWidth: "45%",
    color: "red",
    fontWeight: "bold",
  },
  title: {
    fontSize: config.hp("2.5%"),
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    width: config.wp("40%"),
    paddingVertical: config.hp(".8%"),
    borderRadius: config.hp(".5%"),
    elevation: config.hp(".5%"),
    justifyContent: "center",
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: theme.colors.danger,
  },
  acceptButtton: {
    backgroundColor: theme.colors.primary,
  },
  buttonText: {
    color: theme.colors.whiteText,
    fontSize: config.hp("2.10%"),
  },
});
