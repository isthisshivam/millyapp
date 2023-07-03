import { StyleSheet } from "react-native";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";

export const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: config.hp("34.5%"),
    paddingHorizontal: config.wp("4%"),
    backgroundColor: theme.colors.fadedBackground,
    elevation: config.hp(".1%"),
  },
  flexContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: config.hp("1%"),
    width: "100%",
  },
  switchContainer: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    flex: 0.7,
    fontSize: config.hp("1.9%"),
  },
  switch: {
    transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
  },
  textContainer: {
    paddingVertical: config.hp("2%"),
    width: "100%",
  },
  input: {
    backgroundColor: theme.colors.fade3,
    paddingLeft: config.wp("1%"),
    paddingVertical: config.hp("1%"),
    fontSize: config.hp("2.1%"),
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: config.hp(".5%"),
    paddingVertical: config.hp("1.05%"),
    width: "100%",
    elevation: config.hp(".5%"),
  },
  buttonText: {
    color: "white",
    fontSize: config.hp("2.55%"),
    textAlign: "center",
  },
});
