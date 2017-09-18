!(function( angular ) {
  if ( !angular ) throw new ReferenceError( 'angular 1.5.x is required' );
  
  angular.module( 'app' )
    .config( routeProvider );

  function routeProvider( $routeProvider ) {
    $routeProvider
      .when( '/user/new', {
        templateUrl: '../src/partials/user-form.html',
        controller: 'newUserController',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/'
      });
  }
})( angular );


