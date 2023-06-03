
module.exports = {
  // other webpack configurations...
  resolve: {
    fallback: {
      buffer: require.resolve("buffer/"),
      crypto: require.resolve("crypto-browserify"),
      stream: require.resolve("stream-browserify"),
      util: require.resolve("util/"),
    },
    extensions: [".js", ".jsx"], // Add .jsx extension to resolve JSX files
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react"], // Add preset for React
          },
        },
      },
      // other rules...
    ],
  },

  // other webpack configurations...
};
