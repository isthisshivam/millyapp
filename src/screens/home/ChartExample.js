import React from "react";
import { View, Text, Dimensions } from "react-native";
// import {
//   LineChart,
//   BarChart,
//   PieChart,
//   ProgressChart,
//   ContributionGraph,
//   StackedBarChart,
// } from "react-native-chart-kit";
import { config } from "../../config/Config";
import { theme } from "../../config/Theme";

const ChartExample = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Ap", "May", "Jun"],
    datasets: [
      {
        data: [40, 45, 28, 80, 99, 43],
      },
    ],
  };
  const chartConfig = {
    backgroundColor: "#ff1",
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    color: (opacity = 1) => `${theme.colors.primaryLight}`,
    style: {
      borderRadius: 16,
    },
    strokeWidth: config.hp("1.2%"), // optional, default 3
    barPercentage: 0.5,
    barRadius: 10,
    useShadowColorFromDataset: false, // optional
  };

  return (
    <View>
      {/* <LineChart
        data={{
          labels: ["January", "February", "March", "April", "May", "June"],
          datasets: [
            {
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
              ],
            },
          ],
        }}
        width={Dimensions.get("window").width * 0.9} // from react-native
        height={200}
        yAxisLabel="$"
        yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      /> */}
      {/* <BarChart
        // style={graphStyle}
        data={data}
        width={config.wp("85%")}
        height={220}
        yAxisLabel="$"
        chartConfig={chartConfig}
        verticalLabelRotation={30}
        showValuesOnTopOfBars={true}
      /> */}
    </View>
  );
};

export default ChartExample;
