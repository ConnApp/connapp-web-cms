
!( function( angular ) {
  if ( !angular ) throw new ReferenceError( 'angularjs 1.5+ is required' );
  angular.module( 'app' )
    .controller( 'sessionController', sessionController );

  function sessionController( $log, $scope, $resource ) {
    const vm = this;

    // ===# View models #=== //
    vm.authenticate = authenticate;

    function authenticate( auth ) {
      if ( $scope.formLogin.$invalid ) return;
      const
        AuthResource = $resource( '/auth/signin' ),
        authResource = new AuthResource( auth );

      authResource.$save()
        .then( serializeResponse )
        .then( createSession )
        .then( redirectToHome )
        .catch( $log.error );
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

  }
})( angular );
