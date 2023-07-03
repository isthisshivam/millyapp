import { StyleSheet } from "react-native";
import { config } from "../../config/Config";
import { theme } from "../../config/Theme";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "transparent",
  },
  scrollView: {
    display: "flex",
    flexDirection: "row",
    overflow: "hidden",
  },
  bullets: {
    position: "absolute",
    width: "100%",
    bottom: -config.hp("2.5%"),
    right: 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: config.wp("1%"),
  },
  bullet: {
    paddingHorizontal: config.wp("1.5%"),
    fontSize: config.hp("3.55%"),
    color: theme.colors.primary,
    fontWeight: "bold",
  },
  bulletWhite: {
    paddingHorizontal: config.wp("1.5%"),
    fontSize: config.hp("3.55%"),
    color: "white",
    fontWeight: "bold",
  },
});
