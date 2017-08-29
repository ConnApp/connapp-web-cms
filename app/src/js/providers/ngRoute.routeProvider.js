import app from '../app';

angular.module( 'app' )
  .config( routeProvider );

function routeProvider( $routeProvider ) {
  $routeProvider.when( '/user/new', {
    templateUrl: '../src/partials/user-form.html',
    controller: 'newUserController',
    controllerAs: 'user'
  })
  .otherwise({
    redirectTo: '/'
  });
}
