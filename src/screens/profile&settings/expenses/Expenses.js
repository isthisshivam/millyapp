import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../../config/Theme";
import { config } from "../../../config/Config";

const Expenses = ({ navigation }) => {
  const [expenses, setExpenses] = useState([]);
  const data = useSelector((state) => state.expenses.expenses);

  useEffect(() => {
    setExpenses([...data]);
  }, [data]);

  //console.log(expenses);

  const ExpenseItem = ({ item }) => {
    let { amount, name, frequency, startDate, id } = item;
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          navigation.navigate("editExpense", { id: id });
        }}
      >
        <Text style={styles.itemName}>{name}</Text>

        <Text style={styles.rightSideNames} numberOfLines={1}>
          ${amount} / {frequency}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item }) => <ExpenseItem item={item} />;

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          width: "100%",
          paddingVertical: config.hp("1%"),
          marginBottom: config.hp("2%"),
          backgroundColor: "white",
          paddingHorizontal: config.wp("2%"),
        }}
      >
        <Text
          style={{
            fontSize: 22,
            fontWeight: "600",
            color: theme.colors.primary,
            marginBottom: 5,
          }}
        >
          Expenses
        </Text>

        <Text style={styles.summary}>
          Lets keep track of your expenses together. We can help you to save
          money by reminding you of current expenses and help you to cancel them
          once your done.
        </Text>
      </View>

      <View style={{ paddingHorizontal: config.wp("2%") }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "500",
            color: theme.colors.primary,
          }}
        >
          Expense Tracker
        </Text>

        <FlatList
          data={expenses}
          keyExtractor={(item, i) => i.toString()}
          style={{ height: "50%" }}
          contentContainerStyle={{
            width: "100%",
            flexDirection: "column",
            height: "100%",
            //backgroundColor: "white",
          }}
          renderItem={renderItem}
        ></FlatList>
      </View>

      <View
        style={{
          flex: 1,
          paddingVertical: config.hp("2%"),
          alignItems: "center",
          justifyContent: "flex-end",
          flexDirection: "column",
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: theme.colors.primary,
            borderRadius: 12,
            width: "75%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: config.wp("1%"),
            paddingVertical: config.hp(".5%"),
          }}
          onPress={() => navigation.navigate("Add Expense")}
        >
          <Ionicons name="add" size={24} color="white" />
          <Text style={{ fontSize: config.hp("2%"), color: "white" }}>
            Add New Expense
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  itemContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: config.hp(".05%"),
    borderBottomColor: theme.colors.black,
  },
  itemName: {
    fontSize: config.hp("2.15%"),
  },
  rightSideNames: {
    fontSize: config.hp("2.15%"),
    color: theme.colors.primary,
    textTransform: "capitalize",
  },

  summary: {
    fontSize: config.hp("2%"),
    color: "black",
  },
});

export default Expenses;
