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


test( 'Teste simples para o endpoint POST /user', done => {
  request
    .post( `${ HOST }/user` )
    .send( user )
    .set( 'Accept', 'application/json' )
    .end(( error, res ) => {
      expect( error ).toBeFalsy();
      expect( res.error ).toBeFalsy();
      expect( res.text ).toBeTruthy();
      done();
    });

});

test( 'Teste simples para o endpoint GET /user', done => {
  request
    .get( `${ HOST }/user` )
    .set( 'Accept', 'application/json' )
    .end( ( error, res ) => {
      expect( error ).toBeFalsy();
      expect( res.error ).toBeFalsy();
      expect( res.text ).toBeTruthy();
      done();
    });
});

test( 'Teste simples para o endpoint PUT /user', done => {
  // update only the property lastName
  user.lastName = 'S. Doe';

  request
    .put( `${ HOST }/user` )
    .send( user )
    .set( 'Accept', 'application/json' )
    .end( ( error, res ) => {
      expect( error ).toBeFalsy();
      expect( res.error ).toBeFalsy();
      expect( res.text ).toBeTruthy();
      done();
    });

});

test( 'Teste simples para o endpoint DELETE /user', done => {
  request
    .delete( `${ HOST }/user` )
    .send( { email: user.email } )
    .set( 'Accept', 'application/json' )
    .end(( error, res ) => {
      expect( error ).toBeFalsy();
      expect( res.error ).toBeFalsy();
      expect( res.text ).toBeTruthy();
      done();
    });
});
