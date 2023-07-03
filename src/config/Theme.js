import { DefaultTheme, DarkTheme } from "react-native-paper";

//

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#0b3b60", //"#0EA44B",
    primaryLight: "#1365a5", //"rgba(14, 164, 75, 0.4)",
    primaryDark: "#082d49", //"#00680f",

    fadedBackground: "#F4F4F4",
    fadedLight: "#ededed",
    faded: "rgba(168, 168, 168, 0.8)",
    fadedDark: "#5F5F60",
    danger: "#ffb300",
    yellow: "#ffb300",
    white: "white",
    inActive: "rgba(168, 168, 168, 0.8)",
    green: "#64dd17",
    red: "#f44336",
  },
};

export const lightTheme = {
  //   ...DefaultTheme,
  //   dark: false,
  //   roundness: 5,
  //   colors: {
  //     primary: "#549FFC",
  //     accent: "#B6CDFE",
  //     hint: "#D0D0D0",
  //     background: "white",
  //     surface: "#CFDEFF",
  //     active: "#5FDBA7",
  //     error: "#B00020",
  //     text: "black",
  //     textInverted: "white",
  //     onBackground: "#000000",
  //     onSurface: "#000000",
  //     disabled: "#777777",
  //     placeholder: "#777777",
  //     backdrop: "rgba(0,0,0,0.5)",
  //     notification: "#EC407A",
  //   },
  // };
  // export const darkTheme = {
  //   ...DarkTheme,
  //   dark: true,
  //   roundness: 5,
  //   colors: {
  //     primary: "#549FFC",
  //     accent: "#314D76",
  //     hint: "#292929",
  //     background: "black",
  //     surface: "#24344E",
  //     active: "#5FDBA7",
  //     error: "#CF6679",
  //     text: "white",
  //     textInverted: "black",
  //     onBackground: "#FFFFFF",
  //     onSurface: "#FFFFFF",
  //     disabled: "#777777",
  //     placeholder: "#777777",
  //     backdrop: "rgba(0,0,0,0.5)",
  //     notification: "#F8BBD0",
  //   },
  //
};
