
!( function( angular ) {
  if ( !angular ) throw new ReferenceError( 'angularjs 1.5+ is required' );
  
  'use strict';
  angular.module( 'app' )
    .controller( 'sessionController', sessionController );

  function sessionController( $log, $scope, DataResource, session ) {
    const 
      vm = this,
      authResource = new DataResource( '/auth/signin' );

    // ===# View models #=== //
    vm.authenticate = authenticate;
    vm.alert = {};

    function authenticate( auth ) {
      if ( $scope.formLogin.$invalid ) return;

      authResource
        .save( auth )
        .then( session.login )
        .catch( error => alertHandler( error.data ) );
    }

    function alertHandler( { message = 'Erro inesperado ao tentar realizar login', type =  'alert-danger' } ) {
      $scope.alert = { message, type };
    }

  }
})( angular );
