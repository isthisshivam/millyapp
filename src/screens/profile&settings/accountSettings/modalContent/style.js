import { StyleSheet } from "react-native";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";

export const styles = StyleSheet.create({
  backGroundContainer: {
    backgroundColor: " rgba(0, 0, 0, 0.5)",
    height: "100%",
    position: "relative",
  },
  avatar: {
    elevation: config.hp(".75%"),
  },
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: theme.colors.white,

    borderTopLeftRadius: config.hp("1.5%"),
    borderTopRightRadius: config.hp("1.5%"),
    paddingVertical: config.hp("1%"),
    paddingHorizontal: config.wp("2%"),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonsContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: config.hp("2.5%"),
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: config.hp(".75%"),
    padding: config.hp("1%"),
    elevation: config.hp(".75%"),
    marginBottom: config.hp(".5%"),
  },
  closeButton: {
    position: "absolute",
    top: config.hp("1%"),
    left: config.wp("1%"),
    backgroundColor: theme.colors.primary,
    borderRadius: config.hp(".75%"),
    padding: config.hp("1%"),
    elevation: config.hp(".75%"),
    flexDirection: "row",
  },
  buttonText: {
    color: theme.colors.white,
    fontSize: config.hp("2.25%"),
  },
});
