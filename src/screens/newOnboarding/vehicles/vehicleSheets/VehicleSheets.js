import React from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import TypeSheet from "./TypeSheet";
import YearSheet from "./YearSheet";
import MakeSheet from "./MakeSheet";
import ModelSheet from "./ModelSheet";

const VehicleSheets = ({
  sheet,
  bottomSheetRef,
  handleChange,
  closeSheet,
  payload,
}) => {
  function handleBottomSheet() {
    switch (sheet) {
      case "Year":
        return (
          <YearSheet handleChange={handleChange} closeSheet={closeSheet} />
        );

      case "Make":
        return (
          <MakeSheet handleChange={handleChange} closeSheet={closeSheet} />
        );

      case "Model":
        return (
          <ModelSheet
            handleChange={handleChange}
            closeSheet={closeSheet}
            payload={payload}
          />
        );

      case "Type":
        return (
          <TypeSheet handleChange={handleChange} closeSheet={closeSheet} />
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

export default VehicleSheets;
