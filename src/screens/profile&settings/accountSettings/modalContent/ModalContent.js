import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { UpdatePic } from "../../../../../store/actions/ProfileAction";
import { styles } from "./style";
import * as ImagePicker from "expo-image-picker";
import { Avatar } from "react-native-paper";
import { config } from "../../../../../config/Config";

const ModalContent = ({
  setModalActive,
  modalActive,
  image,
  status,
  setStatus,
}) => {
  const [avatarImage, setAvatarImage] = useState(image);
  const dispatch = useDispatch();
  const [newAvatar, setNewAvatar] = useState();

  useEffect(() => {
    setAvatarImage(image);
  }, [image]);

  function savePic() {
    setStatus({
      ...status,
      loading: true,
    });
    dispatch(UpdatePic(avatarImage));
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.cancelled) {
      setAvatarImage(result.base64);
    }
  };
  useEffect(() => {
    setNewAvatar(avatarImage);
  }, [avatarImage]);

  return (
    <View style={styles.backGroundContainer}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.closeButton}
          activeOpacity={0.65}
          onPress={() => setModalActive(!modalActive)}
        >
          <AntDesign name="close" size={24} color="white" />
        </TouchableOpacity>
        <Avatar.Image
          source={{ uri: `data:image/png;base64,${avatarImage}` }}
          style={styles.avatar}
          resizeMode="contain"
          size={config.hp("15%")}
        />
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            onPress={() => pickImage()}
            style={{
              ...styles.button,
              width: config.wp("40% "),
              alignItems: "center",
              flexDirection: "row",
            }}
            activeOpacity={0.65}
          >
            <Text style={styles.buttonText}>Choose Image</Text>
            <MaterialIcons name="photo-library" size={24} color="white" />
          </TouchableOpacity>
          {avatarImage !== null && (
            <TouchableOpacity
              style={{
                ...styles.button,
                width: config.wp("40% "),
                alignItems: "center",
              }}
              activeOpacity={0.65}
              onPress={() => {
                setModalActive(!modalActive), savePic();
              }}
            >
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default ModalContent;
