import { StyleSheet } from "react-native";
import { config } from "../../../config/Config";

export const styles = StyleSheet.create({
  slide: {
    paddingHorizontal: config.wp(".5%"),
    paddingBottom: config.hp(".5%"),
    flexBasis: "100%",
    flex: 1,
    maxWidth: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    height: config.hp("18%"),
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  card: {
    width: config.wp("70%"),
    height: "80%",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    borderRadius: config.hp("1.5%"),
    padding: config.hp("1.2%"),
    elevation: config.hp("1%"),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: config.hp("1%") },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    backgroundColor: "#f0f0f0",
    shadowColor: "white",
  },
  cardIsSelected: {
    backgroundColor: "white",
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: config.wp("1%"),
  },
  balanceContainer: {
    marginBottom: config.hp("1.5%"),
  },
  accountContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",

    // paddingHorizontal: 5,
  },
  accountContainer2: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  iconSelected: {
    color: "#0EA44B",
  },
  icon: {
    color: "grey",
  },
  titleMain: {
    fontSize: config.hp("1.8%"),

    color: "#0EA44B",
    fontWeight: "bold",
    textTransform: "capitalize",
  },

  balance: {
    fontSize: config.hp("3.5%"),

    letterSpacing: 1,
  },
  accountNumber: {
    fontSize: config.hp("2.2%"),
    paddingLeft: config.wp("1.2%"),
    // letterSpacing: 2.5,
  },
});

export default styles;
