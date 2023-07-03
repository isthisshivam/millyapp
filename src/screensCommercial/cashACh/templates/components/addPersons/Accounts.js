import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, {
  useRef,
  useMemo,
  useState,
  useEffect,
  useCallback,
} from "react";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { config } from "../../../../../config/Config";
import { theme } from "../../../../../config/Theme";
import AddPersons from "../addPersons/AddPersons";
import EditPerson from "./EditPerson";
import Person from "./Person";
//import AccountType from "../modals/AccountType";

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
  const accountSheetRef = useRef(); // ref
  const snapPoints = useMemo(() => [" 50%"], []); // variables
  const handleClosePress = () => accountSheetRef.current.close();
  const handleExpand = () => accountSheetRef.current.expand();

  function toggleAccountType() {
    setShowAccountType(!showAccountType);
  }
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

  return (
    <View style={styles.container}>
      {showForm && !editing ? (
        <AddPersons
          account={account}
          handleChange={handleChange}
          handleExpand={handleExpand}
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
            alignItems: "center",
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
            <ScrollView
              nestedScrollEnabled={true}
              contentContainerStyle={{
                height: "100%",
                alignItems: "center",
                width: "100%",
              }}
            >
              {payload.destAccounts?.map((item, i) => {
                return (
                  <Person
                    key={i}
                    item={item}
                    editPerson={editPerson}
                    removePerson={removePerson}
                  ></Person>
                );
              })}
            </ScrollView>
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

      {editing ? undefined : (
        <View
          style={{
            alignItems: "center",
            justifyContent: "flex-end",
            flexDirection: "column",
            flex: 1,
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
      {/* <AccountType
        showAccountType={showAccountType}
        handleChange={handleChange}
      ></AccountType> */}
      <BottomSheet
        ref={accountSheetRef}
        index={-1}
        snapPoints={snapPoints}
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
          </View>

          <TouchableOpacity
            onPress={() => handleChange("accountType", "Checking")}
            style={{
              width: "100%",
              marginBottom: config.hp("2%"),
              paddingVertical: config.hp("1%"),
            }}
          >
            <Text>Checking Account</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
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
