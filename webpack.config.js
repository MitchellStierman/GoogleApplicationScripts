const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    main: path.resolve('./src', 'app.ts'),
  },
  module: {
    rules: [
      {
        test: /\.(ts)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: 'tsconfig.webpack.json',
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '0.bundle.js',
    library: {
      name: 'library',
      type: 'var',
    },
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          mangle: { toplevel: true },
          compress: { passes: 2 },
        },
      }),
    ],
  },
};
