const request = require( 'superagent' );


test( 'Teste para o endpoint /user/new', done => {
  const user =  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@email.com',
    password: '123456',
    group: 'admin'
  };

  request
    .post( 'http://localhost:3000/user/new' )
    .send( user )
    .set( 'Accept', 'application/json' )
    .end(( error, res ) => {
      if ( error ) throw error;

      console.log( res );
      done()
    })
});
