import { StyleSheet } from "react-native";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";

export const styles = StyleSheet.create({
  arrowIcon: {
    fontSize: config.hp("4.5%"),
    color: theme.colors.fade4,
  },
  bottomContainer: {
    backgroundColor: "white",

    paddingVertical: config.hp("3%"),
    paddingHorizontal: config.wp("3%"),
  },
  checks: {},
  checkContainer: {
    backgroundColor: "#f5f5f5",
    paddingVertical: config.hp("5%"),
    alignItems: "center",
    flex: 1,
  },
  checkImage: {
    height: config.hp("25%"),
    width: config.wp("95%"),
    resizeMode: "contain",
  },
  checkImage1: { height: config.hp("30%"), paddingVertical: config.hp("4%") },
  checkImage2: { height: config.hp("30%"), paddingVertical: config.hp("4%") },
  detail: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    borderBottomWidth: config.hp(".15%"),
  },
  detailTitleMain: {
    color: theme.colors.primary,
    fontSize: config.hp("2.5%"),
  },

  detailTitleSecondary: {
    fontSize: config.hp("2.25%"),
    fontWeight: "bold",
    textAlign: "right",
    textTransform: "capitalize",
  },
  imageContainer: {
    height: "20%",
    backgroundColor: "red",
  },
  image: {
    height: "100%",
  },
  paragraph: {
    fontSize: config.hp("1.85%"),
    marginBottom: config.hp("1%"),
  },
  paragraphTitle: {
    fontSize: config.hp("2.25%"),
    marginBottom: config.hp("1%"),
    color: theme.colors.primary,
    fontWeight: "bold",
  },
  topContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: config.wp("1%"),
    paddingVertical: config.hp("5%"),
  },
});
