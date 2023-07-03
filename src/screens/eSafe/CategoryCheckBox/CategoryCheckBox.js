import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { theme } from "../../../config/Theme";
import { config } from "../../../config/Config";
import BouncyCheckbox from "react-native-bouncy-checkbox";

const CategoryCheckBox = ({ selected, setSelected }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        onPress={() =>
          selected == "Financial"
            ? setSelected(undefined)
            : setSelected("Financial")
        }
        style={{
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
          paddingBottom: config.hp("4%"),
        }}
      >
        <BouncyCheckbox
          size={25}
          fillColor={theme.colors.primary}
          unfillColor="#FFFFFF"
          iconStyle={{ borderColor: theme.colors.primary }}
          disableBuiltInState
          disableText={true}
          isChecked={selected == "Financial" ? true : false}
          onPress={() =>
            selected == "Financial"
              ? setSelected(undefined)
              : setSelected("Financial")
          }
        />
        <Text>Financial</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          selected == "Health" ? setSelected(undefined) : setSelected("Health")
        }
        style={{
          alignItems: "center",

          flexDirection: "column",
          justifyContent: "center",
          paddingBottom: config.hp("4%"),
        }}
      >
        <BouncyCheckbox
          size={25}
          fillColor={theme.colors.primary}
          unfillColor="#FFFFFF"
          iconStyle={{ borderColor: theme.colors.primary }}
          disableBuiltInState
          disableText={true}
          isChecked={selected == "Health" ? true : false}
          onPress={() =>
            selected == "Health"
              ? setSelected(undefined)
              : setSelected("Health")
          }
        />
        <Text>Health</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          selected == "Insurance"
            ? setSelected(undefined)
            : setSelected("Insurance")
        }
        style={{
          alignItems: "center",

          flexDirection: "column",
          justifyContent: "center",
          paddingBottom: config.hp("4%"),
        }}
      >
        <BouncyCheckbox
          size={25}
          fillColor={theme.colors.primary}
          unfillColor="#FFFFFF"
          iconStyle={{ borderColor: theme.colors.primary }}
          disableBuiltInState
          disableText={true}
          isChecked={selected == "Home/Auto" ? true : false}
          onPress={() =>
            selected == "Home/Auto"
              ? setSelected(undefined)
              : setSelected("Home/Auto")
          }
        />
        <Text>Home/Auto</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          selected == "Legal" ? setSelected(undefined) : setSelected("Legal")
        }
        style={{
          alignItems: "center",

          flexDirection: "column",
          justifyContent: "center",
          paddingBottom: config.hp("4%"),
        }}
      >
        <BouncyCheckbox
          size={25}
          fillColor={theme.colors.primary}
          unfillColor="#FFFFFF"
          iconStyle={{ borderColor: theme.colors.primary }}
          disableBuiltInState
          disableText={true}
          isChecked={selected == "Legal" ? true : false}
          onPress={() =>
            selected == "Legal" ? setSelected(undefined) : setSelected("Legal")
          }
        />
        <Text>Legal</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          selected == "Personal"
            ? setSelected(undefined)
            : setSelected("Personal")
        }
        style={{
          alignItems: "center",

          flexDirection: "column",
          justifyContent: "center",
          paddingBottom: config.hp("4%"),
        }}
      >
        <BouncyCheckbox
          size={25}
          fillColor={theme.colors.primary}
          unfillColor="#FFFFFF"
          iconStyle={{ borderColor: theme.colors.primary }}
          disableBuiltInState
          disableText={true}
          isChecked={selected == "Personal" ? true : false}
          onPress={() =>
            selected == "Personal"
              ? setSelected(undefined)
              : setSelected("Personal")
          }
        />
        <Text>Personal</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          selected == "Taxes" ? setSelected(undefined) : setSelected("Taxes")
        }
        style={{
          alignItems: "center",

          flexDirection: "column",
          justifyContent: "center",
          paddingBottom: config.hp("4%"),
        }}
      >
        <BouncyCheckbox
          size={25}
          fillColor={theme.colors.primary}
          unfillColor="#FFFFFF"
          iconStyle={{ borderColor: theme.colors.primary }}
          disableBuiltInState
          disableText={true}
          isChecked={selected == "Taxes" ? true : false}
          onPress={() =>
            selected == "Taxes" ? setSelected(undefined) : setSelected("Taxes")
          }
        />
        <Text>Taxes</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          selected == "Trash" ? setSelected(undefined) : setSelected("Trash")
        }
        style={{
          alignItems: "center",

          flexDirection: "column",
          justifyContent: "center",
          paddingBottom: config.hp("4%"),
        }}
      >
        <BouncyCheckbox
          size={25}
          fillColor={theme.colors.primary}
          unfillColor="#FFFFFF"
          iconStyle={{ borderColor: theme.colors.primary }}
          disableBuiltInState
          disableText={true}
          isChecked={selected == "Trash" ? true : false}
          onPress={() =>
            selected == "Trash" ? setSelected(undefined) : setSelected("Trash")
          }
        />
        <Text>Trash</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CategoryCheckBox;
