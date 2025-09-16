// babel.config.js
module.exports = function (api) {
  api.cache(true)
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // expo-router 必须有
      require.resolve("expo-router/babel"),
      "react-native-worklets/plugin",
    ],
  }
}
