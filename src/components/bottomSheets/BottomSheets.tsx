import React, { useState, useCallback } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import ImageSheet from "./ImageSheet";
import FrequencySheet from "./FrequencySheet";
import IncomeSheet from "./IncomeSheet";
import RaceSheet from "./RaceSheet";
import AccountsSheet from "./AccountsSheet";
import MaritalSheet from "./MaritalSheet";
import EducationSheet from "./EducationSheet";
import GenderSheet from "./GenderSheet";
import StateSheet from "./StateSheet";
import QuestionsSheet from "./QuestionsSheet";
import DenialReasonSheet from "./commercial/DenialReasonSheet";
import CaptureSheet from "./CaptureSheet";
import MsgCategory from "./eMsg/MsgCategory";
import AttachmentSheet from "./eMsg/AttachmentSheet";
import ReasonSheet from "./ReasonSheet";
import CheckWithdrawalDesc from "./CheckWithdrawalDesc";
import FrequencyPeriod from "./transfers/FrequencyPeriod";
import NumSheet from "./transfers/NumSheet";
import ExternalAcctSheet from "./transfers/ExternalAcctSheet";
import { SavedAccount } from "../../../types/transfer/types";
import TwoFactorSheet from "./TwoFactorSheet";

type Props = {
  sheet: string;
  bottomSheetRef: any;
  handleChange: (name: string, value: any) => void;
  closeSheet: () => void;
  attachments?: [];
  toggleDelete?: (item: SavedAccount) => void;
};

const BottomSheets = ({
  sheet,
  bottomSheetRef,
  handleChange,
  closeSheet,
  attachments,
  toggleDelete,
}: Props) => {
  const [showCamera, setShowCamera] = useState(false);
  const [snapPoints, setSnapPoints] = useState(["40%"]);

  const reset = useCallback(() => {
    setSnapPoints["50%"];
  }, []);

  function handleBottomSheet() {
    switch (sheet) {
      case "Race":
        return (
          <RaceSheet
            handleChange={handleChange}
            closeSheet={closeSheet}
          ></RaceSheet>
        );

      case "Income":
        return (
          <IncomeSheet
            handleChange={handleChange}
            //closeSheet={closeSheet}
          ></IncomeSheet>
        );

      case "Image":
        return (
          <ImageSheet
            handleChange={handleChange}
            closeSheet={closeSheet}
            setShowCamera={setShowCamera}
          ></ImageSheet>
        );

      case "Frequency":
        return (
          <FrequencySheet
            handleChange={handleChange}
            closeSheet={closeSheet}
          ></FrequencySheet>
        );
      case "Frequency Period":
        return (
          <FrequencyPeriod
            handleChange={handleChange}
            closeSheet={closeSheet}
          ></FrequencyPeriod>
        );
      case "NumOfPayments":
        return (
          <NumSheet
            handleChange={handleChange}
            closeSheet={closeSheet}
          ></NumSheet>
        );
      case "Accounts":
        return (
          <AccountsSheet
            handleChange={handleChange}
            closeSheet={closeSheet}
          ></AccountsSheet>
        );
      case "Marital Status":
        return (
          <MaritalSheet
            handleChange={handleChange}
            //closeSheet={closeSheet}
          ></MaritalSheet>
        );
      case "Gender":
        return (
          <GenderSheet
            handleChange={handleChange}
            //closeSheet={closeSheet}
          ></GenderSheet>
        );
      case "Education":
        return (
          <EducationSheet
            handleChange={handleChange}
            //closeSheet={closeSheet}
          ></EducationSheet>
        );
      case "State":
        return (
          <StateSheet
            handleChange={handleChange}
            closeSheet={closeSheet}
          ></StateSheet>
        );
      case "Questions":
        return (
          <QuestionsSheet
            handleChange={handleChange}
            closeSheet={closeSheet}
          ></QuestionsSheet>
        );
      case "Denial Reason":
        return (
          <DenialReasonSheet
            handleChange={handleChange}
            ///closeSheet={closeSheet}
          ></DenialReasonSheet>
        );
      case "Stop Check Reason":
        return (
          <ReasonSheet
            handleChange={handleChange}
            ///closeSheet={closeSheet}
          ></ReasonSheet>
        );
      case "CheckWithdrawal":
        return (
          <CheckWithdrawalDesc
            handleChange={handleChange}
            closeSheet={closeSheet}
          ></CheckWithdrawalDesc>
        );
      case "Two Factor":
        return (
          <TwoFactorSheet closeSheet={closeSheet} handleChange={handleChange} />
        );

      case "eMsg Category":
        return <MsgCategory handleChange={handleChange} />;
      case "eMsg Attachemnts":
        return (
          <AttachmentSheet
            handleChange={handleChange}
            closeSheet={closeSheet}
            setShowCamera={setShowCamera}
            setSnapPoints={setSnapPoints}
            attachments={attachments}
          />
        );
      case "External Accounts":
        return (
          <ExternalAcctSheet
            handleChange={handleChange}
            closeSheet={closeSheet}
            toggleDelete={toggleDelete}
          />
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
      snapPoints={snapPoints}
      style={{ borderWidth: 1, borderColor: "gray" }}
      enablePanDownToClose
      onClose={reset}

      //onChange={handleSheetChange}
    >
      {showCamera ? (
        <CaptureSheet
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
