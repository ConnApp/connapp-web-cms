
!(function( angular ) {
  if ( !angular ) throw new ReferenceError( 'angularjs 1.5+ is required' );

  'use strict';
  angular.module( 'app' )
    .controller( 'homeController', homeController );

  function homeController( session ) {
    const vm = this;

    // ===# View Model #=== //
    vm.user = session.getUser();
    vm.isAdmin = vm.user.group === 'admin';
    vm.logout = session.logout;
  }
})( angular );
