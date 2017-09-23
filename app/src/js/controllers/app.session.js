
!( function( angular ) {
  if ( !angular ) throw new ReferenceError( 'angularjs 1.5+ is required' );
  
  'use strict';
  angular.module( 'app' )
    .controller( 'sessionController', sessionController );

  function sessionController( $log, $scope, $resource ) {
    const vm = this;

    // ===# View models #=== //
    vm.authenticate = authenticate;
    vm.alert = {};

    function authenticate( auth ) {
      if ( $scope.formLogin.$invalid ) return vm.formSubmitted = true;
      const
        AuthResource = $resource( '/auth/signin' ),
        authResource = new AuthResource( auth );

      authResource.$save()
        .then( serializeResponse )
        .then( createSession )
        .then( redirectToHome )
        .catch( error => alertHandler( error.data ) );
    }

    function createSession( user ) {
      sessionStorage.setItem( 'user', user );
      return user;
    }

    function serializeResponse( { _id, firstName, lastName, group, email } ) {
      return JSON.stringify( { _id, firstName, lastName, group, email } );
    }

    function redirectToHome() {
      location.pathname = '/';
    }

    function alertHandler( { message = 'Erro inesperado ao tentar realizar login', type =  'alert-danger' } ) {
      $scope.alert = { message, type };
    }

  }
})( angular );
