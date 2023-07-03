import { StyleSheet } from "react-native";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";

export const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "black",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  modalContentContainer: {
    height: "100%",
    width: "100%",
    backgroundColor: "#F4F4F4",

    elevation: config.hp("1%"),
    backgroundColor: theme.colors.white,
  },
  titleContainer: {
    justifyContent: "center",
    backgroundColor: theme.colors.fadedBackground,

    paddingVertical: config.hp("2%"),
    elevation: config.hp(".5%"),
  },
  title: {
    fontSize: config.hp("2.5%"),
    textAlign: "center",
    fontWeight: "bold",
    letterSpacing: 1,
    textTransform: "capitalize",
  },
  iconContainer: {
    paddingHorizontal: config.wp("4%"),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  saveText: {
    color: theme.colors.fade6,
    fontSize: config.hp("2.25%"),
  },
  saveButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: config.hp(".75%"),
    paddingHorizontal: config.wp("2.5%"),
    paddingVertical: config.hp(".55%"),
    elevation: config.hp("1%"),
  },
  saveTextSafe: {
    color: theme.colors.white,
    fontSize: config.hp("2.25%"),
    fontWeight: "bold",
  },
  bodyContainer: {
    paddingHorizontal: config.wp("4%"),
    height: "50%",
    justifyContent: "space-evenly",
  },
  inputContainer: {
    paddingVertical: config.hp(".75%"),
  },
  twoInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: config.hp(".75%"),
  },
  input: {
    paddingLeft: config.wp(".5%"),
    paddingVertical: config.hp(".75%"),
    fontSize: config.hp("2.1%"),
    borderBottomWidth: config.hp(".2%"),
    borderBottomColor: theme.colors.primary,
  },
  input2: {
    width: "50%",
    paddingLeft: config.wp(".5%"),
    paddingVertical: config.hp(".5%"),
    fontSize: config.hp("2.1%"),
    borderBottomWidth: config.hp(".2%"),
    borderBottomColor: theme.colors.primary,
  },
  inputExample2: {
    width: "40%",
    justifyContent: "center",
    borderBottomWidth: config.hp(".2%"),
    borderBottomColor: theme.colors.primary,
    paddingLeft: config.wp(".5%"),
    fontSize: config.hp("2.05%"),
  },
  stateTitle: {
    color: theme.colors.fade5,
    fontSize: config.hp("2.1%"),
  },
  stateTitleSelected: {
    color: theme.colors.black,
  },
});
