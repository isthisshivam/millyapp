import React from "react";
import ActivityContainer from "./ActivityContainer";
//import ChartContainer from "./ChartContainer";
//import StatementsContainer from "./StatementsContainer";

const AccountHistorySection = ({ navigation }) => {
  return (
    <>
      <ActivityContainer navigation={navigation} />
      {/* <StatementsContainer navigation={navigation} statements={statements} /> */}
      {/* <ChartContainer navigation={navigation} /> */}
    </>
  );
};

export default AccountHistorySection;
