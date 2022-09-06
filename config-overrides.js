const { override, addWebpackAlias } = require("customize-cra");
const path = require("path");

module.exports = override(
  addWebpackAlias({
    "@api": path.resolve(__dirname, "./src/api"),
    "@assets": path.resolve(__dirname, "./src/assets"),
    "@components": path.resolve(__dirname, "./src/components"),
    "@pages": path.resolve(__dirname, "./src/pages"),
    "@shared": path.resolve(__dirname, "./src/shared"),
    "@store": path.resolve(__dirname, "./src/store"),
    "@utils": path.resolve(__dirname, "./src/utils"),
  })
);
