import { StyleSheet } from "react-native";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";

export const styles = StyleSheet.create({
  mainContainer: {
    height: config.hp("6.5%"),
  },
  container: {
    height: "100%",
    width: "100%",
    flexDirection: "row",
  },
  buttonContainer: {
    height: "100%",
    width: "50%",
    borderWidth: 1,
    borderColor: "grey",
    borderStyle: "solid",
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  isSelected: {
    borderBottomWidth: config.hp(".75%"),
    borderBottomColor: theme.colors.primary,
  },
  isSelectedText: {
    color: "black",
  },
  text: {
    color: "grey",
    fontSize: config.hp("2.25%"),
  },
  border: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "grey",
  },
  button: {
    backgroundColor: "white",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
