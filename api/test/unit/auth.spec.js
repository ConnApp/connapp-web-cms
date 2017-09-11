const
  request = require( 'superagent' ),
  HOST = 'http://localhost:3000',
  user =  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@email.com',
    password: '12345678',
    group: 'admin'
  };

test( 'Teste simples para o endpoint /auth/signin', done => {
  // update only the property lastName
  const authData = {
    email: user.email,
    password: user.password
  }

  request
    .post( `${ HOST }/auth/signin` )
    .send( authData )
    .set( 'Accept', 'application/json' )
    .end( ( error, res ) => {
      expect( error ).toBeFalsy();
      expect( res.error ).toBeFalsy();
      expect( res.text ).toBeTruthy();
      done();
    });

});