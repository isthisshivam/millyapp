import React, { useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import { config } from "../../config/Config";
import { useAppSelector } from "../../store/Store";

const BannerImage = () => {
  const state = useAppSelector((state) => state.client);
  //console.log(state);

  return (
    <View style={styles.imageContainer}>
      {state.bannerImages.loginBanner ? (
        <Image
          style={styles.image}
          source={{
            uri: `data:image/png;base64,${state.bannerImages.loginBanner.contents}`,
          }}
          resizeMode="contain"
          resizeMethod="scale"
        />
      ) : undefined}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
  },
  imageContainer: {
    height: config.hp("35%"),
    paddingHorizontal: 5,
  },
});
export default BannerImage;
