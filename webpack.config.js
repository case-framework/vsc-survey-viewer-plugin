const path = require("path");

module.exports = {
  entry: {
    surveyViewerDefaultTheme: "./src/view/app/IndexFilesWithDifferentThemes/indexWithDefaultTheme.tsx",
    surveyViewerWithTekenradarTheme: "./src/view/app/IndexFilesWithDifferentThemes/indexWithTekenradarTheme.tsx"
  },
  output: {
    path: path.resolve(__dirname, "surveyViewer"),
    filename: "[name].js"
  },
  devtool: "eval-source-map",
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".json", ".scss", "woff2"]
  },
  module: {
    rules: [
      {
        test: /\.(jpg|png|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[hash].[ext]',
        },
        test: /\.(ts|tsx)$/,
        loader: "ts-loader",
        options: {}
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name][ext][query]",
        },
      },
      {
        test: /\.(scss)$/,
  use: [{
    loader: 'style-loader'
  }, {
    loader: 'css-loader'
  }, {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        plugins: function () {
          return [
            require('autoprefixer')
          ];
        }
      }
    }
  }, {
    loader: 'resolve-url-loader',
    options: {}
  }, {
    loader: 'sass-loader',
    options: {
      sourceMap: true, // <-- !!IMPORTANT!!
    }
  }]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          }
        ]
      }
    ]
  },
  performance: {
    hints: false
  },
  devServer: {

    historyApiFallback: true
}
};
