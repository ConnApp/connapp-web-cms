!(function( angular ) {
  if ( !angular ) throw new ReferenceError( 'angularjs 1.5+ is required' );

  'use strict';
  angular.module( 'uiAlert' )
    .factory( 'uiAlert', alertService );

  function alertService() {
    return ( alert ) => {
      return { success, danger };

      function success( message ) {
        angular.merge( alert, { message, type: 'alert-success' } );
      }

      function danger( message ) {
        angular.merge( alert, { message, type: 'alert-danger'} );
      }
    };
  }
})( angular );