const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
  //配置环境
  mode: "development", //不配置mode,默认模式是生产环境production

  devtool: "#source-map",

  // 配置入口
  entry: {
    app: path.join(__dirname, "./src/index.js"),
  },
  //配置出口
  output: {
    path: path.join(__dirname, "./dist"), //这要求绝对路径， 必须引入path包
    filename: "[name]-[hash:8].js", //可以写成这种，生成8位数的hash值，防止浏览器缓存
  },
  resolve: {
    extensions: [".ts", ".tsx", ".json", ".js"],
    alias: {
      // "@components": __dirname + "/src/components",
      // "@page": __dirname+ "/src/page"
    },
    plugins: [
      new TsconfigPathsPlugin({configFile: path.join(__dirname, "tsconfig.json")})
    ]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          // 指定特定的ts编译配置，为了区分脚本的ts配置
          configFile: path.resolve(__dirname, "./tsconfig.json"),
        },
      },
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/react", "@babel/env"],
          plugins: [
            ["@babel/plugin-proposal-decorators", {"decoratorsBeforeExport": true}],
            ["@babel/plugin-proposal-private-property-in-object", { "loose": true }],
            ["@babel/plugin-proposal-private-methods", { "loose": true }],
            ["@babel/plugin-proposal-class-properties", { "loose": true }]
          ]
		    }
      },
      {
        test: /\.css$/,
        loaders: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|gif|svg|ico)$/,
        loader: "url-loader",
        options: {
          limit: 8192,
        },
      },
    ],
  },
  // 配置插件
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "./public/index.html"),
      filename: "index.html", //打包完之后的文件名
      inject: true, //js注入到哪里head还是body,true表示注入body里
    }),
    new CopyPlugin({
      //复制插件，表示把当前文件的ico文件复制到dist文件夹下(服务器的根路径下)
      patterns: [
        {
          from: "./public/favicon.ico",
          // to: path.join(__dirname, './dist/favicon.ico'),
          to: "./", // ./表示的就是dist文件的下一层
        },
      ],
    }),
    new CleanWebpackPlugin(),
  ],
  // 配置server
  devServer: {
    contentBase: path.join(__dirname, "./dist"), // 服务器根
    compress: true, // 是否压缩
    port: 8846,
  },
};
