import React, { useCallback, useRef, useMemo } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import AlertTriggers from "./AlertTriggers";
import AlertAccounts from "./AlertAccounts";
import ContactMethod from "./ContactMethod";
import AlertActions from "./AlertActions";
import AlertType from "./AlertType";
// import TierSheet from "./TierSheet";
// import ServiceSheet from "./ServiceSheet";
//import FrequencySheet from "./FrequencySheet";

const BottomSheets = ({
  sheet,
  bottomSheetRef,
  handleChange,
  closeSheet,
  payload,
  accountType,
}) => {
  //console.log(tiers);
  function handleBottomSheet() {
    switch (sheet) {
      case "Triggers":
        return (
          <AlertTriggers
            closeSheet={closeSheet}
            handleChange={handleChange}
          ></AlertTriggers>
        );

      case "Accounts":
        return (
          <AlertAccounts
            closeSheet={closeSheet}
            handleChange={handleChange}
            accountType={accountType}
            payload={payload}
          ></AlertAccounts>
        );

      case "Actions":
        return (
          <AlertActions
            closeSheet={closeSheet}
            handleChange={handleChange}
          ></AlertActions>
        );

      case "contactMethod":
        return (
          <ContactMethod
            closeSheet={closeSheet}
            handleChange={handleChange}
          ></ContactMethod>
        );
      case "Alert Type":
        return (
          <AlertType
            closeSheet={closeSheet}
            handleChange={handleChange}
          ></AlertType>
        );
      default:
        closeSheet();
        return;
    }
  }
  return (
    <BottomSheet
      index={-1}
      ref={bottomSheetRef}
      snapPoints={["40%"]}
      style={{ borderwidth: 1, borderColor: "gray" }}
      enablePanDownToClose
      //onChange={handleSheetChange}
    >
      {handleBottomSheet()}
    </BottomSheet>
  );
};

export default BottomSheets;
