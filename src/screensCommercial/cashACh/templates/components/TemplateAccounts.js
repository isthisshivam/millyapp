import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";
import AddPersons from "../../components/addPersons/AddPersons";

const TemplateAccounts = ({ payload }) => {
  const [showForm, setShowForm] = useState(false);
  return (
    <View>
      {showForm ? (
        <AddPersons></AddPersons>
      ) : (
        <View>
          <Text>Destination Accounts</Text>
          {payload.persons.length > 0 ? (
            <ScrollView
              nestedScrollEnabled={true}
              contentContainerStyle={{
                height: "100%",
                alignItems: "center",
              }}
            >
              {payload.persons?.map((item, i) => {
                return <Person key={i} item={item}></Person>;
              })}
              {/* <FlatList
          data={item.persons}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
        /> */}
            </ScrollView>
          ) : (
            <View
              style={{
                height: config.hp("25%"),
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 18 }}>
                No Destination Accounts Added
              </Text>
              <Text style={{ fontSize: 18 }}>
                Please click below to add accounts
              </Text>
            </View>
          )}
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "center",
              paddingVertical: config.hp("2%"),
            }}
          >
            <TouchableOpacity onPress={() => setShowForm(true)}>
              <Text style={{ fontSize: 18 }}>Add Person +</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default TemplateAccounts;
