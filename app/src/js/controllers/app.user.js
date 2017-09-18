!(function( angular ) {
  if ( !angular ) throw new ReferenceError( 'angular 1.5.x is required' );

  'use strict';
  angular.module( 'app' )
    .controller(  'newUserController', newUser  );
  
  /**
  * Controller para criar novos usuários
  * @memberof app.users
  */
  function newUser( $log, $scope, $resource ) {
    const 
      vm = this,
      UserResource = $resource( '/users' );
    
    // ===# View Model #=== //
    vm.submitForm = submitForm;

    function submitForm( user ) {
      const userResource = new UserResource();
      if ( $scope.userForm.$valid ) {
        angular.merge( userResource, user );
        userResource.$save()
          .then( $log.info )
          .catch( error => {
            throw error; 
          });
      }
    }
  }

})( angular );

