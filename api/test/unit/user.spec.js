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


test( 'Teste simples para o endpoint /user/new', done => {
  request
    .post( `${ HOST }/user/new` )
    .send( user )
    .set( 'Accept', 'application/json' )
    .end(( error, res ) => {
      // expect( error ).toBeFalsy();
      done();
    });

});

test( 'Teste simples para o endpoint /user/list', done => {
  request
    .get( `${ HOST }/user/list` )
    .set( 'Accept', 'application/json' )
    .end(( error, res ) => {
      // expect( error ).toBeFalsy();
      // expect( res.text.length ).toHaveLength( 1 );
      done();
    });
});

test( 'Teste simples para o endpoint /user/disable/:email', done => {
  request
    .get( `${ HOST }/user/disable/${ user.email }` )
    .set( 'Accept', 'application/json' )
    .end(( error, res ) => {
      // expect( error ).toBeFalsy();
      done();
    });
});

test( 'Teste simples para o endpoint /user/update', done => {
  // update only the property lastName
  user.lastName = 'S. Doe';

  request
    .post( `${ HOST }/user/update` )
    .send( user )
    .set( 'Accept', 'application/json' )
    .end(( error, res ) => {
      // expect( error ).toBeFalsy();
      done();
    });

});

// test( 'Teste simples para o endpoint /user/remove/:email', done => {
//   request
//     .get( `${ HOST }/user/remove/${ user.email }` )
//     .set( 'Accept', 'application/json' )
//     .end(( error, res ) => {
//       // expect( error ).toBeFalsy();
//       done();
//     });
// });
