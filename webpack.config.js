const path = require("path");
const WorkerPlugin = require('worker-plugin');

module.exports = {
  entry: path.join(__dirname, "/client/index.js"),
  devtool: "source-map",
  plugins: [
    new WorkerPlugin({
      globalObject: 'self',
    })
  ],
  mode: "development",
    module: {
      rules: [
        // {
        //   test: /\.worker\.js$/,
        //   use: { loader: 'worker-loader' },
        // },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test:/\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react']
            }
          }
        },
      ]
    }
  };
  