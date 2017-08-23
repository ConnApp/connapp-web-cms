import app from '../app';

angular.module( 'app' )
  .controller(  'newUserController', newUser  )

/**
* Controller para criar novos usuários
* @memberof Users
*/
function newUser( $scope ) {
  'use strict';

  const vm = this;
  vm.hello = 'Hello John Doe';
}
