import { View, Text, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { theme } from "../../../config/Theme";
import { config } from "../../../config/Config";
import Form1 from "./Form1";
import { CreateHousehold } from "../../../store/actions/HouseActions";
import StatusHandler from "../../../../utils/StatusHandler";
import { useAppDispatch, useAppSelector } from "../../../store/Store";
import { CreateMemberType } from "../../../store/types/household/type";

const Household = ({ navigation }) => {
  const state = useAppSelector((state) => state.house);
  const [payload, setPayload] = useState([]);
  const dispatch = useAppDispatch();

  const [status, setStatus] = useState({
    loading: false,
  });

  function handleAdd(id: number) {
    let newPayload = [...payload, id];
    setPayload(newPayload);
  }
  function handleMinus(id: number) {
    let index = payload.lastIndexOf(id);
    let x = [...payload];
    x.splice(index, 1);
    setPayload(x);
  }

  function Submit() {
    setStatus({
      ...status,
      loading: true,
    });
    let data: CreateMemberType = payload.map((item, i) => {
      let obj = {
        type: `${item} - ${i + 1}`,
        age: 0,
        //income: "",
        race: "",
        gender: "",
        image: "",
      };
      return obj;
    });
    dispatch(CreateHousehold(data));
  }

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: config.wp("2%"),
        paddingVertical: config.hp("1%"),
      }}
    >
      <Text
        style={{
          color: theme.colors.primary,
          fontSize: 24,
          fontWeight: "bold",
          textAlign: "left",
          width: "100%",
          marginBottom: config.hp("2%"),
        }}
      >
        Household
      </Text>

      <Form1
        payload={payload}
        handleAdd={handleAdd}
        handleMinus={handleMinus}
        Submit={Submit}
      ></Form1>
      <StatusHandler
        status={status}
        setStatus={setStatus}
        navigation={navigation}
        state={state}
        hideSuccess={false}
        deleteItem={null}
      />
    </View>
  );
};

export default Household;
