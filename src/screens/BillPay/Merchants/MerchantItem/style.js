import { StyleSheet } from "react-native";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";

export const styles = StyleSheet.create({
  item: {
    backgroundColor: theme.colors.fadedBackground,
    marginVertical: config.hp("1%"),
    paddingHorizontal: config.wp("2.5%"),
    paddingVertical: config.hp("1%"),
    elevation: config.hp(".25%"),
    borderRadius: config.hp(".5%"),
  },
  topItemInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemContent: {
    paddingVertical: config.hp("2.5%"),
  },
  merchantName: {
    fontSize: config.hp("2.5%"),
    fontWeight: "bold",
  },
  plusIcon: {
    color: theme.colors.fade,
    fontSize: config.hp("4%"),
  },
  infoContainer: {
    flexDirection: "row",
    paddingVertical: config.hp(".75%"),
    marginVertical: config.hp("1%"),
  },
  leftText: {
    fontSize: config.hp("2.25%"),
    color: "#5F5F60",
  },
  rightText: {
    fontSize: config.hp("2.25%"),
    color: theme.colors.primary,
    maxWidth: "80%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginHorizontal: config.wp("2%"),
    marginVertical: config.hp(".5%"),
    paddingVertical: config.hp("1%"),
    borderRadius: config.hp("1%"),
    paddingHorizontal: config.wp("2%"),
    elevation: config.hp(".5%"),
  },
  button1: {
    backgroundColor: theme.colors.primary,
  },
  button2: {
    backgroundColor: theme.colors.black,
  },
  buttonText: {
    color: theme.colors.white,
    fontSize: config.hp("2.1%"),
  },
});
