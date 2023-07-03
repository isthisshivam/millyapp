import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";

import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";

import RewardsTab from "./RewardsTab";
import RedeemTab from "./RedeemTab";
import StatsTab from "./StatsTab";
import TabContainer from "./TabContainer";
import InfoModal from "./modals/InfoModal";
import PointContainer from "./ui/PointContainer";
import StatContainer from "./ui/StatContainer";

const RewardsScreen = () => {
  const [tab, setTab] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const rewards = useSelector((state) => state.rewards.achievements);

  function toggleInfo() {
    setShowInfo(!showInfo);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.containerTop}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            width: "100%",
            paddingHorizontal: config.wp("4%"),
          }}
        >
          <TouchableOpacity onPress={toggleInfo}>
            <AntDesign
              name="questioncircleo"
              size={24}
              color={theme.colors.primary}
            />
          </TouchableOpacity>
        </View>
        {tab == 2 ? (
          <StatContainer toggleInfo={toggleInfo} />
        ) : (
          <PointContainer toggleInfo={toggleInfo}></PointContainer>
        )}
      </View>

      <TabContainer tab={tab} setTab={setTab}></TabContainer>
      {(() => {
        switch (tab) {
          case 0:
            return <RewardsTab rewards={rewards}></RewardsTab>;

          case 1:
            return <RedeemTab></RedeemTab>;
          case 2:
            return <StatsTab></StatsTab>;
          default:
            break;
        }
      })()}
      <InfoModal showInfo={showInfo} toggleInfo={toggleInfo}></InfoModal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "gray",
    alignItems: "center",
    paddingBottom: config.hp("4%"),
  },
  containerTop: {
    backgroundColor: "white",
    height: config.hp("35%"),
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: config.hp("2%"),
  },
});

export default RewardsScreen;
