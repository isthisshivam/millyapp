import React, { useRef, useEffect } from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
//import SpriteSheet from "rn-sprite-sheet";

const Avatar = () => {
  const avatar = useRef(null);

  function play() {
    avatar.current.play({
      type: "walk",
      fps: 10,
      loop: true,
    });
  }
  useEffect(() => {
    play();
  }, []);

  return (
    <View>
      <TouchableOpacity onPress={play}>
        <Text>Play</Text>
      </TouchableOpacity>
      {/* <SpriteSheet
        ref={avatar}
        source={require("../../../../assets/hero.png")}
        columns={8}
        rows={5}
        //height={200} // set either, none, but not both
        width={100}
        // frameHeight={50} // manually set size of your sprite
        // frameWidth={50} // overrides auto calculation of frame size based on height, width, columns, and rows.
        // offsetX={0}
        // offsetY={0}
        imageStyle={{ marginTop: -1 }}
        animations={{
          walk: [10, 11, 12, 13, 14],
          appear: Array.from({ length: 15 }, (v, i) => i + 18),
          die: Array.from({ length: 21 }, (v, i) => i + 33),
        }}
      /> */}
    </View>
  );
};

export default Avatar;
