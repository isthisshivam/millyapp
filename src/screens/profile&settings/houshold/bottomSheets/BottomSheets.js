import React from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import RaceSheet from "./RaceSheet";
import IncomeSheet from "./IncomeSheet";
import ImageSheet from "./ImageSheet";
import AgeSheet from "./AgeSheet";

const BottomSheets = ({ sheet, bottomSheetRef, handleChange, closeSheet }) => {
  function handleBottomSheet() {
    switch (sheet) {
      case "Race":
        return <RaceSheet handleChange={handleChange} />;

      case "Income":
        return (
          <IncomeSheet handleChange={handleChange} closeSheet={closeSheet} />
        );
      case "Image":
        return <ImageSheet handleChange={handleChange} />;
      case "Age":
        return <AgeSheet handleChange={handleChange} />;

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
