!(function( angular ) {
  if ( !angular ) throw new ReferenceError( 'angularjs 1.5+ is required' );

  'use strict';
  angular.module( 'app' )
    .factory( 'newsResource', newsResource );

  function newsResource( $resource, $q ) {
    const
      resourceActions = {
        delete:  {
          method: 'DELETE',
          hasBody: true,
          headers: { 'Content-Type': 'application/json;charset=UTF-8' }
        },
        update: {
          method: 'PUT',
          hasBody: true,
          headers: { 'Content-Type': 'application/json;charset=UTF-8' }
        }
      },
      NewsResource = $resource( '/news', null, resourceActions );

    function save( news ) {
      const newsResource = new NewsResource( news );
      return newsResource.$save();
    }

    function query() {
      return NewsResource.query();
    }

    function get( _id ) {
      if ( !_id ) return $q.reject( new ReferenceError( 'property _id is undefined' ) );
      const newsResource =  $resource( '/news/:_id' );
      return newsResource.get( { _id } );
    }

    function logicalRemove( _id ) {
      if ( !_id ) return $q.reject( new ReferenceError( 'expected an object but, received undefined' ) );
      const newsResource = new NewsResource( { _id } );
      return newsResource.$delete();
    }

    function update( news ) {
      if ( !news ) return $q.reject( new ReferenceError( 'expected an object but, received undefined' ) );
      const newsResource = new NewsResource( news );
      return newsResource.$update();
    }
    
    return {
      save,
      query,
      get,
      logicalRemove,
      update
    };
  }
})( angular );