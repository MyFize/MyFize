const path = require('path');

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'build'), 
    filename: 'bundle.js'
  },
  devServer: {
    publicPath: '/build/',
    proxy: {
      '/test' : 'http://localhost:3000',
      '/bcrypt': 'http://localhost:3000',
    },
    historyApiFallback: true, // added this to be able to use Switch in reactRouter
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,  
        exclude: /(node_modules)/, 
        use: {
          loader: 'babel-loader', 
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.s[ac]ss$/i, // /\.s?css/ 
        use: ['style-loader', 'css-loader', 'sass-loader',
          {
            loader: "sass-loader",
            options: {
              // Prefer `dart-sass`
              implementation: require("sass"),
            },
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  mode: process.env.NODE_ENV,
};
