import app from '../app';

angular.module( 'app' )
  .controller(  'newUserController', newUser  )

/**
* Controller para criar novos usuários
* @memberof app.users
*/
function newUser( $log ) {
  'use strict';

  const userVm = this;
  userVm.hello = 'Hello John Doe';
}
