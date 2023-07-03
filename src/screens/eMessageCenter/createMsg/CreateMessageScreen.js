import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Feather, Entypo } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import { CreateMessage } from "../../../store/actions/MessageActions";
import Button from "../../../components/Button";
import StatusHandler from "../../../../utils/StatusHandler";
import Category from "./components/Category";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";
import BottomSheets from "../../../components/bottomSheets/BottomSheets";

const CreateMessageScreen = ({ navigation }) => {
  const state = useSelector((state) => state.messages);
  const [showCategory, setShowCategory] = useState(false);
  const [sheet, setSheet] = useState();
  const [step, setStep] = useState(0);
  const bottomSheetRef = useRef();
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    subject: "",
    messagecontent: "",
    attachments: [],
    category: "",
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
    showOptions: false,
  });

  const closeSheet = useCallback(() => {
    setSheet(undefined);
    bottomSheetRef.current?.close();
  }, []);

  const expandSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  function toggleSheet(name) {
    setSheet(name);
    expandSheet();
  }

  const handleChange = (name, value) => {
    if (name == "image" || name == "category") {
      closeSheet();
    }
    if (name == "image") {
      setInput({
        ...input,
        attachments: [
          ...input.attachments,
          { category: "", data: value, fileName: "", contentType: "image/png" },
        ],
      });

      return;
    }
    setInput({
      ...input,
      [name]: value,
    });
  };

  //console.log(input);

  const submit = () => {
    setStatus({
      ...status,
      loading: true,
    });

    dispatch(CreateMessage(input));
  };

  useEffect(() => {
    if (input.subject !== "" && input.message !== "") {
      setStatus({
        ...status,
        disabled: false,
      });
    }
  }, [input]);

  useEffect(() => {
    if (state.status == true) {
      setStatus({
        ...status,
        loading: false,
      });
    }

    if (state.error) {
      setStatus({
        ...status,
        loading: false,
        message: state.error,
      });
    }
  }, [state]);

  return (
    <>
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          flex: 1,
          paddingHorizontal: config.wp("4%"),
          paddingVertical: config.hp("2%"),
        }}
      >
        {status.loading ? (
          <View
            style={{
              alignItems: "center",
              justifyContent: "flex-start",
              height: "100%",
              paddingTop: 25,
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
          <>
            <View style={styles.iconContainer}>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={styles.paperIcon}
                  onPress={() => toggleSheet("eMsg Attachemnts")}
                >
                  <Feather
                    name="paperclip"
                    size={24}
                    color={theme.colors.primary}
                  />
                  <Text style={{ fontSize: 20 }}>
                    {input.attachments?.length}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <TextInput
              keyboardType="default"
              onChangeText={(value) => handleChange("subject", value)}
              placeholderTextColor={theme.colors.faded}
              placeholder={"Subject"}
              style={styles.subjectInput}
            />
            <TouchableOpacity
              onPress={() => toggleSheet("eMsg Category")}
              style={styles.subjectInput1}
            >
              <Text>
                {input.category ? input.category : " Select Category"}
              </Text>
              <Entypo name="chevron-down" size={20} color="black" />
            </TouchableOpacity>
            <TextInput
              keyboardType="default"
              onChangeText={(value) => handleChange("messagecontent", value)}
              placeholderTextColor={theme.colors.faded}
              placeholder={"Compose Message"}
              style={styles.subjectInput2}
              multiline={true}
            />
            <View
              style={{
                flexDirection: "column",
                justifyContent: "flex-end",
                alignItems: "center",
                paddingBottom: config.hp("4%"),
                flex: 1,
              }}
            >
              <Button
                text="Send"
                radius={12}
                fontSize={20}
                color="white"
                background={
                  status.disabled ? theme.colors.inActive : theme.colors.primary
                }
                onPress={submit}
                width={300}
                height={50}
                paddingBottom={config.hp("4%")}
              ></Button>
            </View>
          </>
        )}
      </KeyboardAwareScrollView>
      <StatusHandler
        state={state}
        status={status}
        setStatus={setStatus}
        navigation={navigation}
      ></StatusHandler>
      <BottomSheets
        bottomSheetRef={bottomSheetRef}
        handleChange={handleChange}
        closeSheet={closeSheet}
        sheet={sheet}
        attachments={input.attachments}
      />
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: config.hp(".75%"),
    padding: config.hp("1%"),
    elevation: config.hp(".75%"),
    marginBottom: config.hp(".5%"),
  },
  buttonContainer: {
    height: "100%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: config.wp("12%"),
    backgroundColor: "#bdbdbd",
  },
  buttonsContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: config.hp("2.5%"),
  },

  buttonText: {
    color: theme.colors.primary,
    fontSize: config.hp("2.25%"),
  },
  camera: {
    height: "100%",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: config.hp("1%"),
    left: config.wp("1%"),
    backgroundColor: theme.colors.primary,
    borderRadius: config.hp(".75%"),
    padding: config.hp("1%"),
    elevation: config.hp(".75%"),
  },

  contentContainer: {
    backgroundColor: "white",
    paddingHorizontal: config.wp("5%"),
    height: "100%",
    flexDirection: "column",
    width: "100%",
  },

  container: {
    backgroundColor: theme.colors.white,
  },

  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  optionContainer: {
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
    alignItems: "center",
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },
  optionModal: {
    width: config.wp("100%"),
    height: config.hp("35%"),
    backgroundColor: "white",
    borderRadius: config.hp("1%"),
    paddingVertical: config.hp("2%"),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  optionText: {
    fontSize: config.hp("2.5%"),
    textAlign: "center",
    paddingVertical: config.hp("1%"),
  },
  paperIcon: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-end",
  },
  scrollContainer: {
    backgroundColor: theme.colors.fadedBackground,
    width: "100%",
    flex: 1,
    marginBottom: config.hp("1%"),
    alignItems: "center",
  },
  selectItem: {
    width: "80%",
    paddingVertical: config.hp("1%"),
    borderBottomColor: theme.colors.fade3,
    borderBottomWidth: 1,
  },

  titleContainer: {
    paddingVertical: config.hp("1%"),
    paddingHorizontal: config.wp("2%"),
  },
  title: {
    textAlign: "center",
    fontSize: config.hp("2.5%"),
    fontWeight: "bold",
  },
  subjectInput: {
    paddingLeft: config.wp("2%"),
    paddingVertical: config.hp("1.5%"),
    backgroundColor: theme.colors.fadedBackground,
    color: theme.colors.black,
    borderRadius: config.hp(".5%"),
    fontSize: config.hp("1.8%"),
    marginBottom: config.hp("1%"),

    borderColor: theme.colors.faded,
    borderWidth: 1,
  },
  subjectInput1: {
    paddingLeft: config.wp("2%"),
    paddingVertical: config.hp("1.5%"),
    backgroundColor: theme.colors.fadedBackground,
    color: theme.colors.black,
    borderRadius: config.hp(".5%"),
    fontSize: config.hp("1.8%"),
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: config.wp("2%"),
    alignContent: "center",
    borderColor: theme.colors.faded,
    borderWidth: 1,
  },
  subjectInput2: {
    paddingLeft: config.wp("2%"),
    paddingVertical: config.hp("1.5%"),
    marginTop: config.hp("1.5%"),
    backgroundColor: theme.colors.fadedBackground,
    color: theme.colors.black,
    borderRadius: config.hp(".5%"),
    height: config.hp("40%"),
    textAlignVertical: "top",
    fontSize: config.hp("2.25%"),
    borderColor: theme.colors.faded,
    borderWidth: 1,
  },
  buttonContainer: {
    height: config.hp("5%"),
    backgroundColor: theme.colors.primary,
    width: "80%",
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
  helpContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: config.hp("3%"),
    paddingHorizontal: config.wp("12%"),
  },
  helpIcon: {
    fontSize: config.hp("4.5%"),
    color: theme.colors.primary,
  },
  centerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  helperText: {
    textAlign: "center",
    fontSize: config.hp("2.15%"),
  },
});

export default CreateMessageScreen;
