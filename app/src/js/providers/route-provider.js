export default function routeProvider( $routeProvider ) {
  $routeProvider.when( '/test', {
    template: '<h1> {{ message }} </h1>',
    controllers: function( $scope ) {
      const vm = this;
      $scope.message = 'hello world';
    }
  })
  .otherwise({
    redirectTo: '/'
  });
}
