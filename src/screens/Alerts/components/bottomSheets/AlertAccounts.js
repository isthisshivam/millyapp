import React, { useCallback, useEffect, useMemo, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";
import { useSelector } from "react-redux";

const AlertAccounts = ({ handleChange, closeSheet, accountType, payload }) => {
  let state = useSelector((state) => state.accounts.accounts);
  const [accounts, setAccounts] = useState([]);
  let account = payload.fromAccount || payload.toAccount;

  //console.log(accountType);

  useEffect(() => {
    if (account) {
      let array = state?.filter((item) => item.accountId != account);
      setAccounts(array);
    } else {
      setAccounts(state);
    }
  }, [account]);

  const renderItem = useCallback(({ item }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            handleChange(accountType, item.accountId);
            // handleChange(accountType, {
            //   accountId: item.accountId,
            //   nickname: item.nickname,
            //   balance: item.balance,
            //   accountName: item.accountName,
            // }),
            closeSheet();
          }}
          style={{
            flexDirection: "row",
            itemsc: "center",
            justifyContent: "center",
            marginBottom: config.hp("1%"),
            borderBottomColor: theme.colors.faded,
            borderBottomWidth: 1,
            width: "80%",
            paddingVertical: config.hp("1.5%"),
          }}
        >
          <Text style={{ fontSize: 18 }}>{item.accountName}</Text>
        </TouchableOpacity>
      </View>
    );
  }, []);
  return (
    <BottomSheetFlatList
      data={accounts}
      keyExtractor={(i) => i.accountId}
      renderItem={renderItem}
      //contentContainerStyle={styles.contentContainer}
    />
  );
};

export default AlertAccounts;
