import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Camera, CameraType } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import { config } from "../../../config/Config";
import { theme } from "../../../config/Theme";

const AttachmentSheet = ({
  handleChange,
  setShowCamera,
  closeSheet,
  setSnapPoints,
  attachments,
}) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [showAttachments, setShowAttachments] = useState(false);

  const pickImage = useCallback(async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      //aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    // console.log(result);

    if (result.assets[0]) {
      handleChange("image", result.assets[0].base64);
    }
  });

  //console.log(attachments);

  const removeAttachment = useCallback((attachment) => {
    let array = attachments.filter((item) => item != attachment);
    handleChange("attachments", array);
  });
  const viewAttachements = useCallback(() => {
    setSnapPoints(["40%", "80%"]);
    setShowAttachments(true);
  });
  const hideAttachments = useCallback(() => {
    setSnapPoints(["40%"]);
    setShowAttachments(false);
  });

  useEffect(() => {
    setShowAttachments(false);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <TouchableOpacity
          onPress={pickImage}
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
          <Text style={{ fontSize: 18 }}>Upload</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setShowCamera(true), closeSheet();
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
          <Text style={{ fontSize: 18 }}>Capture</Text>
        </TouchableOpacity>
      </View>
      {showAttachments ? (
        <ScrollView style={{ flex: 1, paddingHorizontal: config.wp("4%") }}>
          <View
            style={{
              paddingVertical: config.hp("2%"),
              alignItems: "flex-end",
              width: "100%",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: theme.colors.primary,
                fontWeight: "500",
              }}
            >
              Message Attachments
            </Text>
            <TouchableOpacity onPress={() => hideAttachments()}>
              <Text>Hide Attachments</Text>
            </TouchableOpacity>
          </View>
          {attachments?.map((item, i) => (
            <View
              key={i}
              style={{
                width: "100%",
                height: config.hp("30%"),
                borderRadius: 12,
                marginBottom: config.hp("2%"),
                alignItems: "center",
              }}
            >
              <Image
                source={{ uri: `data:image/png;base64,${item.data}` }}
                style={{ width: "90%", height: "100%", borderRadius: 12 }}
                resizeMode="cover"
              />
              <Ionicons
                onPress={() => removeAttachment(item)}
                name="close-circle"
                size={28}
                color={"white"}
                style={{
                  position: "absolute",
                  top: 10,
                  right: 25,
                  borderWidth: 1,
                  borderRadius: 50,
                }}
              />
            </View>
          ))}
        </ScrollView>
      ) : (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <TouchableOpacity
            disabled={!attachments[0]}
            onPress={() => viewAttachements()}
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
            <Text
              style={{
                fontSize: 18,
                color: !attachments[0] ? theme.colors.faded : "black",
              }}
            >
              View Attachments
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default AttachmentSheet;
