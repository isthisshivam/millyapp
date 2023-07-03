import { StyleSheet } from "react-native";
import { config } from "../../config/Config";
import { theme } from "../../config/Theme";

export const styles = StyleSheet.create({
  date: {
    fontSize: 18,
  },
  dateContainer: {
    backgroundColor: "#e0e0e0",
    paddingVertical: config.hp("1%"),
    paddingHorizontal: config.wp("4%"),
  },
  icon: {},
  scrollContainer: {
    backgroundColor: "white",
    flex: 1,
  },

  seperator: {
    height: config.hp(".1%"),
    width: "100%",
    flex: 1,
    height: 1,
    backgroundColor: "gray",
  },
  title: {
    fontSize: config.hp("2%"),
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  titleContainer: {
    paddingVertical: config.hp("1%"),
    paddingHorizontal: config.wp("5%"),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
