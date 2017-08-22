const app = require( './api/config/express' );

app.listen( app.get( 'port' ), () => console.log( `server online. Listening on ${app.get( 'port' )}` ) );
