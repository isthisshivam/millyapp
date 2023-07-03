import { StyleSheet } from "react-native";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";

export const styles = StyleSheet.create({
  activity: {
    borderBottomWidth: config.hp(".035%"),
    borderTopWidth: config.hp(".035%"),
    paddingVertical: config.hp("2%"),
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: config.wp("2%"),
  },
  activityLeftSection: {
    width: "65%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: config.wp("4%"),
  },

  Icon: {
    fontSize: config.hp("2.5%"),
    color: "#3C3C434D",
    fontWeight: "bold",
  },
  accountContainer: {
    flexDirection: "column",
    justifyContent: "center",
    width: "70%",
  },
  accountName: {
    color: "#3b3b3d",
    fontWeight: "bold",
    fontSize: config.hp("2.1%"),
    textTransform: "capitalize",
  },
  accountNumber: {
    color: "#797979",
  },
  activityRightSection: {
    width: "30%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  activityAmount: {
    fontSize: config.hp("2.25%"),
    color: theme.colors.primary,
    fontWeight: "bold",
  },
});
