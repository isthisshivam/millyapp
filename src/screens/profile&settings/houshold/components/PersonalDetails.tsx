import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import AnimatedLottieView from "lottie-react-native";
// import {
//   DeleteHousehold,
//   UpdateHousehold,
// } from "../../../../store/actions/HouseActions";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";
import BottomSheets from "../../../../components/bottomSheets/BottomSheets";
import EffectiveDate from "../../../../components/EffectiveDate";
import StatusHandler from "../../../../../utils/StatusHandler";
import { useAppDispatch, useAppSelector } from "../../../../store/Store";
import {
  DeletePayload,
  MemberType,
  UpdateMemberType,
} from "../../../../store/types/household/type";
import {
  DeleteMember,
  reset,
  UpdateMember,
} from "../../../../store/actionReducers/household";

const PersonalDetails = ({ navigation, route }) => {
  const state = useAppSelector((state) => state.house);
  const item: MemberType = route.params.item;
  const [sheet, setSheet] = useState<string>();
  const bottomSheetRef = useRef(null);
  const dispatch = useAppDispatch();
  //console.log(payload);

  const [payload, setPayload] = useState({
    ...item,
  });

  const [status, setStatus] = useState({
    loading: false,
    message: undefined,
  });

  const closeSheet = useCallback(() => {
    setSheet(undefined);
    bottomSheetRef.current?.close();
  }, []);

  const expand = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  function handleChange(name, value) {
    setPayload({
      ...payload,
      [name]: value,
    });
    closeSheet();
  }

  function toggleSheet(name: string) {
    setSheet(name);
    expand();
  }

  const updateMember = () => {
    setStatus({
      ...status,
      loading: true,
    });

    let data: UpdateMemberType = [{ ...payload }];
    dispatch(UpdateMember(data));
    return;
  };

  function deleteMember() {
    setStatus({
      ...status,
      loading: true,
    });
    let data: DeletePayload = { id: [item.id] };
    dispatch(DeleteMember(data));
  }

  useEffect(() => {
    if (state.status == true) {
      dispatch(reset());
    }
    if (state.error || state.status == "Error") {
      dispatch(reset());
    }
  }, [state]);

  return (
    <>
      <View style={styles.container}>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: config.hp("5%"),
          }}
        >
          <Text
            style={{
              fontSize: config.wp("4.5%"),
              fontWeight: "500",
              color: theme.colors.primary,
            }}
          >
            Update Household Member
          </Text>
          <Ionicons
            onPress={deleteMember}
            name="ios-trash"
            size={32}
            color="black"
          />
        </View>

        {state.loading ? (
          <View
            style={{
              alignItems: "center",
              justifyContent: "flex-start",
              height: "100%",
              paddingTop: 25,
            }}
          >
            <AnimatedLottieView
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
            <View
              style={{
                alignItems: "center",
                marginBottom: config.hp("7%"),
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  textAlign: "center",
                  //color: "gray",
                  marginBottom: config.hp("1%"),
                }}
              >
                Add a profile picture to personalize your experience
              </Text>
              <TouchableOpacity
                onPress={() => toggleSheet("Image")}
                style={{
                  position: "relative",
                  width: "50%",
                  height: config.hp("15%"),
                }}
              >
                {item.image || payload.image ? (
                  <>
                    <Image
                      source={{
                        uri: `data:image/png;base64,${
                          item?.image || payload.image
                        } `,
                      }}
                      style={{
                        width: 100,
                        height: 100,
                        borderRadius: 50,
                        borderWidth: 1,
                        borderColor: theme.colors.faded,
                      }}
                    />
                    <Ionicons
                      name="camera"
                      size={34}
                      color={theme.colors.primary}
                      style={{ position: "absolute", right: -10, top: 5 }}
                    />
                  </>
                ) : (
                  <>
                    <Ionicons
                      name="person-circle"
                      size={config.wp("20%")}
                      color="gray"
                    />
                    <Ionicons
                      name="camera"
                      size={30}
                      color={theme.colors.primary}
                      style={styles.camera}
                    />
                  </>
                )}
              </TouchableOpacity>
            </View>

            <View style={{ width: "85%", alignItems: "center" }}>
              <View style={styles.dropDownLabel}>
                <Text style={styles.label}>Member name: </Text>
                <TextInput
                  onChangeText={(text) => handleChange("type", text)}
                  placeholder={item.type != "" ? item.type : "Nickname"}
                  placeholderTextColor="black"
                  style={{
                    width: "50%",
                    backgroundColor: "white",
                    borderRadius: 7,
                    borderWidth: 1,
                    borderColor: theme.colors.faded,
                    paddingHorizontal: config.wp("2%"),
                    height: config.hp("5%"),
                  }}
                />
              </View>
              <TouchableOpacity
                style={styles.dropDownLabel}
                onPress={() => {
                  toggleSheet("Race");
                }}
              >
                <Text style={styles.label}>Race</Text>

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  {item.race == "" && payload.race == "" ? (
                    <Text style={styles.selectText}>Select Ethnicity</Text>
                  ) : payload.race ? (
                    <Text style={styles.label}>{payload.race}</Text>
                  ) : (
                    <Text style={styles.label}>{item.race}</Text>
                  )}

                  <AntDesign name="caretdown" />
                </View>
              </TouchableOpacity>
              {/* <TouchableOpacity
                style={styles.dropDownLabel}
                onPress={() => {
                  toggleSheet("Income");
                }}
              >
                <Text style={styles.label}>Income</Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  {!payload.income ? (
                    <Text style={styles.selectText}>Select Income</Text>
                  ) : (
                    <Text style={styles.selectedText}>{payload.income}</Text>
                  )}

                  <AntDesign name="caretdown" style={styles.icon} />
                </View>
              </TouchableOpacity>

              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <EffectiveDate
                  payload={payload}
                  handleChange={handleChange}
                  label="Birthday"
                ></EffectiveDate>
              </View> */}
            </View>
          </>
        )}

        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "flex-end",
            width: "100%",
          }}
        >
          <TouchableOpacity
            onPress={updateMember}
            style={{
              backgroundColor: theme.colors.primary,
              width: "75%",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 12,
              paddingVertical: config.hp("1%"),
              marginBottom: 10,
            }}
          >
            <Text style={{ color: "white", fontSize: config.wp("4%") }}>
              Update Member
            </Text>
          </TouchableOpacity>
        </View>
        <StatusHandler
          state={state}
          setStatus={setStatus}
          status={status}
          navigation={navigation}
          hideSuccess={false}
          deleteItem={deleteMember}
        ></StatusHandler>
      </View>
      <BottomSheets
        handleChange={handleChange}
        sheet={sheet}
        bottomSheetRef={bottomSheetRef}
        closeSheet={closeSheet}
        attachments={[]}
      ></BottomSheets>
    </>
  );
};
const styles = StyleSheet.create({
  camera: {
    position: "absolute",
    left: 55,
    top: 5,
  },
  container: {
    paddingHorizontal: config.wp("2%"),
    alignItems: "center",
    flex: 1,
    paddingVertical: config.hp("2%"),
  },
  dropDownLabel: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: config.hp("3%"),
    width: "100%",
    alignItems: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.colors.primary,
  },

  label: {
    fontSize: config.wp("4.5%"),
    color: theme.colors.primary,
    fontWeight: "500",
  },
  selectText: {
    fontSize: config.wp("4.5%"),
    color: theme.colors.fadedDark,
    fontWeight: "500",
    marginRight: 8,
  },
  selectedText: {
    fontSize: config.wp("4.5%"),
    color: theme.colors.primary,
    fontWeight: "500",
    marginRight: 8,
  },
});

export default PersonalDetails;
