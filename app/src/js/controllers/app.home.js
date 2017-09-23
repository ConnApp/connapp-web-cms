
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

    function desserializeSession() {
      const user = sessionStorage.getItem( 'user' );
      return JSON.parse( user );
    }
  }
})( angular );
