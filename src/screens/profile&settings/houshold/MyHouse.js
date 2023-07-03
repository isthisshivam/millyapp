import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";
import houseFile from "../../../../assets/house.png";
import avatar from "../../../../assets/avatar.jpeg";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const MyHouse = ({ navigation }) => {
  let state = useSelector((state) => state.house);
  const vehicles = useSelector((state) => state.vehicles);

  const [data, setData] = useState({
    household: [""],
    vehicles: [],
  });

  useEffect(() => {
    setData({
      ...data,
      household: state.house,
    });
  }, [state]);

  useEffect(() => {
    if (vehicles.vehicles?.length > 0) {
      setData({
        ...data,
        vehicles: vehicles.vehicles,
      });
    }
  }, [vehicles]);

  return (
    <ScrollView
      style={{ height: config.hp("80%") }}
      contentContainerStyle={styles.container}
    >
      <View style={{ height: "100%", paddingBottom: 150 }}>
        <View
          style={{
            width: "100%",
            height: config.hp("18%"),
            alignItems: "center",
            justifyContent: "flex-start",
            backgroundColor: "white",
            flexDirection: "column",
            // marginBottom: config.hp("2%"),
          }}
        >
          <Image
            source={houseFile}
            style={{ width: "90%", height: "100%" }}
            resizeMode="contain"
          />
        </View>
        <View style={{}}>
          <Text
            style={{
              ...styles.heading,
              paddingHorizontal: config.wp("2%"),

              backgroundColor: theme.colors.primary,
              paddingVertical: config.hp(".5%"),
            }}
          >
            Household
          </Text>
          <Text
            style={{
              fontSize: 18,
              marginBottom: config.hp("2%"),
              paddingVertical: 5,
              paddingHorizontal: config.wp("2%"),
              fontWeight: "400",
            }}
          >
            Click on a household member to view or update.
          </Text>

          <View
            style={{
              width: "100%",
              alignItems: "center",
              marginBottom: config.hp("4%"),
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
                width: "100%",
                flexWrap: "wrap",
                //marginBottom: config.hp("2%"),
              }}
            >
              {state?.house?.length > 0 ? (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-around",
                    width: "100%",
                    flexWrap: "wrap",
                  }}
                >
                  {state?.house
                    ?.sort((a, b) => a.id - b.id)
                    .map((item, i) => (
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("Personal Details", {
                            item: item,
                          })
                        }
                        key={i}
                        style={{
                          width: config.wp("30%"),
                          height: config.hp("15%"),
                          marginBottom: config.hp("1%"),
                          alignItems: "center",
                          // borderBottomColor: theme.colors.fadedDark,
                          // borderBottomWidth: 1,
                        }}
                      >
                        {item.image ? (
                          <Image
                            source={{
                              uri: `data:image/png;base64, ${item.image}`,
                            }}
                            style={{
                              width: "70%",
                              height: "65%",
                              borderRadius: 100,
                              borderWidth: 1,

                              borderColor:
                                i == 0
                                  ? theme.colors.primary
                                  : i == 1
                                  ? theme.colors.green
                                  : i == 2
                                  ? theme.colors.danger
                                  : i == 3
                                  ? theme.colors.green
                                  : theme.colors.primary,
                            }}
                            resizeMode="cover"
                          />
                        ) : (
                          <Image
                            source={avatar}
                            style={{
                              width: "70%",
                              height: "65%",
                              borderRadius: 100,
                              borderWidth: 1,

                              borderColor:
                                i == 0
                                  ? theme.colors.primary
                                  : i == 1
                                  ? theme.colors.green
                                  : i == 2
                                  ? theme.colors.danger
                                  : i == 3
                                  ? theme.colors.green
                                  : theme.colors.primary,
                            }}
                            resizeMode="cover"
                          />
                        )}
                        <Text style={{ paddingTop: 5 }}>{item.type}</Text>
                      </TouchableOpacity>
                    ))}
                </View>
              ) : (
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    paddingHorizontal: config.wp("4%"),
                    minHeight: config.hp("16%"),
                  }}
                >
                  <Text
                    style={{ fontSize: config.wp("4%"), fontWeight: "400" }}
                  >
                    Add your household to get a personalized experience,
                    including: offers, insights, and rewards.
                  </Text>
                </View>
              )}
            </View>

            <TouchableOpacity
              onPress={() => navigation.navigate("Household")}
              style={{
                backgroundColor: theme.colors.primary,
                borderRadius: 12,
                paddingVertical: config.hp("1%"),
                width: "75%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: config.hp("2%"),
              }}
            >
              <Text style={{ fontSize: config.wp("4%"), color: "white" }}>
                Add to Household
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              width: "100%",
              alignItems: "center",
              minHeight: config.hp("16%"),
            }}
          >
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: theme.colors.primary,
                paddingHorizontal: config.wp("2%"),
                marginBottom: config.hp("2%"),
                //paddingVertical: config.hp("1%"),
              }}
            >
              <Text style={styles.heading}>My Garage</Text>
              <MaterialCommunityIcons
                name="garage-variant"
                size={32}
                color="white"
              />
            </View>
            {data.vehicles?.length > 0 ? (
              data?.vehicles?.map((item, i) => (
                <View
                  key={i}
                  style={{
                    paddingHorizontal: config.wp("2%"),
                    marginBottom: config.hp("1%"),
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    height: config.hp("5%"),
                  }}
                >
                  <Text style={{ fontSize: config.wp("4.5") }}>
                    {item.year + " " + item.make + " " + item.model}
                  </Text>

                  <Text style={{ fontSize: config.wp("4%") }}>
                    ${item.paymentAmount} / Month
                  </Text>
                </View>
              ))
            ) : (
              <View style={{ flex: 1 }}>
                <Text>
                  Add your vehicles to keep track of your monthly bills and to
                  personalize your house
                </Text>
              </View>
            )}

            <TouchableOpacity
              style={{
                backgroundColor: theme.colors.primary,
                borderRadius: 12,
                paddingVertical: config.hp("1%"),
                width: "75%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: config.hp("2%"),
                marginTop: config.hp("4%"),
              }}
            >
              <Text style={{ fontSize: config.wp("4%"), color: "white" }}>
                Update Vehicles
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    //flexGrow: 1,
    //height: "20%",
  },
  heading: {
    //marginBottom: 10,
    fontSize: config.wp("5%"),
    color: "white",
    fontWeight: "500",
  },
});

export default MyHouse;
