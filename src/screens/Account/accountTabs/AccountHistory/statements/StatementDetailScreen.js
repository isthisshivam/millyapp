import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
//import PDFReader from "rn-pdf-reader-js";
import { useDispatch } from "react-redux";
import { UploadItem } from "../../../../../store/actions/eSafeActions";
import { ActivityIndicator } from "react-native-paper";

import Button from "../../../../../components/Button";
import { config } from "../../../../../config/Config";
import { theme } from "../../../../../config/Theme";

const StatementDetailScreen = ({ route, navigation }) => {
  const [loading, setLoading] = useState(false);
  const { statement } = route.params;
  const dispatch = useDispatch();

  //base64?: string // should start with `data:application/pdf;base64,`. A base64 encoded pdf file tends to start with `JVBERi0xL` so your complete string should look something like this: `data:application/pdf;base64,JVBERi0xL...`

  //Get all ids and sort
  const ids = useSelector((state) => state.eSafe)
    .sort((a, b) => b.id - a.id)
    .map((item) => item.id);

  //Upload item to redux/backend
  let data = {
    id: ids[0] + 1,
    title: `${statement.month} ${statement.year} Statement`,
    imageUrl: statement.url,
    uploadDate: new Date(),
    category: "Statement",
  };
  const upload = () => {
    dispatch(UploadItem(data));
    navigation.navigate("e-safe", { screen: "items" });
  };

  useEffect(() => {
    setLoading(true);
  }, []);

  const toggleLoading = () => {
    setLoading(!loading);
  };

  return (
    <View style={styles.container}>
      {/* <PDFReader
        webviewStyle={{ height: 100 }}
        onError={(error) => console.log(error)}
        onLoad={toggleLoading}
        onLoadEnd={() => setLoading(false)}
        customStyle={{
          readerContainer: {
            height: 200,
          },
        }}
        source={{
          base64: statement.url ? statement.url : undefined,
        }}
      /> */}
      {loading ? (
        <View
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator
            animating={true}
            color="green"
            size={config.hp("20%")}
          />
        </View>
      ) : undefined}
      <View
        style={{
          paddingVertical: config.hp("2%"),
          alignItems: "center",

          paddingHorizontal: config.wp("4%"),
        }}
      >
        <Button
          text="Save To eSafe"
          color="white"
          background={theme.colors.primary}
          fontSize={20}
          radius={12}
          height={50}
          width={170}
          onPress={upload}
        ></Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: config.hp("25%"),
    backgroundColor: "#ecf0f1",
  },
});

export default StatementDetailScreen;
