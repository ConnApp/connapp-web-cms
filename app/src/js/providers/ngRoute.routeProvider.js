!(function( angular ) {
  if ( !angular ) throw new ReferenceError( 'angular 1.5.x is required' );
  
  angular.module( 'app' )
    .config( routeProvider );

  function routeProvider( $routeProvider ) {
    $routeProvider
      .when( '/user/form', {
        templateUrl: '../src/partials/user/user-form.html',
        controller: 'newUserController',
        controllerAs: 'vm'
      })
      .when( '/user/list', {
        templateUrl: '../src/partials/user/user-table.html',
        controller: 'listUserController',
        controllerAs: 'vm'
      })
      .when( '/user/settings/:_id', {
        templateUrl: '../src/partials/user/user-settings.html',
        controller: 'updateUserController',
        controllerAs: 'vm'
      })
      .when( '/user/settings/:_id/reset', {
        templateUrl: '../src/partials/user/user-settings-reset.html',
        controller: 'resetUserPasswordController',
        controllerAs: 'vm'
      })
      .when( '/news/form', {
        templateUrl: '../src/partials/news/news-form.html',
        controller: 'formNewsController',
        controllerAs: 'vm'
      })
      .when( '/news/list', {
        templateUrl: '../src/partials/news/news-table.html',
        controller: 'listNewsController',
        controllerAs: 'vm'
      })
      .when( '/news/list/preview/:_id', {
        templateUrl: '../src/partials/news/news-preview.html',
        controller: 'previewNewsController',
        controllerAs: 'vm'
      })
      .when( '/news/update/:_id', {
        templateUrl: '../src/partials/news/news-form.html',
        controller: 'formNewsController',
        controllerAs: 'vm'
      })
      .when( '/event/list', {
        templateUrl: '../src/partials/event/event-table.html',
        controller: 'listEventController',
        controllerAs: 'vm'
      })
      .when( '/event/form', {
        templateUrl: '../src/partials/event/event-form.html',
        controller: 'formEventController',
        controllerAs: 'vm'
      })
      .when( '/event/update/:_id', {
        templateUrl: '../src/partials/event/event-form.html',
        controller: 'formEventController',
        controllerAs: 'vm'
      })
      .when( '/event/types', {
        templateUrl: '../src/partials/event/event-type-table.html',
        controller: 'eventTypeController',
        controllerAs: 'vm'
      })
      .when( '/event/types/form', {
        templateUrl: '../src/partials/event/event-type-form.html',
        controller: 'formEventTypeController',
        controllerAs: 'vm'
      })
      .when( '/event/types/update/:_id', {
        templateUrl: '../src/partials/event/event-type-form.html',
        controller: 'formEventTypeController',
        controllerAs: 'vm'
      })
      .when( '/place/list', {
        templateUrl: '../src/partials/place/place-table.html',
        controller: 'listPlaceController',
        controllerAs: 'vm'
      })
      .when( '/place/form', {
        templateUrl: '../src/partials/place/place-form.html',
        controller: 'formPlaceController',
        controllerAs: 'vm'
      })
      .when( '/place/update/:_id', {
        templateUrl: '../src/partials/place/place-form.html',
        controller: 'formPlaceController',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/'
      });
  }
})( angular );


