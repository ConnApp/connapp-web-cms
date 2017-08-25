const path = require( 'path' );

module.exports = {
  entry: path.resolve( 'app/src/index.js' ),
  output: {
    filename: 'bundle.js',
    path: path.resolve( 'app/dist')
  },
  devServer: {
    contentBase: path.resolve( 'app')
  }
}
