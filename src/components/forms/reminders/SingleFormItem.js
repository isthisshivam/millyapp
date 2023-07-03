import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./style";
import FeatherIcon from "react-native-vector-icons/Feather";

const SingleFormItem = ({
  alertName,
  leftTitle,
  rightName,
  rightPlaceholder,
  toggleModal,
  setModalType,
}) => {
  return (
    <TouchableOpacity
      style={styles.formItem}
      onPress={() => {
        toggleModal(), setModalType(alertName);
      }}
    >
      <Text style={styles.formItemTitleOne}>{leftTitle}</Text>

      <View style={styles.formItemRight}>
        <Text style={styles.formItemTitleTwo}>
          {rightName ? rightName : rightPlaceholder}
        </Text>
        <FeatherIcon style={styles.arrowIcon} name="chevron-right" />
      </View>
    </TouchableOpacity>
  );
};

export default SingleFormItem;
