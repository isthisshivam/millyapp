import { StyleSheet } from "react-native";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";

export const styles = StyleSheet.create({
  sectionOptionsContainer: {
    height: config.hp("6.5%"),

    width: "100%",
    flexDirection: "row",
    elevation: config.hp("1%"),
  },
  container: {
    width: "100%",
    flexDirection: "row",
  },
  buttonContainer: {
    width: "50%",
    borderWidth: config.hp(".1%"),
    borderColor: "grey",
    borderStyle: "solid",
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: config.hp("1%"),
    backgroundColor: "white",
    elevation: config.hp("1%"),
  },
  isSelected: {
    borderBottomWidth: config.hp(".65%"),
    borderBottomColor: theme.colors.primary,
  },
  isSelectedText: {
    color: "black",
  },
  text: {
    color: "grey",
    fontSize: config.hp("2.155%"),
  },
});
