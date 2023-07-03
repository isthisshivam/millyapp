import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";

export const styles = StyleSheet.create({
  container: {
    maxHeight: config.hp("35.5%"),
    backgroundColor: theme.colors.fade1,
    paddingHorizontal: config.wp("2.5%"),
    paddingVertical: config.hp("2.25%"),
  },
  titleContainer: {
    paddingVertical: config.hp(".2%"),
    marginBottom: config.hp("1%"),
  },
  title: {
    fontSize: config.hp("2.5%"),
    color: theme.colors.primary,
    fontWeight: "bold",
  },
  upComingAlertcontainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: config.hp(".05%"),
    paddingVertical: config.hp(".5%"),
    marginTop: config.hp(".2%"),
    marginBottom: config.hp(".2%"),
  },
  alertNameContainer: {
    maxWidth: "50%",
  },
  alertName: {
    fontSize: config.hp("2.25%"),
    width: "100%",
    textTransform: "capitalize",
  },
  alertDateContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    maxWidth: "50%",
  },
  alertDate: {
    fontSize: config.hp("2.2%"),
    color: theme.colors.fade2,
  },
  arrowIcon: {
    fontSize: config.hp("2.5%"),
    color: theme.colors.fade2,
    paddingVertical: config.hp(".2%"),
  },
  linkContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: config.hp("2%"),
  },
  link: {
    color: theme.colors.primary,
    fontSize: config.hp("2.3%"),
  },
});
