import React from "react";
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useDispatch } from "react-redux";
import { styles } from "./style";
import { Ionicons } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";
import { formatTime } from "../../../../utils/utils";
import { GetThread } from "../../../store/actions/MessageActions";

const Message = ({ navigation, item, deleteMessage }) => {
  let {
    subject,
    message,
    logDate,
    sequenceNumber,
    attachments,
    shortDate,
    logTime,
    replyNumber,
    time,
  } = item;
  const dispatch = useDispatch();
  let dateTime = new Date(`${logDate} ${logTime}`);

  function viewThread() {
    dispatch(GetThread(sequenceNumber));
    navigation.navigate("msgThread", {
      sequenceNumber: sequenceNumber ? sequenceNumber : undefined,
    });
  }

  return (
    <TouchableOpacity style={{ width: "100%" }} onPress={() => viewThread()}>
      <View style={styles.message}>
        {item.fromClient && item.flag == "New" ? (
          <Ionicons
            name="arrow-redo-sharp"
            size={24}
            color={theme.colors.primaryLight}
          />
        ) : item.fromClient && item.flag != "New" ? (
          <Ionicons name="arrow-redo-sharp" size={24} color="gray" />
        ) : !item.fromClient && item.flag == "New" ? (
          <Ionicons
            name="arrow-undo"
            size={24}
            color={theme.colors.primaryLight}
          />
        ) : (
          <Ionicons name="arrow-undo" size={24} color="gray" />
        )}
        <View style={{ flex: 1 }}>
          <Text
            style={{
              color: theme.colors.primary,
              paddingLeft: config.wp("2%"),
              textTransform: "capitalize",
              fontWeight:
                item.flag == "New" && item.customerFlag == "New"
                  ? "bold"
                  : "500",
              fontSize:
                item.customerFlag == "New"
                  ? config.hp("2.35%")
                  : config.hp("2.15%"),
            }}
            numberOfLines={1}
          >
            {subject}
          </Text>
        </View>

        {attachments.length > 0 ? (
          <View style={{ flexDirection: "row" }}>
            <Foundation name="paperclip" size={24} color="black" />
            <Text>{attachments.length}</Text>
          </View>
        ) : undefined}

        <View style={{ alignItems: "flex-end" }}>
          <Text style={styles.messageTime}>{logDate}</Text>
          <Text style={{}}>{formatTime(dateTime)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Message;
