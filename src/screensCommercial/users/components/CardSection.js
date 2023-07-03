import React, { useCallback, useRef, useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import Carousel, { Pagination } from "react-native-snap-carousel";
import LottieView from "lottie-react-native";
import HomeCommercialCard from "../../components/HomeAccountCard";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";
import { OrderTiles, mergeCachedSettings } from "../../../../utils/utils";

const CardSection = ({ navigation, setStep }) => {
  const state = useSelector((state) => state.accounts);
  const array = state.accounts;
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(state.accounts);
  const ref = useRef(null);

  const renderItem = useCallback(
    ({ item, index }) => (
      <HomeCommercialCard
        key={index}
        item={item}
        setStep={setStep}
      ></HomeCommercialCard>
    ),
    []
  );

  async function loadData() {
    let data = await AsyncStorage.getItem("tile_settings");
    let cache = await AsyncStorage.getItem("accounts");
    let order = await AsyncStorage.getItem("order");
    const cachedAccounts = JSON.parse(cache);
    const cachedOrder = JSON.parse(order);

    if (state.accounts?.length > 0) {
      setData(OrderTiles(state.accounts, state.order));
      setLoading(false);
    } else if (cachedAccounts?.length > 0 && state.accounts?.length == 0) {
      if (
        cachedAccounts[0]?.image == null ||
        cachedAccounts[0]?.image == undefined
      ) {
        const cachedSettings = JSON.parse(data);
        //console.log("cachedSettings", cachedSettings);
        let accounts = await mergeCachedSettings(
          cachedAccounts,
          cachedSettings
        );

        setData(OrderTiles(accounts, cachedOrder));
        setLoading(false);
        return;
      }
    }
  }

  useEffect(() => {
    loadData();
  }, [state]);

  return (
    <View style={styles.container}>
      {loading ? (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: "90%",
          }}
        >
          <LottieView
            loop={true}
            autoPlay
            style={{
              width: 160,
              height: 160,
            }}
            source={require("../../../components/ui/squareLoading.json")}
          />
        </View>
      ) : (
        <View style={{ flex: 1, alignItems: "center" }}>
          <Carousel
            layout="default"
            ref={ref}
            data={data}
            activeSlideAlignment="center"
            sliderWidth={config.wp("100%")}
            itemWidth={config.wp("100%")}
            renderItem={renderItem}
            onSnapToItem={(index) => setActiveIndex(index)}
            navigation={navigation}
          />
          <Pagination
            dotsLength={data?.length}
            activeDotIndex={activeIndex}
            containerStyle={{ top: config.hp("-1%") }}
            dotStyle={{
              width: 8,
              height: 8,
              borderRadius: 5,
              marginHorizontal: 1,
              backgroundColor: theme.colors.primary,
            }}
            inactiveDotStyle={
              {
                // Define styles for inactive dots here
              }
            }
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
          ></Pagination>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#f4f4f4",

    paddingTop: 10,
    height: config.hp("40%"),
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: config.wp("4%"),
    //paddingBottom: 5,
  },
  title: {
    color: theme.colors.primary,
    fontWeight: "bold",
    fontSize: config.hp("2.15%"),
  },
});
export default CardSection;
