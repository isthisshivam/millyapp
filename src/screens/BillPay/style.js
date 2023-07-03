import { StyleSheet } from "react-native";
import { config } from "../../config/Config";
import { theme } from "../../config/Theme";

export const styles = StyleSheet.create({
  titleContainer: {
    paddingVertical: config.hp("2%"),
    paddingHorizontal: config.wp("4%"),
    backgroundColor: "white",
  },
  title: {
    fontSize: config.hp("5%"),
    fontWeight: "bold",
  },
  container: {
    paddingTop: config.hp("3%"),
    paddingBottom: config.hp("2%"),
    paddingHorizontal: config.wp("4%"),
    backgroundColor: "white",
  },
  helperText: {
    lineHeight: config.hp("2.75%"),
    fontSize: config.hp("1.95%"),
    marginBottom: config.hp("1%"),
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: config.hp("1.5%"),
    paddingHorizontal: config.wp("2%"),
    elevation: config.hp(".75%"),
    marginTop: config.hp("1%"),
    marginVertical: config.hp(".5%"),
    backgroundColor: theme.colors.fadedBackground,
    borderRadius: config.hp("1%"),
  },
  buttonText: {
    fontSize: config.hp("2.5%"),
    fontWeight: "bold",
    color: "black",
  },
  icon: {
    fontSize: config.hp("3.5%"),
    color: theme.colors.primary,
  },
  scrollContainer: {
    paddingVertical: config.hp("2%"),
    paddingHorizontal: config.wp("4%"),
    backgroundColor: "white",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  button2: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: config.hp("1.5%"),
    paddingHorizontal: config.wp("2%"),
    elevation: config.hp(".75%"),
    marginTop: config.hp("1%"),
    marginVertical: config.hp("1.25%"),
    backgroundColor: theme.colors.fadedBackground,
    borderRadius: config.hp("1%"),
  },
});
