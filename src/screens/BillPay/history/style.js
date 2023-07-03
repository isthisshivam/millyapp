import { StyleSheet } from "react-native";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";

export const styles = StyleSheet.create({
  titleContainer: {
    paddingVertical: config.hp("2%"),
    paddingTop: config.hp("2%"),
    paddingHorizontal: config.wp("4%"),
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: config.hp("2.5%"),
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  rightTitle: {
    fontSize: config.hp("2.05%"),
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  searchSection: {
    width: "100%",
    paddingHorizontal: config.wp("2%"),
    backgroundColor: "white",
  },
  searchContainer: {
    width: "100%",
    borderRadius: config.hp("1%"),
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: theme.colors.fadedBackground,
    borderRadius: config.hp("2%"),
    paddingHorizontal: config.wp("2%"),
    paddingVertical: config.hp("1%"),
  },
  searchIcon: {
    width: "20%",
    fontSize: config.hp("2.5%"),
  },
  input: {
    width: "90%",
    backgroundColor: "#fff",
    color: "#424242",
    paddingLeft: config.wp("2%"),
    fontSize: config.hp("2.5%"),
    paddingVertical: config.hp("1.2%"),
    marginLeft: config.wp(".5%"),
  },
  scrollContainer: {
    backgroundColor: theme.colors.white,
    paddingHorizontal: config.wp("4%"),
    paddingVertical: config.hp("2%"),
  },
  historyItem: {
    borderBottomWidth: 1,
    paddingVertical: config.hp("1.75%"),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: config.wp("2%"),
    width: "100%",
  },

  date: {
    fontSize: config.hp("2.15%"),
    color: theme.colors.fade5,
    width: config.wp("28%"),
  },
  company: {
    fontSize: config.hp("2.15%"),
    fontWeight: "bold",
    width: config.wp("45%"),
    textAlign: "left",
  },
  amount: {
    fontSize: config.hp("2.05%"),
    color: theme.colors.primary,
    width: config.wp("20%"),
  },
});
