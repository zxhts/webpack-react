/* eslint-disable global-require */
const glob = require("glob");
const path = require("path");
// const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
// eslint-disable-next-line no-unused-vars
const HtmlWebpackExternalsPlugin = require("html-webpack-externals-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// 擦除无效的CSS文件
const PurgecssPlugin = require('purgecss-webpack-plugin');
const PATHS = {
  src: path.join(__dirname, 'src')
};

/** 读取.env文件的配置 */
const dotenv = require("dotenv");
dotenv.config();

const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugins = [];
  // 读取文件路径
  const entryFiles = glob.sync(path.join(__dirname, "./multiPage/*/index.js"));


  Object.keys(entryFiles)
    .map((index) => {
      const entryFile = entryFiles[index];

      const match = entryFile.match(/multiPage\/(.*)\/index\.js/);
      const pageName = match && match[1];
      entry[pageName] = entryFile;
      htmlWebpackPlugins.push(
        new HtmlWebpackPlugin({
          inlineSource: ".css$",
          template: path.join(__dirname, `multiPage/${pageName}/index.html`),
          filename: `${pageName}.html`,
          chunks: ["commons", pageName],
          inject: true,
          minify: {
            html5: true,
            collapseWhitespace: true,
            preserveLineBreaks: false,
            minifyCSS: true,
            minifyJS: true,
            removeComments: false,
          },
        }),
      );
    });

  return {
    entry,
    htmlWebpackPlugins,
  };
};

const { entry, htmlWebpackPlugins } = setMPA();

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  // 配置环境
  mode: 'development', // 不配置mode,默认模式是生产环境production
  // watch: true,
  context: process.cwd(), // 上下文 项目打包的相对路径

  devtool: 'source-map',

  // 配置入口
  entry: {
    index: path.join(__dirname, "./src/index.js"),
    // index: "./multiPage/index/index.js",
    // search: "./multiPage/search/index.js"
  },
  // entry,
  // 配置成了数组，只输出一个出口文件
  // entry: [path.join(__dirname, "./src/index.js"), './test.js'],
  // 配置出口
  output: {
    path: path.join(__dirname, "./dist"), // 这要求绝对路径， 必须引入path包
    filename: "[name]-[chunkhash:8].js", // 可以写成这种，生成8位数的hash值，防止浏览器缓存
  },
  resolve: {
    extensions: [".ts", ".tsx", ".json", ".js"],
    alias: {
      // "@components": __dirname + "/src/components",
      "@page": __dirname+ "/src/page",
      // "react": path.join(__dirname, 'node_modules/react/umd/react.production.min.js')
    },
    plugins: [
      new TsconfigPathsPlugin({ configFile: path.join(__dirname, "tsconfig.json") }),
    ],
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
        use: ["babel-loader"],
        exclude: /node_modules/,
        // options: {
        //   presets: ["@babel/react", "@babel/env"],
        //   plugins: [
        //     ["@babel/plugin-proposal-decorators", {"decoratorsBeforeExport": true}],
        //     ["@babel/plugin-proposal-private-property-in-object", { "loose": true }],
        //     ["@babel/plugin-proposal-private-methods", { "loose": true }],
        //     ["@babel/plugin-proposal-class-properties", { "loose": true }]
        //   ]
        // }
      },
      {
        test: /\.css$/,
        // loaders: ["style-loader", "css-loader"],
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [
                // eslint-disable-next-line global-require
                require("autoprefixer")({
                  // browsers: ["last 2 version", "> 1%", "iOS 7"]
                }),
              ],
            },
          },
          {
            loader: "px2rem-loader",
            options: {
              remUnit: 37.5,
              remPrecision: 8,
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          // "style-loader", 
          MiniCssExtractPlugin.loader,
          "css-loader", 
          "less-loader"
        ],
      },
      {
        test: /\.(png|jpg|gif|svg|ico)$/,
        use: [
          {
            // loader: "url-loader",
            // options: {
            //   limit: 10240,
            // },
            loader: "file-loader",
            options: {
              name: "[name]_[contenthash:8].[ext]",
            },
          },
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75
              }
            }
          }
      ],
      },
    ],
  },

   // 配置server
  devServer: {
    contentBase: path.join(__dirname, "./dist"), // 服务器根
    compress: true, // 是否压缩
    port: process.env.PORT,
    // hot: true
    proxy: {
      '/download': {
        target: 'https://db-manage-dev.chanjet.com.cn',
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/download': ""
        }
      }
    },
    // stats: "errors-only"
    quiet: true
  },
  // 配置插件
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "./public/index.html"),
      filename: "index.html", //打包完之后的文件名
      inject: true, //js注入到哪里head还是body,true表示注入body里
      chunks: ["index"],
      // favicon: "./public/favicon.ico",
      minify: {
        html5: true,
        collapseWhitespace: false, //折叠空白
        preserveLineBreaks: false,
        minifyCSS: false,
        minifyJS: true,
        removeComments: true
      }
    }),
    // new HtmlWebpackPlugin({
    //   template: path.join(__dirname, "./multiPage/search/index.html"),
    //   filename: "search.html", //打包完之后的文件名
    //   inject: true, //js注入到哪里head还是body,true表示注入body里
    //   chunks: ["search"],
    //   // favicon: "./public/favicon.ico",
    //   minify: {
    //     html5: true,
    //     collapseWhitespace: false, //折叠空白
    //     preserveLineBreaks: false,
    //     minifyCSS: true,
    //     minifyJS: true,
    //     removeComments: true
    //   }
    // }),

    new CopyPlugin({
      // 复制插件，表示把当前文件的ico文件复制到dist文件夹下(服务器的根路径下)
      patterns: [
        {
          from: "./public/favicon.ico",
          // to: path.join(__dirname, './dist/favicon.ico'),
          to: "./", // ./表示的就是dist文件的下一层
        },
        {
          context: "./public",
          from: "*.png",
          // to: path.join(__dirname, './dist/favicon.ico'),
          to: "./", // ./表示的就是dist文件的下一层
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: "[name]-[contenthash:8].css",
    }),
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require("cssnano"),
    }),
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [`You application is running here http://localhost:${process.env.PORT}`],
      },
      clearConsole: true
    }),
    // new BundleAnalyzerPlugin(),
    function() {
      this.hooks.done.tap('done', (stats) => {
          if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') == -1)
          {
              console.log('build error');
              process.exit(3);
          }
      })
    },   
    
    // 擦除无效的css
    new PurgecssPlugin({
      paths: glob.sync(`${PATHS.src}/**/*`,  { nodir: true }),
    })

    // new webpack.optimize.ModuleConcatenationPlu gin()
    // new HtmlWebpackExternalsPlugin({
    //   externals: [
    //     {
    //       module: 'react',
    //       entry: 'https://now8.gtimg.com/now/lib/16.8.6/react.min.js',
    //       global: 'React',
    //     },
    //     {
    //       module: 'react-dom',
    //       entry: '',
    //       global: 'ReactDOM',
    //     },
    //   ]
    // }),
  ],
  // .concat(htmlWebpackPlugins),


  optimization: {
    splitChunks: {
      minSize: 50,
      cacheGroups: {
        commons: {
          // test: /(react|react-dom)/,
          name: "commons",
          chunks: "all",
          minChunks: 2,
        },
      },
    },
  },
  stats: "errors-only"
};
