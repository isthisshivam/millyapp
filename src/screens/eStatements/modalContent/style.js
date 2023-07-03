import { StyleSheet } from "react-native";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";

export const styles = StyleSheet.create({
  backGroundContainer: {
    backgroundColor: " rgba(0, 0, 0, 0.5)",
    height: "100%",
    position: "relative",
  },

  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: theme.colors.white,

    borderTopLeftRadius: config.hp("1.5%"),
    borderTopRightRadius: config.hp("1.5%"),
    paddingVertical: config.hp("3.5%"),
    paddingHorizontal: config.wp("2%"),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: config.hp("2.5%"),
    textTransform: "capitalize",
    fontWeight: "bold",
    marginBottom: config.hp("2%"),
  },

  closeButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: config.hp(".75%"),
    paddingVertical: config.hp(".5%"),
    paddingHorizontal: config.wp("2%"),
    elevation: config.hp(".75%"),
  },
  buttonText: {
    color: theme.colors.white,
    fontSize: config.hp("2.55%"),
  },
});
