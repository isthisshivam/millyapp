import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { config } from "../../config/Config";
import { theme } from "../../config/Theme";

const DepositDisclosures = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Mobile Deposit Information </Text>
      <Text style={styles.text}>
        See Mobile Remote Deposit Capture Services terms and conditions in the
        Agreement and Disclosure Statement for Electronic Banking Services for
        details. By continuing and performing a check image transmission, you
        confirm your agreement to those terms and conditions.
      </Text>
      <Text style={styles.label}>Deposit checks to your deposit account</Text>
      <Text style={styles.text}>
        Checks must be payable to you, must be drawn on a U.S. financial
        institution and must otherwise meet eligibility requirements. We have no
        obligation to accept any check or image that you transmit in our sole
        and absolute discretion without liability to you.
      </Text>
      <Text style={styles.label}>Transaction Limits</Text>
      <Text style={styles.text}>
        Daily and monthly transaction and amount limits may apply. Limits
        applicable to you will be disclosed before you complete transaction.
      </Text>
      <Text style={styles.label}>Funds Availability</Text>
      <Text style={styles.text}>
        <Text style={{ fontWeight: "400" }}>AVAILABLE IMMEDIATELY:</Text>
        Subject to case-by-case approval and provides immediate funds available
        for transfers, bill payments, debit card or ATM cash withdrawal
        transactions and, subject to cutoff times and whether the deposit is
        made on a business day, funds will also be available for items processed
        in tonight’s processing.
      </Text>
      <Text style={{ fontWeight: "400" }}>
        AVAILABLE FOR PROCESSING TONIGHT:
      </Text>
      <Text style={styles.text}>
        Subject to cutoff time and whether the deposit is made on a business
        day, funds will be available for items processed in tonight’s processing
        and available the next business day of deposit for debit card
        transactions.
      </Text>
      <Text style={{ fontWeight: "400" }}>
        OTHER FUNDS AVAILABILITY INFORMATION:
      </Text>
      <Text style={styles.text}>
        Business days do not include Saturdays, Sunday, and federal holidays.
        Deposits made after 8 p.m. C.T. on a business day or on a day that is
        not a business day. The funds availability rules provided in the deposit
        agreement governing your account do not apply to deposits made through
        the Mobile Remote Deposit Capture Service. Funds availability may be
        delayed beyond the availability option you have selected for such time
        periods as we may determine if your deposit account is inactive or not
        in good standing or to mitigate risk of error, fraud, or other loss to
        us. We recommend that you contact us before using the services if you
        are uncertain whether your deposit account is inactive or not in good
        standing. You can always verify whether the deposited funds are
        available by checking your account on Mobile or Online Banking. See
        Mobile Remote Deposit Capture Services terms and conditions for further
        details.
      </Text>
      <Text style={styles.label}>Fees</Text>
      <Text style={{ fontWeight: "400" }}>AVAILABLE IMMEDIATELY</Text>
      <Text style={styles.text}>
        1-4% of the amount of each check, depending on check type and amount
        ($5.00 minimum fee applies.) Fee amount will be disclosed before you
        complete your transaction.
      </Text>
      <Text style={{ fontWeight: "400" }}>
        AVAILABLE FOR PROCESSING TONIGHT
      </Text>
      <Text style={styles.text}>$0.00 per check</Text>
      <Text style={styles.label}>Endorsements</Text>
      <Text style={styles.text}>
        Endorse the check with “For Mobile RC Services Only”, your account
        number (deposit account transactions only), and your signature.
      </Text>
      <Text style={styles.label}>What to do with your check</Text>
      <Text style={styles.text}>
        Keep the check safe and secure for 30 days, then destroy or write “void”
        on the check. If you believe the check has not posted to your account
        and cleared the check writer’s account within 30-day period, please
        contact us before destroying or writing “void” on the check.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: config.hp("2%"),
    paddingVertical: config.hp("2%"),
  },
  label: {
    color: theme.colors.primary,
    marginBottom: config.hp(".5%"),
    fontSize: 18,
    fontWeight: "500",
  },
  text: {
    marginBottom: config.hp("2%"),
  },
});

export default DepositDisclosures;
