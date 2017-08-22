const path = require( 'path' );

module.exports = {
  entry: path.resolve( 'app/src/app.js' ),
  output: {
    filename: 'bundle.js',
    path: path.resolve( 'app/dist')
  }
}
