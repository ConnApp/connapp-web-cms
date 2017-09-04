const
  request = require( 'superagent' ),
  path = require( 'path' ),
  HOST = 'http://localhost:3000';


test( 'Teste para o endpoint /user/new', done => {
  const user =  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@email.com',
    password: '12345678',
    group: 'admin'
  };

  request
    .post( `${ HOST }/user/new` )
    .send( user )
    .set( 'Accept', 'application/json' )
    .end(( error, res ) => {
      if ( error ) throw error;

      done();
    });
});
