import { StyleSheet } from "react-native";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";

export const styles = StyleSheet.create({
  backGroundContainer: {
    height: "100%",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  container: {
    width: "100%",
    backgroundColor: theme.colors.modalBackGround,
    borderTopLeftRadius: config.hp("1.5%"),
    borderTopRightRadius: config.hp("1.5%"),
    paddingHorizontal: config.wp("1.75%"),
    paddingVertical: config.hp("2%"),
  },
  cancelButtonContainer: {
    marginTop: config.hp("1%"),
  },
  cancelButton: {
    backgroundColor: theme.colors.white,
    borderRadius: config.hp("1.5%"),
    padding: config.hp("1%"),
    elevation: config.hp(".75%"),
    marginBottom: config.hp(".5%"),
    paddingVertical: config.hp("2.5%"),
  },
  cancelButtonText: {
    color: theme.colors.black,
    fontSize: config.hp("2.5%"),
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonsContainer: {
    width: "100%",
  },
  button: {
    backgroundColor: theme.colors.white,
    borderRadius: config.hp(".75%"),
    padding: config.hp("1%"),
    elevation: config.hp(".75%"),
    marginBottom: config.hp(".5%"),
    paddingVertical: config.hp("2.5%"),
  },
  buttonText: {
    color: theme.colors.primary,
    fontSize: config.hp("2.5%"),
    textAlign: "center",
    fontWeight: "bold",
  },
});
