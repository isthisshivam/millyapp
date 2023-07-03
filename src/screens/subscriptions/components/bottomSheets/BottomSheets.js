import React from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import CategorySheet from "./CategorySheet";
import TierSheet from "./TierSheet";
import ServiceSheet from "./ServiceSheet";
import FrequencySheet from "./FrequencySheet";

const BottomSheets = ({
  sheet,
  bottomSheetRef,
  selectCategory,
  categories,
  streaming,
  selectStreaming,
  handleChange,
  closeSheet,
  tiers,
}) => {
  //console.log(tiers);
  function handleBottomSheet() {
    switch (sheet) {
      case "Category":
        return (
          <CategorySheet
            categories={categories}
            selectCategory={selectCategory}
          ></CategorySheet>
        );

      case "Service":
        return (
          <ServiceSheet
            selectStreaming={selectStreaming}
            streaming={streaming}
          ></ServiceSheet>
        );

      case "Tier":
        return (
          <TierSheet
            tiers={tiers}
            handleChange={handleChange}
            closeSheet={closeSheet}
          ></TierSheet>
        );

      case "Frequency":
        return (
          <FrequencySheet
            handleChange={handleChange}
            closeSheet={closeSheet}
          ></FrequencySheet>
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
