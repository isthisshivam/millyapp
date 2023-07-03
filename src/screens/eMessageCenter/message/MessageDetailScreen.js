import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
  ScrollView,
  Linking,
} from "react-native";
import AntIcon from "react-native-vector-icons/AntDesign";
import EntypIcon from "react-native-vector-icons/Entypo";
import { useDispatch, useSelector } from "react-redux";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import { DeleteMessage } from "../../../store/actions/MessageActions";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";
import Button from "../../../components/Button";
import DeleteModal from "../../../components/Modals/DeleteModal";

const MessageDetailScreen = ({ navigation, route }) => {
  const sequenceNumber = route.params;
  const messages = useSelector((state) => state.messages);
  const item = messages.messages?.filter(
    (item) => item.sequenceNumber === sequenceNumber
  );

  const subject = item[0]?.subject;
  const message = item[0]?.message;
  const logDate = item[0]?.logDate;
  const attachments = item[0]?.attachments;
  const shortDate = item[0]?.shortDate;
  const logTime = item[0]?.logTime;
  const replyNumber = item[0]?.replyNumber;

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const data = useSelector((state) => state.messages);
  const [showModal, setShowModal] = useState(false);
  const [viewImage, setViewImage] = useState(false);
  const dispatch = useDispatch();

  const formattedDate = new Date(logDate).toLocaleDateString("en-US"); //Format date

  //Dispatch delete action
  const deleteMessage = () => {
    let payload = {
      id: sequenceNumber,
    };
    dispatch(DeleteMessage(payload));
  };
  const toggleImage = () => {
    setViewImage(!viewImage);
  };

  function toggleDelete() {
    setShowDeleteModal(!showDeleteModal);
  }

  useEffect(() => {
    if (data.status == true) {
      navigation.navigate("e-message");
    }
  }, [data]);

  // const download = async () => {
  //   //Get download progress
  //   const callback = (downloadProgress) => {
  //     const progress =
  //       downloadProgress.totalBytesWritten /
  //       downloadProgress.totalBytesExpectedToWrite;
  //     setDownloadProgress(progress);
  //   };

  //   const ext = attachment.substring(attachment.length - 4);
  //   const downloadResumable = FileSystem.createDownloadResumable(
  //     `data:image/jpg;base64,${attachment}`,
  //     FileSystem.documentDirectory + "emsgImage" + ext,
  //     {},
  //     callback
  //   );

  //   try {
  //     const { uri } = await downloadResumable.downloadAsync();
  //     try {
  //       await MediaLibrary.saveToLibraryAsync(uri);
  //       setSuccess(true);
  //     } catch (error) {
  //       console.log("Error saving file to device library", error);
  //     }
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  return (
    <>
      <View style={styles.topBar}>
        <View>
          <Text style={styles.title} numberOfLines={2}>
            {subject}
          </Text>
          <Text style={styles.time}>{formattedDate}</Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => setShowDeleteModal(true)}>
            <Feather name="trash" size={24} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <View style={styles.msgContainer}>
          <Text style={{ paddingTop: config.hp("8%"), fontSize: 22 }}>
            {message}
          </Text>
        </View>
        <TouchableOpacity
          onPress={toggleImage}
          style={{
            alignItems: "center",
            paddingBottom: config.hp("4%"),
          }}
        >
          <Ionicons name="images" size={40} color={theme.colors.primary} />
          <Text style={{ fontSize: 22 }}>
            {viewImage ? "Hide Attachment" : "View Attachment"}
          </Text>
        </TouchableOpacity>
        {/* {attachments
          ? attachments?.map((attachment, i) => (
              <View style={styles.imageContainer} key={i}>
                {viewImage ? (
                  <View style={{ alignItems: "center" }}>
                    <Image
                      source={require("../../../../assets/Month.png")}
                      // source={{
                      //   uri: attachment.data
                      //     ? `data:image/png;base64,${attachment.data}`
                      //     : undefined,
                      // }}
                      resizeMode="contain"
                      style={{ height: 300, width: 300 }}
                    ></Image>
                    <Button
                      text="Download"
                      color="white"
                      background={theme.colors.primary}
                      height={50}
                      width={200}
                      radius={12}
                      fontSize={20}
                      marginTop={20}
                    ></Button>
                  </View>
                ) : undefined}
              </View>
            ))
          : undefined} */}
        <View style={styles.imageContainer}>
          {viewImage ? (
            <View style={{ alignItems: "center" }}>
              <Image
                source={require("../../../../assets/Month.png")}
                // source={{
                //   uri: attachment.data
                //     ? `data:image/png;base64,${attachment.data}`
                //     : undefined,
                // }}
                resizeMode="contain"
                style={{ height: 300, width: 300 }}
              ></Image>
              <Button
                text="Download"
                color="white"
                background={theme.colors.primary}
                height={50}
                width={200}
                radius={12}
                fontSize={20}
                marginTop={20}
              ></Button>
            </View>
          ) : undefined}
        </View>
        <View style={styles.helpContainer}>
          <AntIcon
            name="phone"
            style={styles.helpIcon}
            onPress={() => {
              Linking.openURL(`tel:407-288-6765`);
            }}
          />
          <EntypIcon
            name="message"
            style={styles.helpIcon}
            onPress={() => {
              Linking.openURL(
                `sms:321-202-1242?body=I have Question about this transaction. `
              );
            }}
          />
          <EntypIcon
            name="new-message"
            style={styles.helpIcon}
            onPress={() =>
              navigation.navigate("CreateMsg", {
                subject: subject ? subject : undefined,
                date: formattedDate,
                sequenceNumber: sequenceNumber,
                type: "reply",
              })
            }
          />
        </View>
      </ScrollView>
      <DeleteModal
        showDeleteModal={showDeleteModal}
        toggleDelete={toggleDelete}
        deleteItem={deleteMessage}
      ></DeleteModal>
    </>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    height: config.hp("5%"),
    backgroundColor: theme.colors.primary,
    width: config.wp("50%"),
    borderRadius: config.wp("2%"),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    elevation: config.hp("1%"),
  },
  buttonText: {
    fontSize: config.hp("2.5%"),
    color: "white",
  },
  centerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  helpContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: config.hp("1.2%"),
    paddingHorizontal: config.wp("12%"),
  },
  helpIcon: {
    fontSize: config.hp("4.5%"),
    color: theme.colors.primary,
  },

  helperText: {
    textAlign: "center",
    fontSize: config.hp("2.15%"),
  },
  imageContainer: {
    alignItems: "center",
    paddingVertical: config.hp("4%"),
  },
  msg: {
    lineHeight: 23,
    fontWeight: "bold",
  },
  msgContainer: {
    paddingHorizontal: config.wp("4%"),
    paddingVertical: config.hp("2%"),
    height: config.hp("40%"),
  },
  time: {
    color: theme.colors.inActive,
    fontWeight: "bold",
    paddingTop: 5,
  },
  title: {
    color: theme.colors.primary,
    fontSize: 18,
    fontWeight: "bold",
    width: config.wp("80%"),
  },
  topBar: {
    paddingVertical: config.hp("2%"),
    paddingHorizontal: config.wp("3%"),
    borderBottomColor: theme.colors.inActive,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
export default MessageDetailScreen;
