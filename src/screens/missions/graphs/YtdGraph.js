import { View, Text } from "react-native";
import React from "react";
//import { BarChart } from "react-native-gifted-charts";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";

const YtdGraph = () => {
  const barData = [
    {
      value: 665,
      label: "Jan",
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: "gray", width: 100 },
      frontColor: theme.colors.good,
    },
    { value: 920, frontColor: theme.colors.bad },
    {
      value: 752,
      label: "Feb",
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: "gray", width: 100 },
      frontColor: theme.colors.good,
    },
    { value: 832, frontColor: theme.colors.bad },
    {
      value: 656,
      label: "Mar",
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: "gray", width: 100 },
      frontColor: theme.colors.good,
    },
    { value: 650, frontColor: theme.colors.bad },
    {
      value: 752,
      label: "Apr",
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: "gray", width: 100 },
      frontColor: theme.colors.good,
    },
    { value: 523, frontColor: theme.colors.bad },
    {
      value: 752,
      label: "May",
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: "gray", width: 100 },
      frontColor: theme.colors.good,
    },
    { value: 650, frontColor: theme.colors.bad },
    {
      value: 656,
      label: "June",
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: "gray", width: 100 },
      frontColor: theme.colors.good,
    },
    { value: 523, frontColor: theme.colors.bad },
  ];

  return (
    <View
      style={{
        paddingBottom: 40,
        borderRadius: 10,
      }}
    >
      {/* <Text style={{ fontSize: 22, color: theme.colors.primaryLight }}>
        YTD Insights
      </Text>
      <BarChart
        data={barData}
        barWidth={20}
        spacing={20}
        hideRules
        xAxisThickness={0}
        yAxisThickness={0}
        yAxisTextStyle={{ color: "gray" }}
        noOfSections={5}
        maxValue={1000}
        initialSpacing={10}
        xAxisLabelTextStyle={{ fontSize: 10, width: 40, marginRight: 10 }}
      /> */}
    </View>
  );
};

export default YtdGraph;
