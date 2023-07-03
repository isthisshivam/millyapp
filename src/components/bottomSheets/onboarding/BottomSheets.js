import React, { useState } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import ImageSheet from "./ImageSheet";
import IdCaptureSheet from "./IdCaptureSheet";

const BottomSheets = ({
  bottomSheetRef,
  sheet,
  closeSheet,
  handleChange,
  type,
}) => {
  const [showCamera, setShowCamera] = useState(false);
  function handleBottomSheet() {
    switch (sheet) {
      case "Image":
        return (
          <ImageSheet
            handleChange={handleChange}
            closeSheet={closeSheet}
            setShowCamera={setShowCamera}
            type={type}
          ></ImageSheet>
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
      {showCamera ? (
        <IdCaptureSheet
          type={type}
          handleChange={handleChange}
          setShowCamera={setShowCamera}
        />
      ) : (
        <>{handleBottomSheet()}</>
      )}
    </BottomSheet>
  );
};

export default BottomSheets;
