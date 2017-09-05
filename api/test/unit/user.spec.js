const
  request = require( 'superagent' ),
  path = require( 'path' ),
  HOST = 'http://localhost:3000',
  user =  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@email.com',
    password: '12345678',
    group: 'admin'
  };


test( 'Teste simples para o endpoint /user/new', done => {
  request
    .post( `${ HOST }/user/new` )
    .send( user )
    .set( 'Accept', 'application/json' )
    .end(( error, res ) => {
      expect( error ).toBeFalsy();
      done();
    });

});

test( 'Teste simples para o endpoint /user/list', done => {
  request
    .get( `${ HOST }/user/list` )
    .set( 'Accept', 'application/json' )
    .end(( error, res ) => {
      console.log( res.text );
      console.log( res.text.length );
      expect( error ).toBeFalsy();
      // expect( res.text.length ).toHaveLength( 1 );
      done();
    });
});

test( 'Teste simples para o endpoint /user/remove/:email', done => {
  request
    .get( `${ HOST }/user/remove/${ user.email }` )
    .set( 'Accept', 'application/json' )
    .end(( error, res ) => {
      expect( error ).toBeFalsy();
      console.log( res.text );
      // expect( res.text.length ).toHaveLength( 1 );
      done();
    });
});
