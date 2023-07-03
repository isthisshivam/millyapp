import { StyleSheet } from "react-native";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";

export const styles = StyleSheet.create({
  formItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: config.hp("2%"),
    paddingHorizontal: config.wp("2%"),
  },
  formItemActive: {
    backgroundColor: "rgba(116.0, 116.0, 128.0, 0.08)",
  },
  formItemRight: {
    // width: config.wp("18%"),
    width: "50%",

    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  formItemRightAccount: {
    width: config.wp("20%"),
    backgroundColor: "blue",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  arrowIcon: {
    fontSize: config.hp("2.75%"),
  },
  formItemTitleOne: {
    fontSize: config.hp("2.5%"),
    color: "black",
    textTransform: "capitalize",
  },
  formItemTitleTwo: {
    fontSize: config.hp("2.55%"),
    color: theme.colors.primary,
    textTransform: "capitalize",
    textAlign: "center",
  },
});
