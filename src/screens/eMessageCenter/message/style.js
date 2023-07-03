import { StyleSheet } from "react-native";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";

export const styles = StyleSheet.create({
  content: {
    fontSize: config.hp("2.1%"),
    lineHeight: config.hp("2%"),
    color: theme.colors.black,
  },
  contentContainer: {
    marginTop: config.hp(".5%"),
    paddingHorizontal: config.wp("4%"),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  message: {
    paddingVertical: config.hp("2%"),
    paddingHorizontal: config.wp("3%"),
    borderBottomColor: "#e0e0e0",
    borderBottomWidth: 2,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  messageTime: {
    fontSize: config.hp("2.15%"),
    color: theme.colors.fadedDark,
  },
  messageTitle: {
    color: theme.colors.primary,
    width: config.wp("50%"),
  },

  rightSideContent: {
    paddingHorizontal: config.wp("5%"),
    backgroundColor: theme.colors.danger,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: config.hp(".5%"),
    marginLeft: config.wp(".1%"),
    borderTopLeftRadius: config.hp(".5%"),
    borderBottomLeftRadius: config.hp(".5%"),
  },
  rightSideText: {
    color: theme.colors.whiteText,
    fontWeight: "700",
    fontSize: config.hp("2.1%"),
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: config.hp("1.5%"),
    width: "100%",
    paddingHorizontal: config.wp("2%"),
  },
});
