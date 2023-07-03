import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useEffect, useRef, useCallback } from "react";
import LottieView from "lottie-react-native";
import { Avatar } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import ContactInfoSection from "./contactInfo/ContactInfoSection";
import BottomSheets from "../../../components/bottomSheets/BottomSheets";
import StatusHandler from "../../../../utils/StatusHandler";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";
import { UpdatePic } from "../../../store/actions/ProfileAction";
import { useAppDispatch, useAppSelector } from "../../../store/Store";

const AccountSettings = ({ navigation }) => {
  const state = useAppSelector((state) => state.profile);
  const [sheet, setSheet] = useState<string>();
  const bottomSheetRef = useRef(null);
  const dispatch = useAppDispatch();
  const [payload, setPayload] = useState({
    image: undefined,
  });
  const [status, setStatus] = useState({
    loading: false,
    error: false,
  });

  function toggleSheet() {
    setSheet("Image");
    expandSheet();
  }

  const closeSheet = useCallback(() => {
    setSheet(undefined);
    bottomSheetRef.current?.close();
  }, []);

  const expandSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  function handleChange(name: string, value: string) {
    setPayload({
      ...payload,
      image: value,
    });
    closeSheet();
  }

  useEffect(() => {
    if (payload.image) {
      setStatus({
        ...status,
        loading: true,
      });

      dispatch(UpdatePic(payload));
    }
  }, [payload]);

  return (
    <>
      <ScrollView
        style={{
          flex: 1,
          paddingHorizontal: config.wp("2%"),
          paddingVertical: config.hp("2%"),
        }}
      >
        <Text style={styles.title}>Profile Picture</Text>
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
                marginBottom: config.hp("4%"),
              }}
              source={require("../../../components/ui/loading-spinner.json")}
            />
            <Text>Updating Profile pic....</Text>
            <Text>This may take a while</Text>
          </View>
        ) : (
          <View style={styles.imageContainer}>
            <TouchableOpacity
              activeOpacity={0.65}
              onPress={() => toggleSheet()}
            >
              {state?.profilePic ? (
                <Avatar.Image
                  source={{
                    uri: `data:image/png;base64,${state?.profilePic}`,
                  }}
                  style={styles.avatar}
                  size={config.hp("13%")}
                />
              ) : (
                <AntDesign
                  name="user"
                  size={50}
                  color="black"
                  style={{ marginBottom: 5 }}
                />
              )}
              <Text>Change Picture</Text>
            </TouchableOpacity>
          </View>
        )}

        <ContactInfoSection navigation={navigation}></ContactInfoSection>
      </ScrollView>
      {/* <StatusHandler
        state={state}
        status={status}
        setStatus={setStatus}
        navigation={undefined}
        hideSuccess={false}
        deleteItem={null}
      /> */}
      <BottomSheets
        bottomSheetRef={bottomSheetRef}
        sheet={sheet}
        handleChange={handleChange}
        closeSheet={closeSheet}
        attachments={[]}
      />
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: config.hp("2.30%"),
    color: theme.colors.primary,
    fontWeight: "bold",
    marginBottom: 20,
  },
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: config.hp("2%"),
  },
  avatar: {
    marginBottom: config.hp("2%"),
    elevation: config.hp("1%"),
  },
});

export default AccountSettings;
