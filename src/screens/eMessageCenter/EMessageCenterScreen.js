import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  FlatList,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import LottieView from "lottie-react-native";
import format from "date-fns/format";
import * as Device from "expo-device";

import Message from "./message/Message";
import { theme } from "../../config/Theme";
import { styles } from "./style";
import { GetMessages } from "../../store/actions/MessageActions";
import { config } from "../../config/Config";
import Fab from "./components/Fab";

const EMessageCenterScreen = ({ navigation }) => {
  const month = new Array();
  month[0] = "January";
  month[1] = "February";
  month[2] = "March";
  month[3] = "April";
  month[4] = "May";
  month[5] = "June";
  month[6] = "July";
  month[7] = "August";
  month[8] = "September";
  month[9] = "October";
  month[10] = "November";
  month[11] = "December";

  const state = useSelector((state) => state.messages);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [heads, setHeads] = useState([]);
  const dispatch = useDispatch();

  const updateSearch = (search) => {
    setSearch(search);
  };

  //////////////////////////////////////////////// sort and format dates///////////////////////////////////////
  // Format date
  const formatted = heads?.map((item) => {
    let date = item.logDate?.replace(/-/g, "/");
    let temp = format(new Date(date), "MM/dd/yyyy");
    let time = new Date(`${temp} ${item.logTime}`).toLocaleTimeString();

    return {
      ...item,
      shortDate: temp,
      time: time,
    };
  });
  const formattedMsg = formatted?.sort((a, b) => b.time - a.time);

  // //Get all dates and remove duplicates
  const shortDates = heads?.map((item) => {
    let date = item?.logDate.replace(/-/g, "/");
    const temp = format(new Date(date), "MM/dd/yyyy");
    return temp;
  });

  const uniqueDates = [...new Set(shortDates?.map((date) => date))];

  let sortedData = uniqueDates?.sort(
    (a, b) => a.sequenceNumber - b.sequenceNumber
  );

  //////////////////////////////////////////////////////////////////////////////////////////////////////

  let filteredData = formattedMsg.filter(
    (item) =>
      item.subject.toLowerCase().includes(search.toLowerCase()) ||
      item.message.toLowerCase().includes(search.toLowerCase())
  );

  ///////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (state?.messages?.length > 0 && loading) {
      setLoading(false);
      setHeads([...state.messages]);
    }

    if (state.status == true) {
      dispatch(GetMessages());
    }
  }, [state]);

  const MINUTE_MS = 50000;

  useEffect(() => {
    const interval = setInterval(() => {
      //console.log("Logs every minute");
      dispatch(GetMessages());
    }, MINUTE_MS);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, []);

  useEffect(() => {
    dispatch(GetMessages());
  }, []);

  //console.log(`state`, msgState);
  /////////////////////////........................Refresh Control................................/////////////////////////
  // const [refreshing, setRefreshing] = React.useState(false);
  // //Refresh spinner timeout
  // const wait = (timeout) => {
  //   return new Promise((resolve) => setTimeout(resolve, timeout));
  // };
  // //On Refresh run this Request
  // const onRefresh = React.useCallback(() => {
  //   setRefreshing(true);
  //   wait(2000).then(() => setRefreshing(false));
  // }, []);

  // //disable navigation until refresh completes
  // React.useEffect(() => {
  //   const unsubscribe = navigation.addListener("beforeRemove", (e) => {
  //     if (refreshing == false) {
  //       // If we don't have unsaved changes, then we don't need to do anything
  //       return;
  //     }
  //     // Prevent default behavior of leaving the screen
  //     e.preventDefault();
  //   });
  //   // Return the function to unsubscribe from the event so it gets removed on unmount
  //   return unsubscribe;
  // }, [navigation, refreshing]);
  const renderItem = ({ item }) => (
    <Message item={item} navigation={navigation} />
  );

  return (
    <View
      style={{ flex: 1 }}
      // refreshControl={
      //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      // }
    >
      <View style={{ flex: 1 }}>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            paddingHorizontal: config.wp("2%"),
            paddingVertical: config.hp("2%"),
          }}
        >
          <TextInput
            placeholder="Search"
            onChangeText={(text) => updateSearch(text)}
            style={{
              backgroundColor: "white",
              width: config.wp("75%"),
              height: config.hp("4%"),
              borderWidth: 1,
              borderColor: theme.colors.faded,
              borderRadius: 7,
              paddingHorizontal: config.wp("1%"),
            }}
            //value={search}
            //platform={Device.osName == "ios" ? "ios" : "android"}
          />
        </View>
        <SafeAreaView style={styles.scrollContainer}>
          {loading ? (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",

                height: "100%",
                paddingTop: 25,
                flexDirection: "row",
              }}
            >
              <LottieView
                loop
                autoPlay
                style={{
                  width: 160,
                  height: 160,
                }}
                source={require("../../components/ui/loading-spinner.json")}
              />
            </View>
          ) : (
            <FlatList
              renderItem={renderItem}
              keyExtractor={(item) => item.sequenceNumber}
              data={filteredData}
            ></FlatList>
          )}

          {/* <Fab navigation={navigation}></Fab> */}
        </SafeAreaView>
      </View>
    </View>
  );
};

export default EMessageCenterScreen;
