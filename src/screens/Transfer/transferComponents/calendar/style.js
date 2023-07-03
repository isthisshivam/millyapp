import { StyleSheet } from "react-native";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: config.wp("4%"),
    paddingVertical: config.hp("4%"),
  },
  calender: {
    borderRadius: config.hp("1%"),
    borderWidth: 1,
    borderColor: "gray",
    elevation: config.hp(".5%"),
  },
  confirmDateTextContainer: {
    paddingHorizontal: config.wp("4%"),
    paddingVertical: config.hp("2%"),
  },
  dateConfirmTitle: {
    color: theme.colors.black,
    fontSize: config.hp("1.95%"),
    paddingVertical: config.hp("2.5%"),
    fontWeight: "bold",
  },
  input: {
    paddingLeft: config.wp("2%"),
    paddingVertical: config.hp("1.2%"),
    borderBottomColor: theme.colors.fade4,
    borderBottomWidth: config.hp(".1%"),
    backgroundColor: theme.colors.fadedBackground,
    fontSize: config.hp("2.5%"),
    borderRadius: config.hp(".5%"),
  },
});
