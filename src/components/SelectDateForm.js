import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import FeatherIcon from "react-native-vector-icons/Feather";
import DateTimePicker from "@react-native-community/datetimepicker";
import { config } from "../config/Config";
import { theme } from "../config/Theme";

const SelectDateForm = ({ leftTitle, rightName, handleChange, input }) => {
  const [show, setShow] = useState(false);
  const newDate = new Date(rightName);

  return (
    <View style={{ height: config.hp("20%"), width: "100%" }}>
      {show ? (
        <View
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "gray",
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        >
          <DateTimePicker
            style={{ backgroundColor: "white", width: "100%", display: "flex" }}
            value={new Date()}
            display="calendar"
            onChange={(date, event) => {
              setShow(false), handleChange("date", date.nativeEvent.timestamp);
            }}
          />
        </View>
      ) : (
        <TouchableOpacity
          style={styles.formItem}
          onPress={() => {
            setShow(true);
          }}
        >
          <Text style={styles.formItemTitleOne}>{leftTitle}</Text>

          <View style={styles.formItemRight}>
            <Text style={styles.formItemTitleTwo}>
              {rightName ? newDate.toLocaleDateString("en-US") : "Date"}
            </Text>
            <FeatherIcon style={styles.arrowIcon} name="chevron-right" />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  arrowIcon: {
    fontSize: config.hp("2.75%"),
  },
  formItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  formItemActive: {
    backgroundColor: "rgba(116.0, 116.0, 128.0, 0.08)",
  },
  formItemRight: {
    // width: config.wp("18%"),
    width: "50%",

    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  formItemRightAccount: {
    width: config.wp("20%"),
    backgroundColor: "blue",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  formItemTitleOne: {
    fontSize: config.hp("2.1%"),
    color: theme.colors.fade5,
  },
  formItemTitleTwo: {
    fontSize: config.hp("2.55%"),
    color: theme.colors.primary,
    textTransform: "capitalize",
    textAlign: "center",
  },
});

export default SelectDateForm;
