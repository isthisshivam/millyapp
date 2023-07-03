import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ScrollView,
} from "react-native";

import { useSelector, useDispatch } from "react-redux";
import { DeleteItem, GetESafe } from "../../store/actions/eSafeActions";
import { config } from "../../config/Config";
import ButtonContainer from "./buttonContainer/ButtonContainer";
import SafeItemTile from "./SafeItemTile";
import LottieView from "lottie-react-native";
import { theme } from "../../config/Theme";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import CategoryCheckBox from "./CategoryCheckBox/CategoryCheckBox";

const SafeItemsScreen = (props) => {
  const items = useSelector((state) => state.eSafe.eSafe);
  const [selected, setSelected] = useState(undefined);
  //console.log(items);

  const dispatch = useDispatch();
  //Change between top 2 tabs
  const handleScreenChange = () => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: false });
  };

  const loading = false;

  useEffect(() => {
    dispatch(GetESafe());
  }, []);

  // useEffect(() => {
  //   if (items.status == true) {
  //     dispatch(GetESafe());
  //   }
  // }, [items.status]);

  return (
    <View style={styles.container}>
      <ButtonContainer
        isSelected={false}
        {...props}
        handleScreenChange={handleScreenChange}
      />
      <ScrollView style={styles.topContainer}>
        <View style={{ paddingBottom: config.hp("12%") }}>
          <Text style={styles.text}>eSafe Items</Text>
          <CategoryCheckBox
            setSelected={setSelected}
            selected={selected}
          ></CategoryCheckBox>
          {selected == undefined
            ? items?.map((item, i) => {
                return (
                  <SafeItemTile
                    item={item}
                    key={i}
                    category={selected}
                  ></SafeItemTile>
                );
              })
            : items
                ?.filter((item) => item.category === selected)
                .map((item, i) => {
                  return (
                    <SafeItemTile
                      item={item}
                      key={i}
                      category={selected}
                    ></SafeItemTile>
                  );
                })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: config.hp("8%"),
  },
  topContainer: {
    paddingVertical: config.hp("12%"),
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  text: {
    fontSize: 24,
    paddingBottom: 20,
    fontWeight: "bold",
  },
});

export default SafeItemsScreen;
