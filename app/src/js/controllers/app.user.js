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
  function newUser( $log, $scope, $resource, $routeParams ) {
    const 
      vm = this,
      { _id } = $routeParams,
      UserResource = $resource( '/users', null,  { update: { method: 'PUT' } } );
    
    // ===# View Model #=== //
    vm.user = {};
    vm.submitForm = submitForm;

    if ( _id ) {
      getUser( _id );
    }

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

    function getUser( _id ) {
      const UserResource = $resource( '/users/:_id' );

      UserResource.get( { _id } )
        .$promise.then( user => {
          angular.merge( vm.user, user );
        })
        .catch( $log.error );
    }
  }
  /**
   * Controller para listar todos os usuários ativos.
   * @memberof app.user
   */
  function listUser( $log, $resource, $location ) {
    const 
      vm = this,
      user = {},
      userResource = $resource( '/users' );
    
    // ===# View models #=== //
    vm.orderBy = 'firstName';
    vm.setCurrentUser = setCurrentUser;
    vm.redirectToForm = redirectToForm;

    // ===# Carga inicial #=== //
    vm.users = listUsers();

    /**
     * Função realiza um requisição no endpoint /users e retorna uma lista de usuários
     * @method GET
     * @type {Function}
     * @return {Array}
     */
    function listUsers() {
      return userResource.query();
    }
    /**
     * Função define um usuário global.
     * @type {Function}
     * @param {Object} user
     */
    function setCurrentUser( _user ) {
      angular.merge( user, _user );
    }
    /**
     * Função retorna um usuário
     * @type {Function}
     * @private
     * @return {Object} vm.user
     */
    function getCurrentUser() {
      return user;
    }
    /**
     * Função redireciona para o formulário de usuários.
     * @type {Function} 
     */
    function redirectToForm() {
      const { _id } = getCurrentUser();
      $location.path( `/user/form/${ _id }` );
    }
  }

})( angular );

