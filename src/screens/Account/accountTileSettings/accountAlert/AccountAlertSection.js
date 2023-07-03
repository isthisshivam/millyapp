import React, { useState } from "react";
import { View, Text, Switch } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { theme } from "../../../../config/Theme";
import { styles } from "./style";

const AccountAlertSection = ({ payload, setPayload }) => {
  const [enabled, setEnabled] = useState(payload.enableAlert);

  const toggleAlert = () => {
    setPayload({
      ...payload,
      enableAlert: !payload.enableAlert,
    });
    setEnabled(!enabled);
  };

  return (
    <View style={styles.accountAlertsContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Account Alerts</Text>
        <Text style={styles.secondaryTitle}>
          Stay up to date with account alerts and be notified of account
          transactions and changes.
        </Text>
      </View>
      <View style={styles.switchContainer}>
        <Text style={enabled ? styles.titleEnabled : styles.titleDisabled}>
          {enabled ? "Account Alerts Enabled" : "Account Alerts Disabled"}
        </Text>
        <Switch
          trackColor={{
            false: theme.colors.fade2,
            true: theme.colors.primaryLight,
          }}
          thumbColor={enabled ? theme.colors.primary : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleAlert}
          value={enabled}
          style={{ transform: [{ scaleX: 1.25 }, { scaleY: 1.25 }] }}
        />
      </View>
    </View>
  );
};

export default AccountAlertSection;
