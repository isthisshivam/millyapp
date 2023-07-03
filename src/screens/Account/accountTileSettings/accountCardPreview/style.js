import { StyleSheet } from "react-native";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";

export const styles = StyleSheet.create({
  slide: {
    paddingHorizontal: config.wp("1.5%"),
    paddingBottom: config.hp("2.5%"),
    flexBasis: "100%",
    flex: 1,
    maxWidth: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    height: config.hp("25%"),
  },

  card: {
    backgroundColor: "white",
    width: config.wp("70%"),
    height: "80%",

    shadowOffset: {
      width: 0,
      height: config.hp("2%"),
    },
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "white",
    borderRadius: config.hp("2%"),
    paddingHorizontal: config.wp("1.5%"),
    paddingVertical: config.hp("1.5%"),
    elevation: config.hp("1%"),
    shadowColor: "black",
    position: "relative",
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: config.wp("1.2%"),
  },
  balanceContainer: {
    marginBottom: config.hp("1.5%"),
  },
  accountContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",

    paddingHorizontal: config.wp("1.2%"),
  },
  icon: {
    color: "#C7C7CC",
  },
  titleMain: {
    fontSize: config.hp("2.25%"),
    color: "#0EA44B",
    fontWeight: "bold",
    textTransform: "capitalize",
  },

  balance: {
    fontSize: config.hp("4.5%"),
    letterSpacing: 1,
  },
  accountNumber: {
    fontSize: config.hp("2.25%"),
    letterSpacing: config.wp(".2%"),
    paddingLeft: config.wp("1.5%"),
  },
  previewText: {
    fontSize: config.hp("2.8%"),
    fontWeight: "bold",
    textAlign: "center",
  },
  previewTextContainer: {
    paddingVertical: config.hp(".5%"),
    marginBottom: config.hp("1.5%"),
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },
  cardImageContainer: {
    position: "absolute",
    height: config.hp("8%"),
    width: config.wp("20%"),
    right: config.wp("2%"),
    bottom: config.hp("1.5%"),
    borderRadius: config.hp("1%"),
    overflow: "hidden",
    borderRadius: config.hp("2%"),
    elevation: config.hp("1%"),
  },
  cardImage: {
    height: "100%",
    width: "100%",
  },
});
