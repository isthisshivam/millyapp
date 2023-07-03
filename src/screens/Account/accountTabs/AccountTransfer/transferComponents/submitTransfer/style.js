import { StyleSheet } from "react-native";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "white",
    paddingTop: config.deviceHeight * 0.0125,
    paddingHorizontal: config.deviceWidth * 0.05,

    height: "100%",
    flexDirection: "column",
    //   justifyContent: "space-around",
  },
  fieldContainer: {
    height: "70%",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  fieldItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: config.hp("2%"),
    height: config.hp("5%"),
  },
  fieldText: {
    fontSize: 22,
    fontWeight: "bold",
    width: "60%",
  },
  dropDownContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    paddingVertical: config.hp(".5%"),
  },
  buttonContainer: {
    width: "100%",
    paddingTop: config.hp("2%"),
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: theme.colors.inActive,
    borderRadius: config.hp("1.5%"),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: config.hp("8%"),
    width: "100%",
  },
  buttonText: {
    fontSize: config.hp("2.5%"),
    color: "white",
    fontWeight: "bold",
    textTransform: "capitalize",
    letterSpacing: config.wp(".5%"),
  },
  isSafe: {
    backgroundColor: theme.colors.primary,
  },
  icon: {
    fontSize: config.hp("3%"),
    marginLeft: config.wp("2%"),
  },
  dropDownText: {
    fontSize: config.hp("2.5%"),
  },
});
