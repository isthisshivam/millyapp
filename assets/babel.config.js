module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    sourceMaps: "inline",
    retainLines: true,
    plugins: ["react-native-reanimated/plugin"],
  };
};
