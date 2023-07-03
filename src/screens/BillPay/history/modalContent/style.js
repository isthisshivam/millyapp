import { StyleSheet } from "react-native";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";

export const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'backdrop: "rgba(0,0,0,0.5)',
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    height: "50%",
    width: "80%",
    backgroundColor: "#F4F4F4",
    paddingHorizontal: config.wp("4%"),
    paddingVertical: config.hp("1.5%"),
    borderRadius: config.hp("2%"),
    flexDirection: "column",
    justifyContent: "space-evenly",
    position: "relative",
    elevation: config.hp("1%"),
  },
  titleContainer: {
    justifyContent: "center",
    backgroundColor: "red",
  },
  title: {
    fontSize: config.hp("2.5%"),
    textAlign: "center",
    fontWeight: "bold",
    letterSpacing: 1,
    textTransform: "capitalize",
  },
  containerColor: {
    backgroundColor: "white",
  },
  titleContainer: {
    paddingVertical: config.hp("2%"),
  },
  sectionTitle: {
    fontSize: config.hp("2.5%"),
    color: theme.colors.primary,
    fontWeight: "bold",
  },
  RowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  ColumnContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  Icon: {
    fontSize: config.hp("10%"),
    height: config.hp("25%"),
    color: "red",
  },
  iconContainer: {
    position: "absolute",
    right: config.wp("4%"),
    top: 0,
  },
  helperText: {
    textAlign: "center",
    fontSize: config.hp("2.15%"),
  },
  mainText: {
    fontSize: config.hp("2.35%"),
    fontWeight: "bold",
    color: "black",
  },
  secondaryText: {
    fontSize: config.hp("2.155%"),
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  centerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  description: {
    fontSize: config.hp("2%"),
    color: "black",
  },
  buttonContainer: {
    height: config.hp("5%"),
    backgroundColor: theme.colors.primary,
    width: "80%",
    borderRadius: config.wp("2%"),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: config.hp("2.5%"),
    color: "white",
  },
  helpContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: config.hp("1.2%"),
  },
  helpIcon: {
    fontSize: config.hp("4.5%"),
    color: theme.colors.primary,
  },
});
