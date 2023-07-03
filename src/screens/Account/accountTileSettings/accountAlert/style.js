import { StyleSheet } from "react-native";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  cardContainer: {
    backgroundColor: "white",
  },
  title: {
    fontSize: config.hp("2.25%"),
    color: theme.colors.primary,
    fontWeight: "bold",
  },
  secondaryTitle: {
    fontSize: config.hp("1.95%"),
  },
  titleContainer: {
    backgroundColor: "white",

    paddingVertical: config.hp("2.5%"),
  },
  accountAlertsContainer: {
    backgroundColor: "white",
    paddingVertical: config.hp("2.5%"),
    paddingHorizontal: config.wp("2.5%"),
  },
  switchContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: config.hp("1.5%"),
  },
  titleEnabled: {
    color: theme.colors.primary,
    fontSize: config.hp("2.25%"),
    fontWeight: "bold",
  },
  titleDisabled: {
    color: theme.colors.fade2,
    fontSize: config.hp("2.25%"),
    fontWeight: "bold",
  },
});
