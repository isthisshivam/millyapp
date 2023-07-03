import React from "react";
import { View, ScrollView, Text } from "react-native";
import { styles } from "./styles";

import HomeSubscriptionCard from "./SubscriptionCard/HomeSubscriptionCard";
import AccountTransferFrom from "./AccountTransfer/AccountTransferFrom";
import AccountTransferTo from "./AccountTransfer/AccountTransferTo";
import AccountDepositFrom from "./AccountTransfer/AccountDepositFrom";
import AlertBalance from "./Alerts/AlertBalance";
import AlertDepositFrom from "./Alerts/AlertDepositFrom";
import StatementCard from "./e-statementCard/StatementCard";
import BillpayCard from "../../screens/BillPay/payment/paymentComponents/BillPayCard";

const Carousel = (props) => {
  const { items } = props;

  const itemsPerInterval =
    props.itemsPerInterval === undefined ? 1 : props.itemsPerInterval;

  const [interval, setInterval] = React.useState(1);
  const [intervals, setIntervals] = React.useState(1);
  const [width, setWidth] = React.useState(0);

  const init = (width) => {
    // initialise width
    setWidth(width);
    // initialise total intervals
    const totalItems = items.length;

    setIntervals(Math.ceil(totalItems / itemsPerInterval));
  };

  const getInterval = (offset) => {
    for (let i = 1; i <= intervals; i++) {
      if (offset + 1 < (width / intervals) * i) {
        return i;
      }
      if (i == intervals) {
        return i;
      }
    }
  };

  let bullets = [];
  for (let i = 1; i <= intervals; i++) {
    bullets.push(
      <Text
        key={i}
        style={
          props.bulletsWhite
            ? [
                {
                  ...styles.bulletWhite,
                  opacity: interval === i ? 0.9 : 0.2,
                },
              ]
            : [
                {
                  ...styles.bullet,
                  opacity: interval === i ? 0.9 : 0.2,
                },
              ]
        }
      >
        &bull;
      </Text>
    );
  }

  return (
    <View style={{ width: "100%" }}>
      <ScrollView
        horizontal={true}
        contentContainerStyle={{
          ...styles.scrollView,
          width: `${100 * intervals}%`,
        }}
        showsHorizontalScrollIndicator={false}
        onContentSizeChange={(w, h) => init(w)}
        onScroll={(data) => {
          setWidth(data.nativeEvent.contentSize.width);
          setInterval(getInterval(data.nativeEvent.contentOffset.x));
        }}
        scrollEventThrottle={200}
        pagingEnabled
        decelerationRate="fast"
      >
        {items?.map((item, index) => {
          switch (props.type) {
            //Subscriptions Card
            case "subscription-home":
              return <HomeSubscriptionCard key={index} {...item} {...props} />;
            case "account-transfer-from":
              return <AccountTransferFrom key={index} {...item} {...props} />;
            case "account-transfer-to":
              return <AccountTransferTo key={index} {...item} {...props} />;
            case "account-deposit-from":
              return <AccountDepositFrom key={index} item={item} {...props} />;
            case "alert-accounts-balance":
              return <AlertBalance key={index} {...item} {...props} />;
            case "alert-accounts-deposit-from":
              return <AlertDepositFrom key={index} {...item} {...props} />;
            case "billpay-from":
              return <BillpayCard key={index} item={item} {...props} />;
            case "statement-card":
              return <StatementCard key={index} {...item} {...props} />;
            default:
              return undefined;
          }
        })}
      </ScrollView>
      <View style={styles.bullets}>{bullets}</View>
    </View>
  );
};

export default Carousel;
