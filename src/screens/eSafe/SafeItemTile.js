import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Modal,
} from "react-native";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import LottieView from "lottie-react-native";
import {
  DeleteItem,
  GetESafeFile,
  UpdateCategory,
  GetESafe,
} from "../../store/actions/eSafeActions";

import Button from "../../components/Button";
import { config } from "../../config/Config";
import { theme } from "../../config/Theme";
import { ScrollView } from "react-native-gesture-handler";
import DeleteModal from "../../components/Modals/DeleteModal";
import CategoryModal from "./CategoryModal";
import StatusHandler from "../../../utils/StatusHandler";

const SafeItemTile = ({ item }) => {
  const { fileName, uploadTime, recordId, contentType, data } = item;
  let tempDate = uploadTime?.slice(0, 10);
  const formattedDate = new Date(tempDate).toLocaleDateString("en-US");
  const state = useSelector((state) => state.eSafe);
  const [expanded, setExpanded] = useState(false);
  const dispatch = useDispatch();

  const [status, setStatus] = useState({
    loading: false,
    showDelete: false,
  });

  const expand = () => {
    setExpanded(!expanded);
    setStatus({
      ...status,
      loading: true,
    });
    let payload = { id: [item.recordId], category: item.category };
    dispatch(GetESafeFile(payload));
  };

  const toggleDelete = () => {
    setStatus({
      ...status,
      showDelete: true,
    });
  };
  // function toggleCategories() {
  //   console.log("cliked");
  //   setShowCategory(!showCategory);
  // }

  // function handleChange(name, value) {
  //   setCategory(value);
  // }

  function deleteItem() {
    setStatus({
      ...status,
      loading: true,
    });
    if (item.category == "Trash") {
      dispatch(DeleteItem(recordId));
      setExpanded(false);
      return;
    }
    dispatch(UpdateCategory({ recordId: recordId, category: "Trash" }));
    setExpanded(false);
  }

  // function unTrash() {
  //     setStatus({
  //   ...status,
  //   loading: true,
  // });
  //   toggleCategories();
  //   // if (category != undefined) {
  //   //   dispatch(UpdateCategory({ recordId: recordId, category: category }));
  //   // }
  // }

  useEffect(() => {
    if (status == true) {
      setStatus({
        ...status,
        loading: false,
      });
    }
  }, [status]);
  useEffect(() => {
    if (state.getFileData == true) {
      setStatus({
        ...status,
        loading: false,
      });
    }
  }, [state]);

  const ImagePreview = () => (
    <View style={{ paddingVertical: config.hp("4%"), width: "100%" }}>
      {contentType === "application/pdf" ? (
        <View
          style={{
            height: config.hp("60%"),
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* <PDFReader
            onLoadEnd={() => setLoading(false)}
            onError={(error) => console.log(error)}
            webviewStyle={{ height: 100 }}
            source={{
              base64: data ? `data:application/pdf;base64,${data}` : undefined,
            }}
          /> */}
          <View style={{ ...styles.buttonContainer, marginTop: 20 }}>
            {data ? (
              <Button
                text="Download"
                background={theme.colors.primary}
                marginBottom={18}
                color="white"
                radius={7}
                height={38}
                width={config.wp("20%")}
                onPress={download}
              ></Button>
            ) : undefined}
            <Button
              text={item.category == "Trash" ? "Delete" : "Trash"}
              background={theme.colors.primary}
              color="white"
              marginBottom={18}
              radius={7}
              height={38}
              width={config.wp("20%")}
              onPress={() => toggleDelete()}
            ></Button>
          </View>
        </View>
      ) : data ? (
        <View>
          <Image
            source={{ uri: `data:${contentType};base64,${data}` }}
            style={{ height: config.hp("45%"), width: config.wp("100%") }}
            resizeMode="cover"
          ></Image>
          <View
            style={{
              ...styles.buttonContainer,
              marginTop: 20,
            }}
          >
            <Button
              text="Download"
              background={theme.colors.primary}
              color="white"
              radius={7}
              height={38}
              width={config.wp("20%")}
              onPress={download}
            ></Button>
            {/* <TouchableOpacity
              onPress={toggleCategories}
              style={{
                backgroundColor: "gray",
                paddingVertical: config.hp("1%"),
                paddingHorizontal: config.wp("2%"),
                borderRadius: 7,
                width: config.wp("20%"),
                alignItems: "center",
                elevation: 7,
              }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                Un-Trash
              </Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              onPress={toggleDelete}
              style={{
                backgroundColor: "red",
                paddingVertical: config.hp("1%"),
                paddingHorizontal: config.wp("2%"),
                borderRadius: 7,
                width: config.wp("20%"),
                alignItems: "center",
                elevation: 7,
              }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                {item.category == "Trash" ? "Delete" : "Trash"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View>
          <Text>No image data to display</Text>
          <Button
            text="Delete"
            background={theme.colors.primary}
            color="white"
            marginBottom={18}
            radius={7}
            height={38}
            width={config.wp("20%")}
            onPress={() => toggleDelete()}
          ></Button>
        </View>
      )}
    </View>
  );

  const download = async () => {
    if (contentType == "application/pdf") {
      //Remove data:application/pdf;base64, from beginning of string.
      const data = data?.slice(28);
      //Create Local Url to Save To
      const fileURl = FileSystem.documentDirectory + "sample.pdf";
      //Save Base64 to local File
      await FileSystem.writeAsStringAsync(fileURl, data, {
        encoding: FileSystem.EncodingType.Base64,
      });

      return;
    } else {
      //Download image to device library... only works with base64 not url
      try {
        //Create Local Url to Save To
        const fileURl =
          FileSystem.documentDirectory +
          `safeItem-image${Math.random(100)}.png`;
        //Save Base64 to File
        await FileSystem.writeAsStringAsync(fileURl, data, {
          encoding: FileSystem.EncodingType.Base64,
        });
        //Turn file into media asset/save to device library
        const mediaResult = await MediaLibrary.createAssetAsync(fileURl);
        if (mediaResult.uri) {
          setSuccess(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const ExpandedView = () => (
    <View
      style={{
        ...styles.expandedTileContainer,
      }}
    >
      <View style={styles.topContainer}>
        {status.loading ? (
          <LottieView
            loop
            autoPlay
            style={{
              width: 160,
              height: 160,
            }}
            source={require("../../components/ui/loading-spinner.json")}
          />
        ) : (
          <View style={{ width: "100%" }}>
            <View
              style={{
                flexDirection: "column",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    paddingTop: config.hp("1%"),
                    paddingHorizontal: config.wp("2%"),
                  }}
                >
                  <Text style={styles.title}>{item.fileName}</Text>
                  <Text style={styles.date}>{formattedDate}</Text>
                  <Text style={styles.date}></Text>
                </View>
                <AntDesign
                  name="shrink"
                  size={24}
                  color="black"
                  onPress={expand}
                />
              </View>
            </View>
          </View>
        )}
      </View>

      <View style={styles.viewContainer}>
        <ImagePreview></ImagePreview>
      </View>
    </View>
  );
  const RegularView = () => (
    <TouchableOpacity onPress={expand} style={styles.tileContainer}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Text style={styles.title} numberOfLines={1}>
          {fileName}
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: config.wp("30%"),
          }}
        >
          <Text style={styles.date}>{formattedDate}</Text>

          <FontAwesome5
            name="expand-alt"
            size={20}
            color={theme.colors.primary}
            onPress={expand}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
  return (
    <ScrollView>
      {expanded ? <ExpandedView></ExpandedView> : <RegularView></RegularView>}
      <StatusHandler
        state={state}
        status={status}
        navigation={null}
        hideSuccess={false}
        deleteItem={deleteItem}
        setStatus={setStatus}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  button: {
    marginBottom: 10,
    backgroundColor: theme.colors.primary,
    borderRadius: 25,
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: "20%",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  date: {
    fontSize: 18,
  },
  expandedTileContainer: {
    flex: 1,
    width: "100%",
    height: config.hp("75%"),
    backgroundColor: "#e0e0e0",
    marginBottom: 10,

    paddingBottom: config.hp("8%"),
    borderRadius: 5,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  expandedTitle: {
    fontSize: 20,
    color: "#373737",
    fontWeight: "400",
  },
  imageContainer: {
    flex: 1,
  },

  modalText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: config.hp("35%"),
    width: config.wp("95%"),
  },
  tileContainer: {
    width: "100%",
    backgroundColor: "#e0e0e0",
    paddingHorizontal: 10,
    borderRadius: 5,
    paddingVertical: config.hp("1%"),
    marginBottom: config.hp("2%"),
  },
  title: {
    fontSize: 20,
    color: "#373737",
    fontWeight: "bold",
    width: config.wp("50%"),
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  viewContainer: {
    justifyContent: "center",
    height: "100%",
    alignItems: "center",
    width: "100%",
  },
});

export default SafeItemTile;
