
!( function( angular ) {
  if ( !angular ) throw new ReferenceError( 'angularjs 1.5+ is required' );
  
  'use strict';
  angular.module( 'app' )
    .controller( 'sessionController', sessionController );

  function sessionController( $log, $scope, $resource, session ) {
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
        .then( session.login )
        .catch( error => alertHandler( error.data ) );
    }

    function alertHandler( { message = 'Erro inesperado ao tentar realizar login', type =  'alert-danger' } ) {
      $scope.alert = { message, type };
    }

  }
})( angular );
