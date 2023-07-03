import { StyleSheet } from "react-native";
import { config } from "../../../../../config/Config";
import { theme } from "../../../../../config/Theme";

export const styles = StyleSheet.create({
  vehicleInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    paddingVertical: config.hp("1.5%"),
    marginBottom: config.hp("1.5%"),
    borderBottomWidth: config.hp(".05%"),
    borderBottomColor: theme.colors.black,
  },
  vehicleInfoLabel: {
    fontSize: config.hp("2%"),
    fontWeight: "bold",
    maxWidth: "50%",
  },
  vehicleInfoItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: config.wp("1%"),
    marginVertical: config.hp(".50%"),
  },

  vehicleInfoText: {
    color: theme.colors.primary,
    fontSize: config.hp("2.25%"),
    maxWidth: "70%",
  },
});
