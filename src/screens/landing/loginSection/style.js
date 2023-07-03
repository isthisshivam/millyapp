import { StyleSheet } from "react-native";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: config.hp("18%"),

    overflow: "hidden",
    paddingVertical: 10,
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    paddingHorizontal: config.wp("4%"),
    width: "100%",
  },
  inputView: {
    width: "100%",
    height: config.hp("8%"),
  },
  input: {
    // height: config.deviceHeight * 0.09,
    height: config.hp("7%"),
    backgroundColor: "white",
    fontSize: config.hp("2.15%"),
  },
  inputTry: {
    flex: 1,
  },
  bioContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    //paddingVertical: config.hp("7%"),
    paddingHorizontal: config.wp("2%"),
    //height: "60%",
    // marginTop: config.hp("4%"),
    flex: 1,
    backgroundColor: "blue",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: config.hp("2%"),
    paddingHorizontal: config.wp("2%"),
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: config.hp(".5%"),
    paddingVertical: config.hp("1.35%"),
    width: "100%",
    elevation: config.hp(".5%"),
  },
  buttonText: {
    color: "white",
    fontSize: config.hp("2.55%"),
  },

  signIn: {
    color: "black",
    marginTop: 10,
    height: 50,
    width: "100%",
    alignItems: "center",
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    paddingVertical: 5,
    color: "gray",
    alignItems: "center",
  },
  switchText: {
    color: "gray",
  },
  touchId: {
    flexDirection: "row",
    backgroundColor: theme.colors.primary,
    borderRadius: config.hp(".5%"),
    paddingVertical: config.hp("1%"),
    width: "100%",
    elevation: config.hp(".5%"),
    paddingHorizontal: config.wp("4%"),
    height: config.hp("6%"),
    alignItems: "center",
    justifyContent: "center",
  },
});
