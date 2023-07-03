import { View, Text } from "react-native";
import React from "react";
//import { BarChart } from "react-native-gifted-charts";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";

const MonthGraph = () => {
  const barData = [
    {
      value: 400,
      label: "June 1st",
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: "gray", width: 100 },
      frontColor: theme.colors.good,
    },
    { value: 200, frontColor: theme.colors.bad },
    {
      value: 500,
      label: "June 2nd",
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: "gray", width: 100 },
      frontColor: theme.colors.good,
    },
    { value: 400, frontColor: theme.colors.bad },
    {
      value: 423,
      label: "June 3rd",
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: "gray", width: 100 },
      frontColor: theme.colors.good,
    },
    { value: 250, frontColor: theme.colors.bad },
  ];

  return (
    <View
      style={{
        paddingBottom: 40,
        borderRadius: 10,
      }}
    >
      {/* <Text style={{ fontSize: 22, color: theme.colors.primaryLight }}>
        June Insights
      </Text>
      <BarChart
        data={barData}
        barWidth={20}
        spacing={50}
        hideRules
        xAxisThickness={0}
        yAxisThickness={0}
        yAxisTextStyle={{ color: "gray" }}
        noOfSections={5}
        maxValue={500}
        initialSpacing={10}
        xAxisTextStyle={{ fontSize: 10, width: 50 }}
      /> */}
    </View>
  );
};

export default MonthGraph;
