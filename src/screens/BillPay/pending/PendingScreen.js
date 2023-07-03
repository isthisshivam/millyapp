import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import TopNav from "../topNav/TopNav";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";

const PendingScreen = (props) => {
  const state = useSelector((state) => state.billPays);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (state?.pending?.length > 0) {
      setData(state?.pending);
    }
    //console.log(state);
  }, [state]);

  const Item = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate("Edit Pending Billpay", { item: item })
      }
      style={styles.pendingCard}
    >
      <Text style={styles.pendingMerchant} numberOfLines={1}>
        {item?.payee}
      </Text>
      <View style={styles.textContainer}>
        <Text style={styles.leftText}>Requested Payment Date:</Text>
        <Text style={styles.rightText}>{item?.paydate}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.leftText}>From:</Text>
        <Text style={styles.rightText} numberOfLines={1}>
          {item?.account}
        </Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.leftText}>In the amount of :</Text>
        <Text style={styles.rightText}>{item?.amount}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => <Item item={item} />;

  return (
    <>
      <TopNav {...props} />
      <View style={styles.backgroundContainer}>
        {/* <View style={styles.titleContainer}>
          <Text style={styles.title}>Pending Payments</Text>
        </View> */}
        {data.legth > 0 ? (
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.invoice}
            style={{ flex: 1 }}
          />
        ) : (
          <View
            style={{
              flex: 1,
              paddingHorizontal: config.wp("2%"),
              paddingVertical: config.hp("4%"),
            }}
          >
            <Text style={{ fontSize: 18 }}>You have no pending payments</Text>
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  backgroundContainer: {
    //backgroundColor: theme.colors.white,
    flex: 1,
    paddingHorizontal: config.wp("2%"),
  },
  titleContainer: {
    paddingVertical: config.hp("1%"),
    paddingTop: config.hp("2%"),
    paddingHorizontal: config.wp("4%"),
    backgroundColor: "white",
  },
  title: {
    fontSize: config.hp("2.5%"),
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  scrollContainer: {
    paddingVertical: config.hp("1%"),
    paddingHorizontal: config.wp("4%"),
    backgroundColor: "white",
  },
  pendingCard: {
    backgroundColor: "white",
    borderRadius: config.hp(".8%"),
    paddingVertical: config.hp("1%"),
    paddingHorizontal: config.wp("2%"),
    marginVertical: config.hp(".95%"),
    elevation: config.hp(".35%"),
    borderColor: theme.colors.faded,
    borderWidth: 1,
    width: "100%",
  },
  pendingMerchant: {
    fontSize: config.hp("2.30%"),
    fontWeight: "bold",
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: config.hp(".85%"),
    width: "100%",
  },
  leftText: {
    fontSize: config.hp("2.05%"),
    color: "#5F5F60",
  },
  rightText: {
    maxWidth: "60%",
    fontSize: config.hp("2.15%"),
    color: theme.colors.primary,
    //marginLeft: config.wp("20.1%"),
    textAlign: "left",
  },
});

export default PendingScreen;
