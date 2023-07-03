import { StyleSheet } from "react-native";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";

export const styles = StyleSheet.create({
  accountContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    paddingHorizontal: config.wp("1.2%"),
  },
  accountNumber: {
    fontSize: config.hp("2.25%"),
    letterSpacing: config.wp(".2%"),
    paddingLeft: config.wp("1.5%"),
    color: "black",
  },
  balance: {
    fontSize: config.hp("4.5%"),
    letterSpacing: 1,
    color: "black",
  },
  balanceContainer: {
    marginBottom: config.hp("1.5%"),
  },
  card: {
    backgroundColor: theme.colors.primary,
    width: config.wp("70%"),
    height: config.hp("20%"),
    shadowOffset: {
      width: 0,
      height: config.hp("2%"),
    },
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    borderRadius: config.hp("2%"),
    paddingHorizontal: config.wp("1.5%"),
    paddingVertical: config.hp("1.5%"),
    elevation: config.hp("1%"),
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowColor: "black",
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: config.wp("1.2%"),
  },
  container: {
    width: "100%",
    backgroundColor: "#e0e0e0",
  },

  title: {
    fontSize: config.hp("2.15%"),
    color: theme.colors.primary,
    fontWeight: "bold",
  },
  secondaryTitle: {
    fontSize: config.hp("1.95%"),
  },
  titleContainer: {
    backgroundColor: "white",
    paddingHorizontal: config.wp("2.5%"),
    paddingVertical: config.hp("2.5%"),
  },
  accountAlertsContainer: {
    backgroundColor: "white",
    paddingVertical: config.hp("2.5%"),
    paddingHorizontal: config.wp("2.5%"),
  },
  nickNameInput: {
    backgroundColor: "white",
  },
  buttonContainer: {
    paddingVertical: config.hp("1%"),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    paddingBottom: config.hp("3.5%"),
  },
  button: {
    backgroundColor: theme.colors.danger,
    borderRadius: config.hp("1%"),
    width: config.wp("40%"),
    paddingVertical: config.hp("1.5%"),
    elevation: config.hp(".8%"),
  },
  buttonText: {
    color: theme.colors.whiteText,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: config.hp("2.15%"),
  },
  slide: {
    paddingHorizontal: config.wp("1.5%"),
    paddingBottom: config.hp("2.5%"),
    flexBasis: "100%",
    flex: 1,
    maxWidth: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },
  titleMain: {
    fontSize: config.hp("2.25%"),
    color: "black",
    fontWeight: "bold",
    textTransform: "capitalize",
  },
});
