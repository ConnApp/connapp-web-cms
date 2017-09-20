!(function( angular ) {
  if ( !angular ) throw new ReferenceError( 'angular 1.5.x is required' );
  
  angular.module( 'app' )
    .config( routeProvider );

  function routeProvider( $routeProvider ) {
    $routeProvider
      .when( '/user/form', {
        templateUrl: '../src/partials/user-form.html',
        controller: 'newUserController',
        controllerAs: 'vm'
      })
      .when( '/user/list', {
        templateUrl: '../src/partials/user-table.html',
        controller: 'listUserController',
        controllerAs: 'vm'
      })
      .when( '/user/settings/:_id', {
        templateUrl: '../src/partials/user-settings.html',
        controller: 'updateUserController',
        controllerAs: 'vm'
      })
      .when( '/user/settings/:_id/reset', {
        templateUrl: '../src/partials/user-settings-reset.html',
        controller: 'resetUserPasswordController',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/'
      });
  }
})( angular );


