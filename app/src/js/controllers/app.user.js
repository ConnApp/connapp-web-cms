!(function( angular ) {
  if ( !angular ) throw new ReferenceError( 'angular 1.5.x is required' );

  'use strict';
  angular.module( 'app' )
    .controller(  'newUserController', newUser  )
    .controller( 'listUserController', listUser );
  
  /**
  * Controller para criar novos usuários
  * @memberof app.user
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
  /**
   * Controller para listar todos os usuários ativos.
   * @memberof app.user
   */
  function listUser( $log, $resource ) {
    const 
      vm = this,
      userResource = $resource( '/users' );
    
    vm.orderBy = 'firstName';

    // ===# Carga inicial #=== //
    vm.users = listUsers();

    function listUsers() {
      return userResource.query();
    }
  }

})( angular );

