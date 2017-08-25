import app from '../app';

angular.module( 'app' )
  .config( routeProvider );

function routeProvider( $routeProvider ) {
  $routeProvider.when( '/user/new', {
    templateUrl: './src/partials/new-user.html',
    controller: 'newUserController as user'
  })
  .otherwise({
    redirectTo: '/'
  });
}
