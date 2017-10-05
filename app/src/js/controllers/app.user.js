!(function( angular ) {
  if ( !angular ) throw new ReferenceError( 'angular 1.5.x is required' );

  'use strict';
  angular.module( 'app' )
    .controller(  'newUserController', newUser  )
    .controller( 'listUserController', listUser )
    .controller( 'updateUserController', updateUserController )
    .controller( 'resetUserPasswordController', resetUserPasswordController );
  
  /**
  * Controller para criar novos usuários
  * @memberof app.user
  */
  function newUser( $log, $scope, $timeout, DataResource, uiAlert) {
    const 
      vm = this,
      userResource = new DataResource( '/users', '/:_id' );
    
    // ===# View Model #=== //
    vm.user = {};
    vm.alert = {};
    vm.alertEmiter = uiAlert( vm.alert );
    vm.submitForm = submitForm;

    // ===# Set form validations #=== //
    $timeout(() => {
      $scope.userForm.emailConfirm.$validators.isEqual = compareEmailFields;
    });

    function compareEmailFields( modelValue, viewValue ) {
      const email = modelValue || viewValue;
      return email === vm.user.email;
    }

    // ===# Setup #=== //
    function submitForm( user ) {
      if ( $scope.userForm.$invalid ) return;

      userResource
        .save( user )
        .then( cleanUserModel )
        .then( () => vm.alertEmiter.success( 'Usuário cadastrado com sucesso!' ) )
        .catch( error => vm.alertEmiter.danger( error.data.message ) );
    }

    function cleanUserModel() {
      vm.user = {};
      $scope.userForm.$setPristine( true );
      return vm.user;
    }
  }
  /**
   * 
   */
  function updateUserController( $scope, $log, $routeParams, DataResource, uiAlert, session ) {
    const
      vm = this,
      userResource = new DataResource( '/users', '/:_id' ),
      { _id } = $routeParams;
    
    // ===# View Model #=== //
    vm.user = {};
    vm.isAdmin = vm.user.group === 'admin';
    vm.alert = {};
    vm.alertEmiter = uiAlert( vm.alert );
    vm.submitChanges = submitChanges;

    // ===# Carga inicial #=== //
    userResource
      .get( _id )
      .$promise
      .then( user => vm.user = user )
      .catch( $log.error );

    /**
     * 
     * @param {Object} user 
     */
    function submitChanges( user ) {
      if ( $scope.userChanges.$invalid ) return;

      userResource
        .update( user )
        .then( session.setUser( user ) )
        .then( () => vm.alertEmiter.success( 'Dados alterado com sucesso!' ) )
        .catch( error => vm.alertEmiter.danger( error.data.message ) );
    }
  }
  /**
   * 
   */
  function resetUserPasswordController( $scope, $routeParams, $timeout, DataResource ) {
    const 
      vm = this,
      userResource = new DataResource( '/users', '/:_id' );

    // ===# View Models #=== //
    vm.user = {};
    vm.user._id = $routeParams._id;
    vm.alert = {};
    vm.submitChanges = submitChanges;
    vm.comparePasswordFields = comparePasswordFields;

    // ===# Set form validation # === //
    $timeout( () => {
      $scope.resetPassword.confirmPassword.$validators.isEqual = comparePasswordFields;
    });
    
    function comparePasswordFields( modelValue, viewValue ) {
      const password = modelValue || viewValue;
      return password === vm.user.password;
    }

    // ===# Setup #=== //
    function submitChanges( user ) {
      if ( $scope.resetPassword.$invalid ) return;

      userResource
        .update( user )
        .then( successAlert )
        .catch( error => errorAlert( error.data ) );
    }

    function errorAlert( { message } ) {
      vm.alert = { message, type: 'alert-danger' };
    }

    function successAlert() {
      vm.alert = { message: 'Senha alterada com sucesso!', type: 'alert-success' };
    }

  }
  /**
   * Controller para listar todos os usuários ativos.
   * @memberof app.user
   */
  function listUser( $log, $location, $scope, DataResource ) {
    const 
      vm = this,
      user = {},
      userResource = new DataResource( '/users' ); 
    
    // ===# View models #=== //
    vm.orderBy = 'firstName';
    vm.setCurrentUser = setCurrentUser;
    vm.redirectToForm = redirectToForm;

    // ===# Carga inicial #=== //
    vm.users = userResource.query();

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

    // ===# infinite scroll test #=== //
    vm.nextPage = nextPage;
    const users = [
      { _id: '1', firstName: 'test1', lastName: 'test1', email: 'test1@email.com', group: 'user' },
      { _id: '2', firstName: 'test1', lastName: 'test1', email: 'test1@email.com', group: 'user' },
      { _id: '3', firstName: 'test1', lastName: 'test1', email: 'test1@email.com', group: 'user' },
      { _id: '4', firstName: 'test1', lastName: 'test1', email: 'test1@email.com', group: 'user' },
      { _id: '5', firstName: 'test1', lastName: 'test1', email: 'test1@email.com', group: 'user' },
      { _id: '6', firstName: 'test1', lastName: 'test1', email: 'test1@email.com', group: 'user' },
      { _id: '7', firstName: 'test1', lastName: 'test1', email: 'test1@email.com', group: 'user' },
      { _id: '8', firstName: 'test1', lastName: 'test1', email: 'test1@email.com', group: 'user' },
      { _id: '9', firstName: 'test1', lastName: 'test1', email: 'test1@email.com', group: 'user' },
      { _id: '10', firstName: 'test1', lastName: 'test1', email: 'test1@email.com', group: 'user' },
      { _id: '11', firstName: 'test1', lastName: 'test1', email: 'test1@email.com', group: 'user' },
      { _id: '12', firstName: 'test1', lastName: 'test1', email: 'test1@email.com', group: 'user' },
      { _id: '13', firstName: 'test1', lastName: 'test1', email: 'test1@email.com', group: 'user' },
      { _id: '14', firstName: 'test1', lastName: 'test1', email: 'test1@email.com', group: 'user' },
      { _id: '15', firstName: 'test1', lastName: 'test1', email: 'test1@email.com', group: 'user' },
      { _id: '16', firstName: 'test1', lastName: 'test1', email: 'test1@email.com', group: 'user' },
      { _id: '17', firstName: 'test1', lastName: 'test1', email: 'test1@email.com', group: 'user' },
      { _id: '18', firstName: 'test1', lastName: 'test1', email: 'test1@email.com', group: 'user' },
      { _id: '19', firstName: 'test1', lastName: 'test1', email: 'test1@email.com', group: 'user' },
      { _id: '20', firstName: 'test1', lastName: 'test1', email: 'test1@email.com', group: 'user' },
      { _id: '21', firstName: 'test1', lastName: 'test1', email: 'test1@email.com', group: 'user' }
    ];

    let count = 0;
    function nextPage() {
      count++;
      if ( count < users.length ) {
        vm.users.push( users[ count ] );
      }
    }
  }

})( angular );

