import React, { useCallback } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { config } from "../../config/Config";
import { theme } from "../../config/Theme";
import { useSelector } from "react-redux";
import { useAppSelector } from "../../store/Store";

const QuestionsSheet = ({ handleChange, closeSheet }) => {
  const state = useAppSelector((state) => state.auth);
  const data = state.questions;
  let obj = {
    questionsIds: [],
    questions: [],
  };
  //console.log(data);

  const renderItem = useCallback(({ item, index }) => {
    let id = data.questionIds[index];
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            handleChange("question", { id: id, question: item });
            closeSheet();
          }}
          style={{
            flexDirection: "row",
            itemsc: "center",
            justifyContent: "center",
            marginBottom: config.hp("1%"),
            borderBottomColor: theme.colors.faded,
            borderBottomWidth: 1,
            width: "80%",
            paddingVertical: config.hp("1%"),
          }}
        >
          <Text style={{ fontSize: 18 }}>{item}</Text>
        </TouchableOpacity>
      </View>
    );
  }, []);
  return (
    <>
      {data.questions?.length > 0 ? (
        <BottomSheetFlatList
          data={data.questions}
          keyExtractor={(i) => i}
          renderItem={renderItem}
          //contentContainerStyle={styles.contentContainer}
        />
      ) : (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>No questions available </Text>
        </View>
      )}
    </>
  );
};

export default QuestionsSheet;
