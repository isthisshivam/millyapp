import { StyleSheet } from "react-native";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";

export const styles = StyleSheet.create({
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
  buttonContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    paddingVertical: config.hp("2%"),
  },
  buttonText: {
    color: theme.colors.primary,
    fontWeight: "bold",
    fontSize: config.hp("2%"),
  },
  container: {
    width: "100%",

    paddingVertical: config.hp("2%"),
    paddingHorizontal: config.wp("2.75%"),
    height: config.hp("54%"),
    borderBottomColor: theme.colors.disabled,
    borderBottomWidth: config.hp(".1%"),
  },
  date: {
    fontSize: config.hp("2.05%"),
    color: "#797979",
  },
  dateContainer: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  icon: {
    fontSize: config.hp("2.5%"),
  },
  reminderAmount: {
    textAlign: "right",
    color: "#0EA44B",
    fontSize: config.hp("2.05%"),
  },
  reminderAmountContainer: {
    flex: 1.8,
  },
  reminderContainer: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    height: "65%",
    width: "100%",
  },

  reminderName: {
    textAlign: "center",
    color: "black",
    fontWeight: "bold",
    fontSize: config.hp("2.05%"),
    //textTransform: "capitalize",
  },
  reminderNameContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: config.hp("2.05%"),
    color: theme.colors.primary,
    fontWeight: "bold",
    marginBottom: config.hp("1%"),
  },
  titleContainer: {
    paddingVertical: config.hp("1.25%"),
  },

  tableItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    width: "100%",

    borderBottomWidth: config.hp(".1%"),
    paddingVertical: config.hp(".25%"),
    borderBottomColor: theme.colors.fade,
  },
});
