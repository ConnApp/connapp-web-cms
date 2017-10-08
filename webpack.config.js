const path = require( 'path' );

module.exports = {
  entry: path.resolve( 'app/src/index.js' ),
  output: {
    filename: 'bundle.js',
    path: path.resolve( 'app/dist')
  },
  devServer: {
    contentBase: path.resolve( 'app')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components|api|lib)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [ 'env' ],
            plugins: [ require( 'babel-plugin-transform-object-rest-spread' ) ]
          }
        }
      }
    ]
  }
};
