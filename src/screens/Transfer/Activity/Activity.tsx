import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { MaterialIcons } from "@expo/vector-icons";
import { TransferHistoryItem } from "../../../../types/transfer/types";
import { useAppSelector } from "../../../store/Store";
import { AccountType } from "../../../../types/account/accountTypes";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";
import { currencyFormat } from "../../../../utils/utils";

type Props = {
  item: TransferHistoryItem;
};

const Activity: React.FC<Props> = ({ item }) => {
  const accounts = useAppSelector((state) => state.accounts.accounts);
  const [expanded, setExpanded] = useState(false);
  const [height] = useState(new Animated.Value(0));
  let fromArray = accounts.filter(
    (obj: AccountType) => obj.accountId == item.fromAccountId
  );
  let toArray = accounts.filter(
    (obj: AccountType) => obj.accountId == item.toAccountId
  );

  let fromAccount: AccountType = fromArray[0];
  let toAccount: AccountType = toArray[0];

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    Animated.timing(height, {
      toValue: expanded ? 200 : 60,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }, [expanded, height]);

  // console.log('rerendered');

  return (
    <Animated.View
      style={{
        height,
        //paddingVertical: config.hp("2%"),
        width: "100%",
        borderBottomWidth: config.hp(".035%"),
        borderTopWidth: config.hp(".035%"),
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        paddingHorizontal: config.wp("4%"),
      }}
    >
      <TouchableOpacity
        onPress={() => toggleExpanded()}
        style={{
          flex: 1,
          justifyContent: expanded ? "flex-start" : "center",
          flexDirection: "column",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: expanded ? 15 : 0,
            width: "100%",
            borderBottomColor: theme.colors.faded,
            borderBottomWidth: expanded ? 1 : 0,
            paddingBottom: 5,
          }}
        >
          <View
            style={{
              width: "35%",
              flexDirection: "column",
              justifyContent: "flex-start",
              height: "100%",
            }}
          >
            <Text style={{ fontSize: 16 }}>Transferred </Text>
            <Text
              style={{
                ...styles.activityAmount,
              }}
            >
              {currencyFormat(item.amount)}
            </Text>
          </View>
          <View
            style={{
              width: "50%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "25%",
                // height: "100%",
              }}
            >
              <Text style={{ fontSize: 16 }}>To</Text>
              {/* <Icon name="chevron-forward" style={styles.Icon} /> */}
            </View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "500",
                flex: 1,
                textAlign: "right",
              }}
            >
              {toAccount?.nickname
                ? toAccount?.nickname
                : toAccount?.accountName
                ? toAccount?.accountName
                : toAccount?.accountId}
            </Text>
          </View>
        </View>

        {expanded ? (
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <View
              style={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
                width: "100%",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "500",
                  marginBottom: 5,
                  color: theme.colors.primary,
                }}
              >
                Transfer Details
              </Text>
              <Text style={{ fontSize: 16, width: "100%", marginBottom: 3 }}>
                From account:{"   "}
                {fromAccount?.nickname
                  ? fromAccount?.nickname
                  : fromAccount?.accountName
                  ? fromAccount?.accountName
                  : fromAccount?.accountId}
              </Text>

              <Text style={{ fontSize: 16 }}>Posted Date: {item.postDate}</Text>
            </View>
          </View>
        ) : undefined}
      </TouchableOpacity>
    </Animated.View>
  );
};

export default Activity;
const styles = StyleSheet.create({
  activity: {
    flexDirection: "column",
    alignItems: "center",

    paddingHorizontal: config.wp("2%"),
  },
  activityLeftSection: {
    width: "85%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: config.wp("4%"),
  },

  Icon: {
    fontSize: config.hp("2.5%"),
    color: "#3C3C434D",
    fontWeight: "bold",
  },
  accountContainer: {
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
  },
  accountName: {
    color: "#3b3b3d",
    fontWeight: "bold",
    fontSize: config.hp("2.1%"),
    textTransform: "capitalize",
  },
  accountNumber: {
    color: "#797979",
  },
  activityRightSection: {
    width: "30%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  activityAmount: {
    fontSize: config.hp("2.25%"),
    color: theme.colors.primary,
    fontWeight: "600",
    width: "100%",
  },
});
