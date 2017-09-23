!(function( angular ) {
  if ( !angular ) throw new ReferenceError( 'angularjs 1.5+ is required' );

  'use strict';
  angular.module( 'app' )
    .controller( 'createNewsController', createNewsController );

  function createNewsController() {
    const vm = this;
    
  }
})( angular );