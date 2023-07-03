import { StyleSheet } from "react-native";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";

export const styles = StyleSheet.create({
  backGroundContainer: {
    backgroundColor: " rgba(0, 0, 0, 0.5)",
    height: "100%",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: config.hp(".75%"),
    padding: config.hp("1%"),
    elevation: config.hp(".75%"),
    marginBottom: config.hp(".5%"),
  },
  buttonsContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: config.hp("2.5%"),
  },

  buttonText: {
    color: theme.colors.primary,
    fontSize: config.hp("2.25%"),
  },
  closeButton: {
    position: "absolute",
    top: config.hp("1%"),
    left: config.wp("1%"),
    backgroundColor: theme.colors.primary,
    borderRadius: config.hp(".75%"),
    padding: config.hp("1%"),
    elevation: config.hp(".75%"),
  },

  contentContainer: {
    backgroundColor: "white",
    paddingHorizontal: config.wp("5%"),
  },

  container: {
    width: "100%",
    height: config.hp("80%"),
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: config.hp("1.5%"),
    borderTopRightRadius: config.hp("1.5%"),
    borderBottomLeftRadius: config.hp("1.5%"),
    borderBottomRightRadius: config.hp("1.5%"),
    paddingVertical: config.hp("1%"),
  },

  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  paperIcon: {
    paddingRight: 20,
  },

  titleContainer: {
    paddingVertical: config.hp("2.5%"),
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: config.wp("2%"),
  },
  title: {
    textAlign: "center",
    fontSize: config.hp("2.5%"),
    fontWeight: "bold",
  },
  subjectInput: {
    paddingLeft: config.wp("2%"),
    paddingVertical: config.hp("1.5%"),
    backgroundColor: theme.colors.fadedBackground,
    color: theme.colors.black,
    borderRadius: config.hp(".5%"),
    fontSize: config.hp("1.8%"),
  },
  subjectInput2: {
    paddingLeft: config.wp("2%"),
    paddingVertical: config.hp("1.5%"),
    marginTop: config.hp("1.5%"),
    backgroundColor: theme.colors.fadedBackground,
    color: theme.colors.black,
    borderRadius: config.hp(".5%"),
    height: config.hp("40%"),
    textAlignVertical: "top",
    fontSize: config.hp("2.25%"),
  },
  buttonContainer: {
    height: config.hp("5%"),
    backgroundColor: theme.colors.primary,
    width: "80%",
    borderRadius: config.wp("2%"),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    elevation: config.hp("1%"),
  },
  buttonText: {
    fontSize: config.hp("2.5%"),
    color: "white",
  },
  helpContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: config.hp("3%"),
    paddingHorizontal: config.wp("12%"),
  },
  helpIcon: {
    fontSize: config.hp("4.5%"),
    color: theme.colors.primary,
  },
  centerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  helperText: {
    textAlign: "center",
    fontSize: config.hp("2.15%"),
  },
});
