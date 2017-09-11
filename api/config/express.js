const
  express = require( 'express' ),
  session = require( 'express-session' ),
  methodOverride = require( 'method-override' ),
  path = require( 'path' ),
  consign = require( 'consign' ),
  bodyParser = require( 'body-parser' ),
  databaseConnection = require( './mongoose' );

module.exports = (function() {
  const
    app = express(),
    PORT = process.env.PORT || 3000,
    ROOT_PATH = process.env.PWD;

  // ===# Set engine and views directory #=== //
  app.set( 'views', path.join( ROOT_PATH, 'app' ) );
  app.set ( 'view engine', 'html' );

  // ===# Set port #=== //
  app.set( 'port', PORT );

  // ===# Set public directory #=== //
  app.use( express.static( path.join( ROOT_PATH, 'app' ) ) );

  // ===# Middlewares setup #=== //
  app.use( bodyParser.urlencoded( { extended: true } ) );
  app.use ( bodyParser.json() );
  app.use( session( { name: 'connapp', secret: 'super_secret', saveUninitialized: false } ) );
  app.use( methodOverride( 'X-HTTP-Method' ) );
  app.use( methodOverride( 'X-HTTP-Method-Override' ) );
  app.use( methodOverride( 'X-Method-Override' ) );

  consign( { cwd: path.join( ROOT_PATH, 'api' ) } )
    .then( 'models' )
    .then( 'controllers' )
    .then( 'routes' )
    .into( app );

  // ===# Connect database #=== //
  databaseConnection( 'mongodb://super:admin@ds149763.mlab.com:49763/connapp-web-cms' );

  return app;
})();
