import { StyleSheet } from "react-native";
import { config } from "../../config/Config";
import { theme } from "../../config/Theme";

export const styles = StyleSheet.create({
  buttonContainer: {
    paddingHorizontal: 15,
    marginTop: 40,
  },
  titleContainer: {
    paddingVertical: config.hp("1%"),
    paddingHorizontal: config.wp("5%"),
  },
  title: {
    fontSize: config.hp("4%"),
    fontWeight: "bold",
  },
  titleSecondary: {
    fontSize: config.hp("2.25%"),
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  optionsContainer: {
    marginTop: config.hp("2%"),
    paddingHorizontal: config.wp("5%"),
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: config.hp("1.3%"),
    borderBottomWidth: config.hp(".1%"),
    borderBottomColor: theme.colors.fade3,
    paddingVertical: config.hp("4%"),
  },
  optionTitle: {
    fontSize: config.hp("2.25%"),
    color: theme.colors.primary,
    fontWeight: "bold",
  },
  arrowIcon: {
    color: theme.colors.primary,
    fontSize: 22,
  },
  flipContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "50%",
    alignItems: "center",
  },
  flipTitle: {
    fontSize: config.hp("1.95%"),
    paddingHorizontal: config.wp("2%"),
  },
  statement: {
    backgroundColor: "white",
    marginBottom: config.hp("1%"),
    paddingVertical: config.hp("1%"),
    borderRadius: 12,
    paddingHorizontal: config.wp("2%"),
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
