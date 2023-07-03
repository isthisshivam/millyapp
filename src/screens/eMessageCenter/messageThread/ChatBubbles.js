import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import React, { useEffect, useState, useMemo } from "react";

import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";
import { formatTime } from "../../../../utils/utils";
import Input from "./Input";

const ChatBubbles = ({
  formattedData,
  thread,
  navigation,
  submit,
  payload,
  handleChange,
}) => {
  const Message = ({ item }) => {
    let dateTime = new Date(`${item.logDate} ${item.logTime}`);
    let text = item.messageContent
      ?.replace(/<p>/g, "")
      .replace("</p>", "")
      .replace("</p>&nbsp;</p>", "")
      .replace(/\r/g, "")
      .replace(/\n/g, "")
      .replace(/\t/g, "");

    return (
      <View
        style={{
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <Text
          style={{
            fontSize: 18,

            color: "white",
            textAlign: "left",
          }}
        >
          {text}
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: item.fromClient ? "flex-start" : "flex-end",
            paddingTop: config.hp("2%"),
          }}
        >
          <Text style={{ color: "white" }}>{formatTime(dateTime)}</Text>
        </View>
      </View>
    );
  };
  return (
    <>
      <FlatList
        data={formattedData}
        inverted={true}
        keyExtractor={(item, index) => index.toString()}
        style={{}}
        snapToEnd
        contentContainerStyle={{
          paddingHorizontal: config.wp("4%"),
          paddingTop: config.hp("6%"),
        }}
        renderItem={({ item, index }) => {
          let data = thread
            ?.filter((object) => object.logDate == item)
            .sort((a, b) => a.sequenceNumber - b.sequenceNumber);
          return (
            <View key={index}>
              <Text
                style={{
                  textAlign: "center",
                  marginBottom: config.hp("2%"),
                }}
              >
                {item}
              </Text>
              <FlatList
                data={data}
                listKey={data}
                keyExtractor={(key, index) => index.toString()}
                renderItem={({ item, index }) => {
                  if (item.fromClient) {
                    return (
                      <TouchableOpacity
                        key={index}
                        onPress={() =>
                          navigation.navigate("msgDetails", item.sequenceNumber)
                        }
                        style={{
                          backgroundColor: "#bdbdbd",
                          padding: 10,
                          paddingBottom: 10,
                          marginLeft: "5%",
                          maxWidth: "90%",
                          minWidth: "50%",
                          minHeight: 50,
                          //alignSelf: "flex-start",
                          marginBottom: config.hp("4%"),
                          //position: "relative",
                          borderRadius: 20,
                          flexDirection: "column",
                          justifyContent: "flex-start",
                        }}
                      >
                        {item.attachments[0]?.data ? (
                          <Image
                            source={{
                              uri: `data:image/png;base64, ${item.attachments[0]?.data}`,
                            }}
                          ></Image>
                        ) : undefined}
                        <Message item={item}></Message>
                        <View style={styles.leftArrow}></View>
                        <View style={styles.leftArrowOverlap}></View>
                        <View
                          style={{
                            flexDirection: "row",
                            alignSelf: item.fromClient
                              ? "flex-start"
                              : "flex-end",
                          }}
                        >
                          <Text style={{ color: "black" }}>
                            {item.flag == "Read"
                              ? "Read"
                              : item.flag == "Sent"
                              ? undefined
                              : "Delivered"}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  } else {
                    //console.log(item);
                    return (
                      <TouchableOpacity
                        key={index}
                        onPress={() =>
                          navigation.navigate("msgDetails", item.sequenceNumber)
                        }
                        style={{
                          backgroundColor: theme.colors.primaryLight,
                          padding: 10,
                          //marginLeft: "45%",
                          borderRadius: 5,
                          marginRight: "5%",
                          //maxWidth: "90%",
                          minWidth: "50%",
                          minHeight: 50,
                          alignSelf: "flex-end",
                          borderRadius: 20,
                          marginBottom: config.hp("4%"),
                          flexDirection: "column",
                          justifyContent: "flex-start",
                        }}
                      >
                        {item.attachments[0]?.data ? (
                          <Image
                            resizeMode="contain"
                            style={{
                              height: 260,
                              width: 240,
                              borderRadius: 12,
                            }}
                            source={{
                              uri: `data:image/png;base64,${item.attachments[0]?.data}`,
                            }}
                          ></Image>
                        ) : undefined}
                        <Message item={item}></Message>
                        <View style={styles.rightArrow}></View>
                        <View style={styles.rightArrowOverlap}></View>
                        <View
                          style={{
                            flexDirection: "row",

                            alignSelf: item.fromClient
                              ? "flex-start"
                              : "flex-end",
                          }}
                        >
                          <Text style={{ color: "white", fontSize: 14 }}>
                            {item.flag == "Read"
                              ? "Read"
                              : item.fromClient
                              ? undefined
                              : "Delivered"}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  }
                }}
              ></FlatList>
            </View>
          );
        }}
      ></FlatList>
      <Input
        submit={submit}
        payload={payload}
        handleChange={handleChange}
      ></Input>
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
  messageBubble: {
    borderRadius: 7,
    padding: config.wp("2%"),

    //elevation: config.hp("1%"),
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowColor: "black",
    maxWidth: "60%",
    minWidth: "30%",
    minHeight: config.hp("6%"),
  },
  rightArrow: {
    position: "absolute",
    backgroundColor: theme.colors.primaryLight,
    //backgroundColor:"red",
    width: 20,
    height: 25,
    bottom: 0,
    borderBottomLeftRadius: 25,
    right: -10,
  },

  rightArrowOverlap: {
    position: "absolute",
    backgroundColor: "#eeeeee",
    //backgroundColor:"green",
    width: 20,
    height: 35,
    bottom: -6,
    borderBottomLeftRadius: 18,
    right: -20,
  },

  /*Arrow head for recevied messages*/
  leftArrow: {
    position: "absolute",
    backgroundColor: "#bdbdbd",
    //backgroundColor:"red",
    width: 20,
    height: 25,
    bottom: 0,
    borderBottomRightRadius: 25,
    left: -10,
  },

  leftArrowOverlap: {
    position: "absolute",
    backgroundColor: "#eeeeee",
    //backgroundColor:"green",
    width: 20,
    height: 35,
    bottom: -6,
    borderBottomRightRadius: 18,
    left: -20,
  },
});

export default ChatBubbles;
