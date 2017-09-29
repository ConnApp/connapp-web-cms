!(function( angular) {
  if ( !angular ) throw new ReferenceError( 'angularjs 1.5+ is required' );

  'use strict';
  angular.module( 'app' )
    .factory( 'session', sessionService );

  function sessionService() {

    function getUser() {
      return deserialize( 'user' );
    }

    function logout() {
      destroyAll();
      location.href = '/auth/signin';
    }

    function login( user ) {
      if ( !user ) return new ReferenceError( 'an user object is required' );
      serialize( 'user', user );
      location.pathname = '/';
    }
    
    function deserialize( key ) {
      if ( !key ) throw new ReferenceError( 'argument key is required' );
      const storage = localStorage.getItem( key );
      return JSON.parse( storage );
    }

    function serialize( key, value ) {
      if ( !( key || value ) ) throw new ReferenceError( 'a key and value is required' );
      if ( typeof value !== 'object' ) return localStorage.setItem( key, value );
      localStorage.setItem( key, JSON.stringify( value ) );
    }

    function destroy( key ) {
      if ( !key ) throw new ReferenceError( 'argument key is required' );
      localStorage.removeItem( key );
    }

    function destroyAll() {
      localStorage.clear();
    }

    return {
      deserialize,
      serialize,
      destroy,
      destroyAll,
      getUser,
      logout,
      login
    };
  }
})( angular );