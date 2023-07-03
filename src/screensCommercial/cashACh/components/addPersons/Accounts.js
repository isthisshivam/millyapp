import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useMemo, useState } from "react";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";
import BottomSheet from "@gorhom/bottom-sheet";
import AddPersons from "../addPersons/AddPersons";
import EditPerson from "./EditPerson";
import { Ionicons } from "@expo/vector-icons";
import Person from "./Person";

const Accounts = ({
  payload,
  setPayload,
  handleNext,
  handleBack,
  handleChange,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [showAccountType, setShowAccountType] = useState(false);
  const [editing, setEditing] = useState(false);
  const bottomSheetRef = useRef(); // ref
  const handleClosePress = () => bottomSheetRef.current.close();
  const handleExpand = () => bottomSheetRef.current.expand();

  const [account, setAccount] = useState({
    routing: undefined,
    accountNumber: undefined,
    accountType: undefined,
    firstName: undefined,
    lastName: undefined,
    notes: undefined,
    id: undefined,
    defaultAmount: undefined,
    amount: undefined,
  });

  function handleChange(name, value) {
    setAccount({
      ...account,
      [name]: value,
    });
  }

  function editPerson(item) {
    setAccount({
      ...item,
    });
    setShowForm(true);
    setEditing(true);
  }

  function removePerson(person) {
    let array = payload.destAccounts.filter((item) => item.id != person.id);
    setPayload({
      ...payload,
      destAccounts: array,
    });
  }

  function handleSave() {
    setShowForm(false);
    setPayload({
      ...payload,
      destAccounts: [...payload.destAccounts, account],
    });
  }

  const renderItem = ({ item }) => (
    <Person
      item={item}
      editPerson={editPerson}
      removePerson={removePerson}
    ></Person>
  );

  return (
    <View style={styles.container}>
      {showForm && !editing ? (
        <AddPersons
          handleSave={handleSave}
          account={account}
          handleChange={handleChange}
          handleExpand={handleExpand}
          setShowForm={setShowForm}
        ></AddPersons>
      ) : showForm && editing ? (
        <EditPerson
          account={account}
          handleChange={handleChange}
          handleExpand={handleExpand}
          setShowForm={setShowForm}
          setEditing={setEditing}
          setPayload={setPayload}
          payload={payload}
        ></EditPerson>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "flex-start",
            //alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "500",
              color: theme.colors.primary,
              //paddingHorizontal: config.wp("2%"),
              marginBottom: config.hp("2%"),
              width: "100%",
            }}
          >
            Destination Accounts
          </Text>

          {payload.destAccounts?.length > 0 ? (
            <View style={{ flex: 1 }}>
              <FlatList
                data={payload.destAccounts}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                style={{ height: "100%" }}
              />
            </View>
          ) : (
            <View
              style={{
                flex: 1,
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

          <TouchableOpacity
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "center",
              paddingVertical: config.hp("2%"),

              display: "flex",
              zIndex: 30,
            }}
            onPress={() => setShowForm(true)}
          >
            <Text style={{ fontSize: 18 }}>Add Person +</Text>
          </TouchableOpacity>
        </View>
      )}

      {editing || showForm ? undefined : (
        <View
          style={{
            alignItems: "center",
            justifyContent: "flex-end",
            flexDirection: "column",
          }}
        >
          <TouchableOpacity
            onPress={handleNext}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              width: "80%",
              backgroundColor: theme.colors.primary,
              borderRadius: 7,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: "white",
                paddingVertical: config.hp(".5%"),
                width: "100%",
                textAlign: "center",
              }}
            >
              Continue
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleBack}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: "black",
                paddingVertical: config.hp(".5%"),
                width: "100%",
                textAlign: "center",
              }}
            >
              Back
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={["40%"]}
        enablePanDownToClose
        //onClose={() => setShow(false)}
      >
        <View style={{ flex: 1, flexDirection: "column" }}>
          <View
            style={{
              position: "relative",
              marginBottom: config.hp("2%"),
            }}
          >
            <Text
              style={{
                width: "100%",
                textAlign: "center",
                fontSize: 20,
                color: theme.colors.primary,
                fontWeight: "500",
              }}
            >
              Select Account Type
            </Text>
            {/* <Ionicons
              onPress={() => handleClosePress()}
              style={{ position: "absolute", right: 8, top: 0 }}
              name="close"
              size={28}
              color="black"
            /> */}
          </View>

          <View style={{ width: "100%", alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => {
                handleChange("accountType", "Checking"), handleClosePress();
              }}
              style={{
                width: "80%",
                marginBottom: config.hp("2%"),
                paddingVertical: config.hp("1%"),
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                borderBottomColor: theme.colors.faded,
                borderBottomWidth: 1,
              }}
            >
              <Text style={{ fontSize: 18 }}>Checking Account</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handleChange("accountType", "Savings"), handleClosePress();
              }}
              style={{
                width: "80%",
                marginBottom: config.hp("2%"),
                paddingVertical: config.hp("1%"),
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                borderBottomColor: theme.colors.faded,
                borderBottomWidth: 1,
              }}
            >
              <Text style={{ fontSize: 18 }}>Savings Account</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handleChange("accountType", "IRA"), handleClosePress();
              }}
              style={{
                width: "80%",
                marginBottom: config.hp("2%"),
                paddingVertical: config.hp("1%"),
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                borderBottomColor: theme.colors.faded,
                borderBottomWidth: 1,
              }}
            >
              <Text style={{ fontSize: 18 }}>IRA Account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>
      {/* <AccountType
        showAccountType={showAccountType}
        handleChange={handleChange}
        toggleAccountType={toggleAccountType}
      ></AccountType> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: config.wp("2%"),
    paddingVertical: config.hp("1%"),
    flex: 1,
  },
});

export default Accounts;
