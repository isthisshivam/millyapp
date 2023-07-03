import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";

import LottieView from "lottie-react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { UpdateContactInfo } from "../../../../store/actions/ProfileAction";
import StatusHandler from "../../../../../utils/StatusHandler";
import {
  formatPhoneNumber,
  formatDateYYMMDD,
  phoneNumToString,
  formatBirthday,
} from "../../../../../utils/utils";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";
import { useAppDispatch, useAppSelector } from "../../../../store/Store";
import { ContactInfoType } from "../../../../../types/profile/types";
import globalStyles from "../../../../globalStyles/styles";
import {
  reset,
  SetContactInfo,
} from "../../../../store/actionReducers/profile";
import BottomSheets from "../../../../components/bottomSheets/BottomSheets";

const EditContactInfo = ({ navigation }) => {
  const state = useAppSelector((state) => state.profile); //Get data from state, set payload to data
  const [sheet, setSheet] = useState<string>();
  const dispatch = useAppDispatch();
  const bottomSheetRef = useRef(null);

  const [payLoad, setpayLoad] = useState<ContactInfoType>({
    address1: state.info.address1,
    address2: state.info.address2,
    city: state.info.city,
    state: state.info.state,
    zip: state.info.zip,
    birthDay: state.info.birthDay,
    email: state.info.email,
    cellPhone: state.info.cellPhone,
    workPhone: state.info.workPhone,
    homePhone: state.info.homePhone,
  });

  const [status, setStatus] = useState({
    loading: false,
    error: undefined,
    message: undefined,
  });

  function toggleSheet() {
    setSheet("State");
    expandSheet();
  }

  const closeSheet = useCallback(() => {
    setSheet(undefined);
    bottomSheetRef.current?.close();
  }, []);

  const expandSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  //Input change handler
  const handleChange = (name: string, value: any) => {
    setpayLoad({ ...payLoad, [name]: value });
  };

  const Save = () => {
    setStatus({
      ...status,
      loading: true,
    });
    //Request Data
    let requestData: ContactInfoType = {
      address1: payLoad.address1,
      address2: payLoad.address2,
      city: payLoad.city,
      state: payLoad.state,
      zip: payLoad.zip,
      birthDay: formatDateYYMMDD(payLoad.birthDay),
      email: payLoad.email,
      cellPhone: phoneNumToString(payLoad.cellPhone),
      workPhone: phoneNumToString(payLoad.workPhone),
      homePhone: phoneNumToString(payLoad.homePhone),
      //fullName: payLoad.,
    };

    dispatch(SetContactInfo(requestData));
  };

  useEffect(() => {
    if (state.status == true) {
      setStatus({
        ...status,
        loading: false,
      });
      dispatch(reset());
    }
    if (state.status == "Error") {
      setStatus({
        ...status,
        loading: false,
      });
      dispatch(reset());
    }
  }, [state]);

  return (
    <>
      <KeyboardAwareScrollView
        style={{ height: "100%" }}
        contentContainerStyle={styles.container}
      >
        <Text style={styles.title}>Contact Information</Text>

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
              source={require("../../../../components/ui/loading-spinner.json")}
            />
          </View>
        ) : (
          <>
            <View style={{ flex: 1 }}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Address</Text>
                <TextInput
                  value={payLoad.address1}
                  keyboardType={"default"}
                  style={styles.input}
                  placeholder="Address Line 1"
                  onChangeText={(value) => handleChange("address1", value)}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Address Cont</Text>
                <TextInput
                  value={payLoad.address2}
                  keyboardType={"default"}
                  style={styles.input}
                  placeholder="Address Line 2"
                  onChangeText={(value) => handleChange("address2", value)}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>City</Text>
                <TextInput
                  value={payLoad.city}
                  keyboardType={"default"}
                  style={styles.input}
                  placeholder="City"
                  onChangeText={(value) => handleChange("city", value)}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>State</Text>
                <TouchableOpacity
                  style={styles.input}
                  onPress={() => toggleSheet()}
                >
                  <Text>
                    {payLoad?.state !== "" ? payLoad.state : "Select State"}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Zip Code:</Text>
                <TextInput
                  value={payLoad.zip}
                  style={styles.input}
                  placeholder="133456"
                  keyboardType={"phone-pad"}
                  onChangeText={(value) => handleChange("zip", value)}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Home Phone:</Text>
                <TextInput
                  placeholder={"Phone"}
                  value={formatPhoneNumber(payLoad.homePhone)}
                  style={styles.input}
                  keyboardType={"phone-pad"}
                  onChangeText={(value) => handleChange("phone", value)}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Mobile Phone:</Text>
                <TextInput
                  placeholder={"Phone"}
                  value={formatPhoneNumber(payLoad.cellPhone)}
                  style={styles.input}
                  keyboardType={"phone-pad"}
                  onChangeText={(value) => handleChange("phone", value)}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Work Phone:</Text>
                <TextInput
                  placeholder={"Phone"}
                  value={formatPhoneNumber(payLoad.workPhone)}
                  style={styles.input}
                  keyboardType={"phone-pad"}
                  onChangeText={(value) => handleChange("phone", value)}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email:</Text>
                <TextInput
                  placeholder={"Email"}
                  value={payLoad.email}
                  style={styles.input}
                  autoCapitalize={"none"}
                  keyboardType={"email-address"}
                  onChangeText={(value) => handleChange("email", value)}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Birthday:</Text>
                <TextInput
                  placeholder={"Birthday"}
                  value={formatBirthday(payLoad.birthDay)}
                  style={styles.input}
                  keyboardType={"default"}
                  onChangeText={(value) => handleChange("birthday", value)}
                />
              </View>
            </View>
            <View style={globalStyles.submitButtonContainer}>
              <TouchableOpacity
                style={globalStyles.submitButton}
                onPress={() => Save()}
              >
                <Text style={globalStyles.submitButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        <StatusHandler
          state={state}
          status={status}
          setStatus={setStatus}
          navigation={navigation}
          hideSuccess={false}
          deleteItem={null}
        ></StatusHandler>
      </KeyboardAwareScrollView>
      <BottomSheets
        sheet={sheet}
        bottomSheetRef={bottomSheetRef}
        handleChange={handleChange}
        attachments={[]}
        closeSheet={closeSheet}
      />
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    paddingVertical: config.hp("2%"),
    paddingHorizontal: config.wp("2%"),
  },

  title: {
    textAlign: "center",
    fontSize: config.hp("2.5%"),
    fontWeight: "500",
    color: theme.colors.primary,
    marginBottom: config.hp("4%"),
  },

  buttonText: {
    color: theme.colors.white,
    fontSize: config.hp("2.5%"),
    textAlign: "center",
    fontWeight: "500",
  },
  contentContainer: {
    backgroundColor: "white",
    paddingHorizontal: config.wp("5%"),
    paddingVertical: config.hp("2.5%"),
  },

  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: config.hp("1"),
    height: config.hp("4%"),
  },
  label: {
    fontSize: config.hp("2.2%"),
  },
  input: {
    paddingLeft: config.wp("1%"),
    //paddingVertical: config.hp("1%"),
    fontSize: config.hp("2.25%"),
    borderBottomWidth: config.hp(".15%"),
    borderBottomColor: theme.colors.primary,
    width: "60%",
  },
});

export default EditContactInfo;
