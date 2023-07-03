import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons, Feather } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import { KeyboardAvoidingView } from "react-native";
import {
  DeleteMessage,
  GetThread,
  ReplyMessage,
} from "../../../store/actions/MessageActions";
import StatusHandler from "../../../../utils/StatusHandler";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";
import ChatBubbles from "./ChatBubbles";
import Input from "./Input";
import { hideFab, showFab } from "../../../store/actionReducers/appState";

const MessageThread = ({ route, navigation }) => {
  const state = useSelector((state) => state.messages);
  const threadNumber = route.params.sequenceNumber;
  const [thread, setThread] = useState([]);
  const dispatch = useDispatch();

  const [payload, setPayload] = useState({
    subject: undefined,
    messagecontent: "",
    attachments: [],
    category: undefined,
    date: new Date(),
  });

  const [status, setStatus] = useState({
    error: undefined,
    showSuccess: false,
    showError: false,
    loading: false,
    state: false,
    message: undefined,
    showDelete: false,
    disabled: true,
  });

  const handleChange = (name, value) => {
    if (name == "image") {
      setPayload({
        ...payload,
        attachments: [
          ...payload.attachments,
          { category: "", data: value, fileName: "", contentType: "image/png" },
        ],
      });

      return;
    }
    setPayload({
      ...payload,
      [name]: value,
    });
  };

  function format() {
    // // //Get all dates and remove duplicates
    // let shortDates = thread?.map((item) => {
    //   let date = item?.logDate.replace(/-/g, "/");
    //   let temp = formatBirthday(new Date(date), "MM/dd/yyyy");
    //   return { ...item, logDate: temp };
    // });

    let uniqueDates = [...new Set(thread?.map((item) => item.logDate))];
    return uniqueDates;
  }
  const formattedData = useMemo(format, [thread]);

  function deleteThread() {
    setStatus({
      ...state,
      loading: true,
      deleting: true,
    });
    dispatch(DeleteMessage({ id: threadNumber }));
  }

  function submit() {
    let lastChat = thread?.slice(-1);

    setStatus({
      ...status,
      loading: true,
      deleting: false,
    });
    let data = {
      replyNumber: lastChat[0]?.sequenceNumber,
      sequenceNumber: threadNumber,
      subject: thread[0]?.subject,
      messagecontent: payload.messagecontent,
    };
    let withAttachment = {
      attachments: payload.attachments,
      subject: thread[0]?.subject,
      messagecontent: payload.messagecontent,
      replyNumber: lastChat[0]?.sequenceNumber,
      sequenceNumber: threadNumber,
    };

    dispatch(ReplyMessage(payload.attachments ? withAttachment : data));
  }

  useEffect(() => {
    if (state.thread?.length > 0) {
      setStatus({
        ...status,
        loading: false,
      });
      setThread(
        state.thread?.sort((a, b) => b.sequenceNumber - a.sequenceNumber)
      );
    }
  }, [state.thread]);

  useEffect(() => {
    if (state.status == true) {
      setStatus({
        ...status,
        loading: false,
        deleting: false,
      });
      setPayload({
        subject: "",
        messagecontent: "",
        attachments: [],
        category: "",
        date: new Date(),
        replyNumber: undefined,
      });
    }
    if (state.error) {
      setStatus({
        ...status,
        loading: false,
        error: state.error,
        message: state.error,
      });
    }
  }, [state]);

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      setStatus({
        ...status,
        loading: true,
      });
      dispatch(GetThread(threadNumber));
      dispatch(hideFab());
      return () => {
        dispatch(showFab());
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );

  return (
    <View style={styles.container}>
      {status.loading ? (
        <View
          style={{
            height: "100%",
            width: "100%",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LottieView
            loop
            autoPlay
            style={{
              width: 160,
              height: 160,
            }}
            source={require("../../../components/ui/loading-spinner.json")}
          />
        </View>
      ) : (
        <View style={{ height: "100%" }}>
          <View
            style={{
              width: "100%",
              backgroundColor: "lightgray",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            <Text
              style={{
                color: theme.colors.primary,
                fontSize: 18,
                fontWeight: "500",
                paddingVertical: 10,
              }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              Subject: {thread[0]?.subject}
            </Text>
            <View style={{ position: "absolute", right: config.wp("4%") }}>
              <Ionicons
                onPress={() => deleteThread()}
                name="md-trash"
                size={24}
                color="black"
              />
            </View>
          </View>
          <ChatBubbles
            navigation={navigation}
            formattedData={formattedData}
            thread={thread}
            submit={submit}
            payload={payload}
            handleChange={handleChange}
          ></ChatBubbles>
          {/* <Input
            submit={submit}
            payload={payload}
            handleChange={handleChange}
          ></Input> */}
        </View>
      )}
      <StatusHandler
        state={state}
        status={status}
        setStatus={setStatus}
        navigation={navigation}
      ></StatusHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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

export default MessageThread;
