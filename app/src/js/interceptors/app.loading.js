!(function( angular ) {
  if ( !angular ) throw new ReferenceError( 'angularjs 1.5+ is required' );

  'use strict';
  angular.module( 'app' )
    .factory( 'loadingInterceptor', loadingInterceptor );

  function loadingInterceptor( $q, $rootScope ) {
    return {
      request( config ) {
        const URL = config.url;
        if ( URL.indexOf( 'src' ) > -1 ) return config;

        $rootScope.loading = true;
        return config;
      },
      requestError( rejection ) {
        $rootScope.loading = false;
        return $q.reject( rejection );
      },
      response( res ) {
        $rootScope.loading = false;
        return res;
      },
      responseError( rejection ) {
        $rootScope.loading = false;
        return $q.reject( rejection );
      }
    };
  }
})( angular );