
!(function( angular ) {
  if ( !angular ) throw new ReferenceError( 'angularjs 1.5+ is required' );

  'use strict';
  angular.module( 'app' )
    .controller( 'homeController', homeController );

  function homeController() {
    const vm = this;

    // ===# View Model #=== //
    vm.user = desserializeSession();
    vm.isAdmin = vm.user.group === 'admin';
    vm.destroySession = destroySession;

    function desserializeSession() {
      const user = localStorage.getItem( 'user' );
      return JSON.parse( user );
    }

    function destroySession() {
      localStorage.clear();
      location.href = '/auth/signout';
    }
  }
})( angular );
