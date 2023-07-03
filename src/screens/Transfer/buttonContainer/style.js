import { StyleSheet } from "react-native";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";

export const styles = StyleSheet.create({
  sectionOptionsContainer: {
    width: "100%",
    flexDirection: "row",
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
  },
  isSelected: {
    borderBottomWidth: config.hp(".65%"),
    borderBottomColor: theme.colors.primaryLight,
  },
  isSelectedText: {
    color: "black",
  },
  text: {
    color: "grey",
    fontSize: config.hp("2.155%"),
  },
});
