import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ColorIcons = ({
  index,
  setBackgroundColor,
  setMainTextColor,
  setSecondaryTextColor,
  colors,
}) => {
  const [iconColors, setIconColors] = useState(colors);

  const toggleDisabled = (i) => {
    if (index == 0) {
      //Set Text iconColors to disabled
      colors[1][i].disabled = true;

      colors[2][i].disabled = true;

      setBackgroundColor(iconColors[index][i].color);
    }

    //Set all iconColors to false except the selected background color
    for (var x = 0; x < iconColors[index].length; x++) {
      if (x != i) {
        colors[0][x].disabled = false;
        colors[1][x].disabled = false;
        colors[2][x].disabled = false;
      }
    }
  };

  const selectTextColor = (i) => {
    if (index == 1) {
      setMainTextColor(iconColors[index][i].color);
    }
    if (index == 2) {
      setSecondaryTextColor(iconColors[index][i].color);
    }
  };

  const ReturnColors = () => {
    let array1 = iconColors[index].slice(0, iconColors[index].length / 2);
    let array2 = iconColors[index].slice(
      iconColors[index].length / 2,
      iconColors[index].length
    );

    return (
      <View>
        <View style={{ flexDirection: "row" }}>
          {array1.map((item, i) => (
            <Ionicons
              key={i}
              name="color-palette"
              size={48}
              color={item.disabled ? "gray" : item.color}
              onPress={() =>
                item.disabled
                  ? undefined
                  : index == 0
                  ? toggleDisabled(i)
                  : selectTextColor(i)
              }
            />
          ))}
        </View>
        <View style={{ flexDirection: "row" }}>
          {array2.map((item, i) => (
            <Ionicons
              key={i}
              name="color-palette"
              size={48}
              color={item.disabled ? "gray" : item.color}
              onPress={() =>
                index == 0
                  ? toggleDisabled(i + iconColors[index].length / 2)
                  : selectTextColor(i + iconColors[index].length / 2)
              }
            />
          ))}
        </View>
      </View>
    );
  };
  useEffect(() => {
    setIconColors(colors);
  }, [colors]);

  return (
    <View style={{ flexDirection: "row" }}>
      <ReturnColors></ReturnColors>
    </View>
  );
};

export default ColorIcons;
