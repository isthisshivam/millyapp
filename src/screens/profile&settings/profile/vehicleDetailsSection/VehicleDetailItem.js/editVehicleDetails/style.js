import { StyleSheet } from "react-native";
import { config } from "../../../../../../config/Config";
import { theme } from "../../../../../../config/Theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  contentContainer: {
    paddingHorizontal: config.wp("5%"),
    paddingVertical: config.hp("2.5%"),
  },
  titleContainer: {
    marginBottom: config.hp("1%"),
  },
  title: {
    fontSize: config.hp("2.5%"),
    color: theme.colors.primary,
    fontWeight: "bold",
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: config.hp("1%"),
    width: "100%",
  },
  label: {
    fontSize: config.hp("2.5%"),
    width: "50%",
  },
  input: {
    paddingLeft: config.wp("1%"),
    paddingVertical: config.hp("1%"),
    fontSize: config.hp("2.25%"),
    borderBottomWidth: config.hp(".15%"),
    borderBottomColor: theme.colors.primary,
    maxWidth: "50%",
    minWidth: "50%",
  },
  inputTouch: {
    paddingVertical: config.hp("1%"),
    borderBottomWidth: config.hp(".15%"),
    borderBottomColor: theme.colors.primary,
    paddingLeft: config.wp("1%"),

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  touchInputContainer: {
    paddingVertical: config.hp("2%"),
  },
  inputTouchText: {
    fontSize: config.hp("2.15%"),
    textAlign: "left",
    color: theme.colors.backdrop,

    paddingVertical: config.hp("1%"),
    paddingLeft: config.wp("1%"),
  },
  inputTouchTextSelected: {
    fontSize: config.hp("2.25%"),
    textAlign: "center",
    color: theme.colors.primary,
    fontWeight: "bold",
    paddingVertical: config.hp("1%"),
    paddingLeft: config.wp("1%"),
  },
  icon: {
    fontSize: config.hp("2.5%"),
    maxWidth: "50%",
  },
  rightSide: {
    flex: 1,
    borderBottomWidth: config.hp(".15%"),
    borderBottomColor: theme.colors.primary,
  },
  touchWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonContainer: {
    backgroundColor: theme.colors.primary,
    borderRadius: config.hp("1%"),
    elevation: config.hp(".5%"),
    overflow: "hidden",
    marginTop: config.hp("1%"),
    marginBottom: config.hp(".5%"),
  },
  button: {
    flex: 1,
    backgroundColor: theme.colors.disabled,
    paddingVertical: config.hp("1.5%"),
  },
  buttonActive: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    paddingVertical: config.hp("1.5%"),
  },
  buttonText: {
    textAlign: "center",
    fontSize: config.hp("2.5%"),
    color: theme.colors.white,
    fontWeight: "bold",
  },
});
