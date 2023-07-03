import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import TopNav from "../topNav/TopNav";
import { config } from "../../../config/Config";
import { styles } from "./style";
import { useAppSelector } from "../../../store/Store";

const HistoryScreen = ({ navigation, route }) => {
  const history = useAppSelector((state) => state.billPays.history).sort(
    (a, b) => new Date(b.paydate) - new Date(a.paydate)
  );
  //console.log(history);
  const accounts = useAppSelector((state) => state.billPays.accounts);
  const [showFilter, setShowFilter] = useState(false);
  let allHistory = [];
  const [searchString, setSearchString] = useState("");
  const [searchResults, Results] = useState([...allHistory]);
  const [dataToShow, setDataToShow] = useState("");

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.historyItem}
      // onPress={() => {
      //   navigation.navigate("PaymentDetails", {
      //     id: item?.id,
      //   });
      //   setDataToShow(item);
      // }}
    >
      <Text style={styles.date}>
        {new Date(item?.paydate).toLocaleDateString("en-US")}
      </Text>

      <Text style={styles.company}>
        {item.payee ? item?.payee : item?.merchantName}
      </Text>
      <Text style={styles.amount}>${item?.amount}</Text>
    </TouchableOpacity>
  );

  //Get the account name and corresponding location index of data

  //Search function
  useEffect(() => {
    const results = history?.filter((item) =>
      item.payee?.includes(searchString)
    );

    Results(results);
    // Results(results);
  }, [searchString]);

  return (
    <>
      <View style={{ backgroundColor: "white", flex: 1 }}>
        <TopNav navigation={navigation} route={route} />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>BillPayHistory</Text>
          <TouchableOpacity
            style={styles.rightTitle}
            activeOpacity={0.5}
            onPress={() => setShowFilter(!showFilter)}
          >
            <Text style={styles.rightTitle}>
              {showFilter ? "Hide Search" : "Search"}
            </Text>
          </TouchableOpacity>
        </View>
        {showFilter && (
          <View style={styles.searchSection}>
            <View style={styles.searchContainer}>
              <Icon name="ios-search" color="#0EA44B" size={config.hp("4%")} />
              <TextInput
                keyboardType="default"
                style={styles.input}
                mode="outlined"
                label="Search Statements History"
                placeholder="Search"
                onChangeText={(text) => {
                  setSearchString(text);
                }}
              />
            </View>
          </View>
        )}
        <FlatList
          data={searchResults}
          renderItem={renderItem}
          //keyExtractor={(item) => item.id}
        />
      </View>
    </>
  );
};

export default HistoryScreen;
