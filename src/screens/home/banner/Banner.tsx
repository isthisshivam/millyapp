import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  useWindowDimensions,
} from "react-native";
import { Linking } from "react-native";
import RenderHtml from "react-native-render-html";
import { useSelector } from "react-redux";

import TextTicker from "react-native-text-ticker";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../../config/Theme";
import { config } from "../../../config/Config";
import Button from "../../../components/Button";
import headerBanner from "../../../../assets/HomeBanner.png";

import { styles } from "./style";
import { useAppSelector } from "../../../store/Store";

const Banner = ({ navigation }) => {
  const banner = useAppSelector(
    (state) => state.client.bannerImages.headerBanner
  );
  //console.log(banner);
  const profile = useAppSelector((state) => state.profile);
  const clientInfo = useAppSelector((state) => state.client);
  const messages = useAppSelector((state) => state.messages.messages);
  const [showModal, setShowModal] = useState(false);
  const { width } = useWindowDimensions();
  //const source = { html: `${clientInfo.clientInfo}` };

  var months = new Array(12);
  months[0] = "January";
  months[1] = "February";
  months[2] = "March";
  months[3] = "April";
  months[4] = "May";
  months[5] = "June";
  months[6] = "July";
  months[7] = "August";
  months[8] = "September";
  months[9] = "October";
  months[10] = "November";
  months[11] = "December";

  let current_date = new Date();

  let month_value = current_date.getMonth();
  let day_value = current_date.getDate();
  let year_value = current_date.getFullYear();

  const time = current_date.toLocaleTimeString("EN-us", {
    hour: "2-digit",
    minute: "2-digit",
  });

  //const { seconds, minutes, hours, ampm } = useTime({ format: "12-hour" });

  //const formattedMin = minutes.length == 1 ? `0${minutes}` : minutes;

  function minTwoDigits(minutes) {
    return (minutes < 10 ? "0" : "") + minutes;
  }

  function toggleModal() {
    setShowModal(!showModal);
  }

  function closeModal() {
    setShowModal(false);
  }

  const tagsStyles = {
    h3: {
      color: theme.colors.primary,
      fontSize: 20,
      padding: 0,
      margin: 0,
      paddingTop: config.hp("2%"),
    },
    h4: {
      padding: 0,
      margin: 0,
      paddingTop: config.hp("2%"),
    },
    li: {
      padding: 0,
      margin: 0,
      fontSize: 18,
    },
  };
  return (
    <>
      <View style={styles.topContainer}>
        <View style={{ flexDirection: "column" }}>
          <Text style={{ fontSize: 12, color: "#9e9e9e", fontWeight: "bold" }}>
            Closest Branch
          </Text>
          <Text>310 E Walnut Street</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              width: 30,
              flexDirection: "row",
              justifyContent: "center",
            }}
            onPress={() => {
              Linking.openURL(`tel:407-288-6765`);
            }}
          >
            <MaterialIcons
              name="phone-iphone"
              size={24}
              color={theme.colors.primary}
              //style={styles.icon}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: 30,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={toggleModal}
          >
            <FontAwesome
              name="bank"
              size={24}
              color={theme.colors.primary}
              //style={styles.icon}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: 30,
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Ionicons name="location" size={24} color={theme.colors.primary} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("e-Message Center")}
            style={{
              width: 30,
              flexDirection: "row",
              justifyContent: "center",
              position: "relative",
              alignItems: "center",
            }}
          >
            <Ionicons name="chatbox" size={26} color={theme.colors.primary} />
            <Text
              style={{
                position: "absolute",
                //top: 0,
                bottom: 12,
                left: 25,
                color: "black",
                fontWeight: "bold",
                fontSize: 20,
              }}
            >
              {messages.length}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.container}>
        <Image style={styles.image} source={headerBanner} />
      </View>

      <View style={styles.textContainer}>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={styles.textMain}>Good Morning</Text>
            <Text
              style={{
                textTransform: "capitalize",
                color: theme.colors.primaryLight,
                fontSize: config.hp("1.80%"),
              }}
            >
              {profile?.info?.fullName}
            </Text>
          </View>

          <View style={{ alignItems: "flex-end" }}>
            <Text style={styles.textSub}>
              {`${months[month_value]} , ${day_value} ${year_value}`}
            </Text>
            <Text>{time}</Text>
            {/* <Text style={styles.textSub}>{`${
              hours == 0 ? 12 : hours
            }:${minTwoDigits(minutes)} ${ampm}`}</Text> */}
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Missions")}>
          <TextTicker
            style={{ fontSize: 20 }}
            duration={9000}
            loop
            bounce
            repeatSpacer={50}
            marqueeDelay={1000}
            //scrollSpeed={}
          >
            Missions: Save up for a car, Build Credit, Buy a house.
          </TextTicker>
        </TouchableOpacity>
      </View>

      {/* <Modal animationType="slide" transparent={true} visible={showModal}>
        <View
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#00000099",
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Entypo
                name="info-with-circle"
                size={48}
                color={theme.colors.primary}
              />
              <RenderHtml
                contentWidth={width}
                source={source}
                tagsStyles={tagsStyles}
              />

              <View
                style={{
                  height: "30%",
                  flexDirection: "row",
                  alignItems: "flex-end",
                }}
              >
                <Button
                  text="Continue"
                  color="white"
                  background={theme.colors.primary}
                  height={50}
                  width={200}
                  radius={12}
                  fontSize={20}
                  onPress={closeModal}
                ></Button>
              </View>
            </View>
          </View>
        </View>
      </Modal> */}
    </>
  );
};

export default Banner;
