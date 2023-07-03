import React from "react";
import { View, Text, Dimensions } from "react-native";
// import { BarChart } from "react-native-chart-kit";
const Chart = () => {
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
    color: (opacity = 1) => `rgba(14, 164, 75,${opacity})`,
    style: {
      borderRadius: 16,
    },
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    barRadius: 10,
    useShadowColorFromDataset: false, // optional
  };

  return (
    // <View>
    //   <BarChart
    //     // style={graphStyle}
    //     data={data}
    //     width={Dimensions.get("window").width * 0.9}
    //     height={220}
    //     yAxisLabel="$"
    //     chartConfig={chartConfig}
    //     verticalLabelRotation={30}
    //     showValuesOnTopOfBars={true}
    //   />
    // </View>
    <></>
  );
};

export default Chart;
