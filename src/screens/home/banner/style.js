import { StyleSheet } from "react-native";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";

export const styles = StyleSheet.create({
  container: {
    height: config.hp("22%"),
    width: "100%",
    overflow: "hidden",
  },
  icon: {
    paddingRight: 10,
  },
  imageContainer: {
    height: "80%",
  },
  image: {
    height: "100%",
    width: "100%",
  },
  textContainer: {
    height: 90,
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: config.hp("2%"),
    paddingVertical: config.hp("1%"),
    backgroundColor: "white",
    borderBottomColor: theme.colors.fade,
    borderBottomWidth: config.hp(".08%"),
    width: "100%",
  },
  textMain: {
    fontSize: config.hp("2%"),
  },
  textSub: {
    fontSize: config.hp("1.80"),
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: config.hp("2"),
    paddingVertical: config.hp("0.80"),
    alignItems: "center",
    height: config.hp("7%"),
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
    paddingTop: config.hp("4%"),
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: config.hp("55%"),
    width: config.wp("95%"),
  },
});
