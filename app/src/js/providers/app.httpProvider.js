!(function( angular ) {
  if ( !angular ) throw new ReferenceError( 'angularjs 1.5+ is required' );

  'use strict';
  angular.module( 'app' )
    .config( httpProvider );

  function httpProvider( $httpProvider ) {
    $httpProvider.interceptors.push( 'loadingInterceptor' );
  }

})( angular );