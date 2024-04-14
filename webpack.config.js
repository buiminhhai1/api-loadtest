const path = require("path");

module.exports = (env) => ({
  mode: "production",
  entry: {
    runner: "./runner.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"), // eslint-disable-line
    publicPath: "",
    libraryTarget: "commonjs",
    filename: "[name].bundle.js",
  },
  module: {
    rules: [{ test: /\.js$/, use: "babel-loader" }],
  },
  target: "web",
  externals: /k6(\/.*)?/,
});
