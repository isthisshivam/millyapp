import { StyleSheet } from "react-native";
import { config } from "../../../config/Config";

export const styles = StyleSheet.create({
  slide: {
    paddingHorizontal: config.wp("2%"),
    paddingBottom: config.hp("2%"),
    flexBasis: "100%",
    flex: 1,
    maxWidth: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    height: config.hp("25"),
    // backgroundColor: "white",
  },

  card: {
    width: config.wp("75%"),
    height: "90%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    borderRadius: 12,
    padding: config.hp("1.2%"),
    //elevation: config.hp("1%"),
    shadowColor: "#000",
    //shadowOffset: { width: 0, height: 10 },
    //shadowOpacity: 0.4,
    shadowRadius: 5,
    borderWidth: 1,
    zIndex: 10,
  },
  cardIsSelected: {
    backgroundColor: "white",
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  balanceContainer: {
    marginBottom: 15,
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
    fontSize: config.hp("2.1%"),
    fontWeight: "bold",
    textTransform: "capitalize",
  },

  balance: {
    fontSize: config.hp("4.5%"),
    letterSpacing: 1,
  },
  accountNumber: {
    fontSize: config.hp("2.2%"),
    paddingLeft: config.wp("1.2%"),
    // letterSpacing: 2.5,
  },
});

export default styles;
