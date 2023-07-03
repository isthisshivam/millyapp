import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Switch,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { AntDesign } from "@expo/vector-icons";

import { ToggleEstatements } from "../../store/actions/AccountActions";
import ModalContent from "./modalContent/ModalContent";
import Carousel from "../../components/Carousel/Carousel";
import Button from "../../components/Button";

import { theme } from "../../config/Theme";
import { styles } from "./style";
import { config } from "../../config/Config";

const EStatementScreen = ({ navigation }) => {
  const accounts = useSelector((state) => state.accounts.accounts);
  const [selectedId, setSelectedId] = useState();
  const [currentAccount, setCurrentAccount] = useState(accounts[0]);
  const [account, setAccount] = useState(accounts[0]);
  const [statements, setStatements] = useState();
  const [showModal, setShowModal] = useState(false);
  const [viewAll, setViewAll] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const [last3, setLast3] = useState();
  const dispatch = useDispatch();

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  useEffect(() => {
    let account = accounts?.filter((item) => item.id === selectedId);
    setCurrentAccount(account[0]);
  }, [selectedId]);

  const toggleStatements = () => {
    const payload = {
      id: selectedId,
      enableStatements: !enabled,
    };
    //dispatch(ToggleEstatements(payload));
    setEnabled(!enabled);
    toggleModal();
  };

  //useEffect(() => {
  //setEnabled(currentAccount.enableStatements);
  //}, [currentAccount.enableStatements]);

  const toggleViewAll = () => {
    setViewAll(!viewAll);
  };

  const NoData = () => (
    <View>
      <Text>No Statements Available for this account.</Text>
    </View>
  );
  const Last3 = () => (
    <View>
      {last3?.map((item, i) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("StatementDetails", {
              statement: item,
            })
          }
          key={i}
          style={styles.statement}
        >
          <Text style={{ fontSize: 18 }}>
            Statement for {item.month} {item.year}
          </Text>
          <AntDesign name="right" size={24} color="black" />
        </TouchableOpacity>
      ))}
    </View>
  );
  const AllStatements = () => (
    <View>
      {statements?.map((item, i) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("StatementDetails", {
              statement: item,
            })
          }
          key={i}
          style={styles.statement}
        >
          <Text style={{ fontSize: 18 }}>
            Statement for {item.month} {item.year}
          </Text>
          <AntDesign name="right" size={24} color="black" />
        </TouchableOpacity>
      ))}
    </View>
  );
  return (
    <ScrollView style={{ paddingVertical: config.hp("4%") }}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>eStatements</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleSecondary}>Select Account</Text>
        </View>
        <View style={styles.Cards}>
          <Carousel
            items={accounts}
            navigation={navigation}
            type={"statement-card"}
            handleChange={setSelectedId}
            selectedId={selectedId}
          />
        </View>
        <View style={styles.optionsContainer}>
          <View style={styles.option}>
            <Text style={styles.optionTitle}>e-Statement</Text>
            <View style={styles.flipContainer}>
              <Text style={styles.flipTitle}>Opt-out</Text>
              <Switch
                trackColor={{
                  false: theme.colors.faded,
                  true: theme.colors.primaryLight,
                }}
                thumbColor="white"
                ios_backgroundColor={theme.colors.faded}
                onValueChange={() => toggleStatements()}
                value={enabled}
                style={{ transform: [{ scaleX: 1.15 }, { scaleY: 1.15 }] }}
              />
              <Text style={styles.flipTitle}>Opt-in</Text>
            </View>
          </View>
        </View>
        {enabled ? (
          <View
            style={{
              flexDirection: "column",
              paddingVertical: config.hp("2%"),
              paddingHorizontal: config.wp("4%"),
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: theme.colors.primary,
                paddingBottom: config.hp("2%"),
              }}
            >
              Click to view Statement
            </Text>
            {statements ? (
              <View>
                {currentAccount.statements && !viewAll ? (
                  <Last3></Last3>
                ) : currentAccount.statements && viewAll ? (
                  <AllStatements></AllStatements>
                ) : undefined}
                <View
                  style={{
                    alignItems: "center",
                    paddingVertical: config.hp("2%"),
                    marginBottom: config.hp("4%"),
                  }}
                >
                  <Button
                    text="View All"
                    color="white"
                    background={theme.colors.primary}
                    radius={12}
                    height={50}
                    width={200}
                    onPress={toggleViewAll}
                    fontSize={20}
                  ></Button>
                </View>
              </View>
            ) : (
              <NoData></NoData>
            )}
          </View>
        ) : (
          <View
            style={{ alignItems: "center", paddingVertical: config.hp("4%") }}
          >
            <Text style={{ fontSize: 20 }}>
              You do not have EStatements enabled
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default EStatementScreen;
