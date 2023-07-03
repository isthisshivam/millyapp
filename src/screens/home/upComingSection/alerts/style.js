import { StyleSheet } from "react-native";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: config.hp("2%"),
    paddingHorizontal: config.wp("2.75%"),
    height: config.hp("54%"),
    borderBottomColor: theme.colors.disabled,
    borderBottomWidth: config.hp(".1%"),
  },
  titleContainer: {
    paddingVertical: config.hp("1.25%"),
    marginBottom: config.hp("1.2%"),
  },
  title: {
    fontSize: config.hp("2.05%"),
    color: theme.colors.primary,
    fontWeight: "bold",
    marginBottom: config.hp("1%"),
  },
  alertContainer: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    height: "65%",
    width: "100%",
  },

  alertItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: config.hp(".1%"),
    paddingVertical: config.hp(".2%"),
    paddingBottom: config.hp("1%"),
    borderBottomColor: theme.colors.faded,
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingRight: config.wp("2%"),
  },
  alertName: {
    fontSize: config.hp("2.15%"),
    color: theme.colors.primaryLight,
    textTransform: "capitalize",
  },
  date: {
    fontSize: config.hp("2.15%"),
    color: theme.colors.primaryLight,
  },
  icon: {
    fontSize: config.hp("2.60%"),
    color: theme.colors.faded,
  },

  buttonContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: config.hp("2%"),
  },
  button: {
    backgroundColor: "#fff",
    paddingVertical: config.hp("2%"),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: config.hp("1%"),
    borderWidth: config.wp(".25%"),
    borderColor: theme.colors.faded,
    width: config.wp("75%"),
  },
  buttonText: {
    color: theme.colors.primary,
    fontWeight: "bold",
    fontSize: config.hp("2%"),
  },
});
