import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import { CheckMarkIcon } from "../../../..//components/Icons";
import { styles } from "./style";

const Disclosure = ({ index, content, content2, user, handleChange }) => {
  const [showDisclosure, setshowDisclosure] = useState(false);

  let current_date = new Date();

  let month_value = current_date.getMonth() + 1;
  let day_value = current_date.getDate();
  let year_value = current_date.getFullYear();

  return (
    <>
      <TouchableOpacity
        style={styles.disclosure}
        onPress={() => {
          setshowDisclosure(!showDisclosure);
        }}
        activeOpacity={0.85}
      >
        <Text style={styles.disclosureTextLeft}>Disclosure {index + 1}</Text>
        <View style={styles.disclosureContainerRight}>
          <Text
            style={
              user.disclosures?.[index + 1]?.signed === true
                ? [
                    styles.disclosureConfirmedTextColor,
                    styles.disclosureTextRight,
                  ]
                : styles.disclosureTextRight
            }
          >
            {user.disclosures?.[index + 1]?.signed === true
              ? `Confirmed `
              : "Read and Confirm"}
          </Text>
          {!showDisclosure ? (
            <FeatherIcon style={styles.arrowIcon} name="chevron-right" />
          ) : (
            <FeatherIcon style={styles.arrowIcon} name="chevron-down" />
          )}
        </View>
      </TouchableOpacity>
      {showDisclosure && (
        <View style={styles.disclosureInfoContainer}>
          <Text style={styles.disclosureText}>{content}</Text>
          {content2 && <Text style={styles.disclosureText}>{content2}</Text>}
          <View style={styles.confirmContainer}>
            <Text style={styles.confirmText}>
              Confirmation language Duis aute irure dolor in reprehenderit in
              voluptate velit esse. Confirmed date at time
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                // disabled={!formOneIsFilled}
                activeOpacity={0.85}
                style={styles.button}
                onPress={() => {
                  setshowDisclosure(!showDisclosure);

                  handleChange("disclosures", {
                    [index + 1]: {
                      signed: true,
                      date: `${month_value}/${day_value}/${year_value}`,
                    },
                  });
                }}
              >
                <Text style={styles.buttonText}>
                  {user.disclosures?.[index + 1]?.signed === true
                    ? "Close"
                    : "Confirm and Close"}
                </Text>
              </TouchableOpacity>
              {user.disclosures?.[index + 1]?.signed === true && (
                <View style={styles.confirmedContainer}>
                  <CheckMarkIcon height={7.5} width={7.5} />
                  <Text style={styles.confirmedText}>{`Confirmed on ${
                    user.disclosures?.[index + 1].date
                  }`}</Text>
                </View>
              )}
            </View>
          </View>
        </View>
      )}
    </>
  );
};

export default Disclosure;
