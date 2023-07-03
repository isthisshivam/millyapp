import { StyleSheet } from "react-native";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";

export const styles = StyleSheet.create({
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
  },
  isSelected: {
    borderBottomWidth: config.hp(".75%"),
    borderBottomColor: theme.colors.primary,
  },
  buttonText: {
    color: "grey",
    textAlign: "center",
    fontSize: config.hp("2.15%"),
  },
  isSelectedText: {
    color: "black",
    fontSize: config.hp("2.15%"),
  },

  button: {
    backgroundColor: "white",
    paddingVertical: config.hp(".8%"),
  },
});
