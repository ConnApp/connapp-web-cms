const
  express = require( 'express' ),
  path = require( 'path' ),
  consign = require( 'consign' )
  bodyParser = require( 'body-parser' );

module.exports = (function() {
  const
    PORT = process.env.PORT || 3000,
    ROOT_PATH = process.env.PWD;

  let app = express();

  // ===# Set engine and views directory #=== //
  app.set( 'views', path.join( ROOT_PATH, 'app/src' ) );
  app.set ( 'view engine', 'html' );

  // ===# Set port #=== //
  app.set( 'port', PORT );

  // ===# Set public directory #=== //
  app.use( express.static( path.join( ROOT_PATH, 'app/src' ) ) );

  // ===# Middlewares setup #=== //
  app.use( bodyParser.urlencoded( { extended: true } ) );
  app.use ( bodyParser.json() );

  consign( { cwd: path.join( ROOT_PATH, 'api' ) } )
    .include( 'models' )
    .then( 'controllers' )
    .then( 'routes' )
    .into( app );

  return app;
})();
