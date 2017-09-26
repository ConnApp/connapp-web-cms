!(function( angular ) {
  if ( !angular ) throw new ReferenceError( 'angularjs 1.5+ is required' );

  'use strict';
  angular.module( 'app' )
    .factory( 'newsResource', newsResource );

  function newsResource( $resource ) {
    const NewsResource = $resource( '/news', null, { update: { method: 'PUT' } } );

    function save( news ) {
      const newsResource = new NewsResource( news );
      return newsResource.$save();
    }

    function query() {
      return NewsResource.query();
    }
    
    return {
      save,
      query
    };
  }
})( angular );