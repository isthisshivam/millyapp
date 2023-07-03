import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import AccountOptionBar from "./accountTabs/AccountOptionBar";
import AccountHistorySection from "./accountTabs/AccountHistory/AccountHistorySection";
// import AccountDepositSection from "./AccountDeposit/AccountDepositSection";
// import AccountTransferSection from "./AccountTransfer/AccountTransferSection";
// import AccountChart from "./AccountChart";

import { config } from "../../config/Config";
import { theme } from "../../config/Theme";
import { useAppDispatch, useAppSelector } from "../../store/Store";
import { GetAccountHistory } from "../../store/actionReducers/accounts";
import { currencyFormat } from "../../../utils/utils";
import { AccountType } from "../../../types/account/accountTypes";

const AccountScreen = ({ route: { params }, navigation }) => {
  const state = useAppSelector((state) => state.accounts);
  const [showAccountInfo, setShowAccountInfo] = useState(false);
  const [page, setPage] = useState<number>(0);
  const scrollViewRef = useRef();
  const dispatch = useAppDispatch();

  const { accountId, pageScreen } = params;

  const SelectedAccount: AccountType[] = state.accounts?.filter(
    (account) => account.accountId == accountId
  );
  const balance = SelectedAccount[0]?.balance;
  const accountNumber = SelectedAccount[0]?.accountNumber;
  const nickname = SelectedAccount[0]?.nickname;
  const accountName = SelectedAccount[0]?.accountName;

  const handlePageAction = (value: number) => {
    setPage(value);
  };

  const handlePageReturn = (page: number) => {
    switch (page) {
      case 0:
        return <AccountHistorySection navigation={navigation} />;
      // case 2:
      //   return (
      //     <AccountDepositSection colors={colors} navigation={navigation} />
      //   );
      // case 3:
      //   return (
      //     <AccountTransferSection colors={colors} navigation={navigation} />
      //   );
    }
  };

  //scroll ref

  useEffect(() => {
    dispatch(GetAccountHistory({ accountId: accountId }));
  }, [accountId]);
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.accountInfoContainer}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Text style={styles.accountInfo}>Account:</Text>
          <Text style={styles.accountInfo}>
            {nickname ? nickname : accountName}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            //marginBottom: config.hp("1%"),
            borderBottomColor: theme.colors.faded,
            borderBottomWidth: 1,
            paddingBottom: 10,
          }}
        >
          <Text style={styles.accountInfo}>Available Balance:</Text>
          <Text style={styles.accountInfo}> {currencyFormat(balance)}</Text>
        </View>
        {showAccountInfo && (
          <>
            <View style={styles.extraAccountInfoContainer}>
              <View style={styles.infoContainer}>
                <Text style={styles.infoMain}>Account Number</Text>
                <Text style={styles.infoSecondary}>{accountNumber}</Text>
              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.infoMain}>Balance</Text>
                <Text style={styles.infoSecondary}>
                  {currencyFormat(balance)}
                </Text>
              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.infoMain}>Dividend Rate</Text>
                <Text style={styles.infoSecondary}>%0.05</Text>
              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.infoMain}>Year To Date Dividends Paid</Text>
                <Text style={styles.infoSecondary}>$0.00</Text>
              </View>
            </View>
          </>
        )}
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setShowAccountInfo(!showAccountInfo);
        }}
      >
        <Text style={styles.buttonText}>
          {showAccountInfo ? "Hide Account Info" : "Show Account Info"}
        </Text>
      </TouchableOpacity>
      <AccountOptionBar
        handlePageAction={handlePageAction}
        page={page}
        navigation={navigation}
      />

      {handlePageReturn(page)}
    </View>
  );
};

export default AccountScreen;
const styles = StyleSheet.create({
  accountInfoContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    //height: config.hp("10%"),
    width: "100%",
    paddingHorizontal: config.wp("4%"),
    paddingVertical: config.hp("2%"),
  },
  accountInfo: {
    color: theme.colors.primary,
    fontSize: config.hp("2.5%"),
    textTransform: "capitalize",
    fontWeight: "500",
  },
  accountBalance: {
    fontSize: config.hp("2.25%"),
    textTransform: "capitalize",
  },
  balance: {
    fontWeight: "bold",
  },
  extraAccountInfoContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    width: "100%",
    //paddingHorizontal: config.wp("2.5%"),
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: config.hp("1%"),
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    width: "100%",
    // height: config.deviceHeight * 0.2,
  },
  infoMain: {
    color: theme.colors.primary,
    fontSize: config.hp("1.9%"),
    fontWeight: "bold",
  },
  infoSecondary: {
    color: "black",
    fontWeight: "bold",
    fontSize: config.hp("1.9%"),
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: theme.colors.primary,
    height: config.hp("5%"),
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: config.hp("2.5%"),
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  buttonOptions: {
    width: "33%",
    backgroundColor: "white",
    borderRadius: 1,
    display: "flex",
    justifyContent: "center",
  },
});
