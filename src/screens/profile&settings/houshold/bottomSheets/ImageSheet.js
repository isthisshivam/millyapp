import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import * as ImagePicker from "expo-image-picker";
import { config } from "../../../../config/Config";
import { theme } from "../../../../config/Theme";

const ImageSheet = ({ handleChange, closeSheet }) => {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    closeSheet();
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    // console.log(result);

    if (!result.cancelled) {
      setImage(result.base64);
      handleChange("image", result.base64);
    }
  };
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
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
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <TouchableOpacity
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
    </View>
  );
};

export default ImageSheet;
