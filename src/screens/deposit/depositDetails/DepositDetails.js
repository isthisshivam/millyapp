import React, { useState } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { styles } from "./style";
import { useSelector } from "react-redux";

import Button from "../../../components/Button";
import { theme } from "../../../config/Theme";
import { config } from "../../../config/Config";

const DepositDetails = ({ route }) => {
  const { confirmation } = route.params;
  const deposits = useSelector((state) => state.deposits);
  const item = deposits.filter(
    (deposit) => deposit.confirmation === confirmation
  );
  const { amount, status, date, depositAccount, checkImage1, checkImage2 } =
    item[0];

  const [showChecks, setShowChecks] = useState(false);

  const toggleChecks = () => {
    setShowChecks(!showChecks);
  };

  return (
    <ScrollView>
      <View style={styles.topContainer}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            paddingBottom: config.hp("4%"),
            color: theme.colors.primary,
          }}
        >
          Deposit Details
        </Text>
        <View style={{ width: config.wp("80%"), alignItems: "center" }}>
          <View
            style={{
              flexDirection: "row",
              width: config.wp("80%"),
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.detailTitleMain}>Deposit Amount:</Text>
            <Text style={styles.detailTitleSecondary}>${amount}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              width: config.wp("80%"),
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.detailTitleMain}>Confirmation #</Text>
            <Text style={styles.detailTitleSecondary}>{confirmation}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              width: config.wp("80%"),
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.detailTitleMain}>Status</Text>
            <Text style={styles.detailTitleSecondary}>{status}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              width: config.wp("80%"),
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.detailTitleMain}>Date Submitted:</Text>
            <Text style={styles.detailTitleSecondary}>{date}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              width: config.wp("80%"),
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.detailTitleMain}>Deposit To:</Text>
            <Text style={styles.detailTitleSecondary}>
              {depositAccount.account}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <Text style={styles.paragraphTitle}>What to do with Your Check?</Text>
        <Text style={styles.paragraph}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod
          tempor incididunt ut labore.Lorem ipsum dolor sit amet, consectetur
          adipiscing elit sed do eiusmod tempor incididunt ut labore.
        </Text>
        <Text style={styles.paragraph}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod
          tempor incididunt ut labore.
        </Text>
      </View>

      <View style={styles.checkContainer}>
        <Button
          text={showChecks ? "Hide Checks" : "View Checks"}
          fontSize={20}
          color="white"
          background={theme.colors.primary}
          radius={12}
          onPress={toggleChecks}
          height={50}
          width={150}
        ></Button>

        {showChecks ? (
          <View style={styles.checks}>
            <View style={styles.checkImage1}>
              <Text>Front</Text>
              <Image
                source={{ uri: checkImage1 }}
                style={styles.checkImage}
              ></Image>
            </View>
            <View style={styles.checkImage2}>
              <Text>Back</Text>
              <Image
                source={{ uri: checkImage2 }}
                style={styles.checkImage}
              ></Image>
            </View>
          </View>
        ) : undefined}
      </View>
    </ScrollView>
  );
};

export default DepositDetails;
