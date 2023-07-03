import React from "react";
import { View, Text } from "react-native";

const ActivityDetailScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const accounts = useSelector((state) => state.accounts);
  const item = deposits?.filter(
    (deposit) => deposit.confirmation === confirmation
  );
  const { amount, status, date, depositAccount, checkImage1, checkImage2 } =
    item[0];

  //("current item", item);

  const [showChecks, setShowChecks] = useState(false);

  const toggleChecks = () => {
    setShowChecks(!showChecks);
  };
  return (
    <View>
      <Text></Text>
    </View>
  );
};

export default ActivityDetailScreen;
