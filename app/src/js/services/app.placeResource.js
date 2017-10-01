!(function( angular ) {
  if ( !angular ) throw new ReferenceError( 'angularjs 1.5+ is required' );

  'use strict';
  angular.module( 'app' )
    .factory( 'placeResource', placeResource );

  function placeResource( $resource, $q ) {
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
      PlaceResource = $resource( '/places', null, resourceActions );

    function save( place ) {
      const placeResource = new PlaceResource( place );
      return placeResource.$save();
    }

    function query() {
      return PlaceResource.query();
    }

    function get( _id ) {
      if ( !_id ) return $q.reject( new ReferenceError( 'property _id is undefined' ) );
      const placeResource =  $resource( '/places/:_id' );
      return placeResource.get( { _id } );
    }

    function logicalRemove( _id ) {
      if ( !_id ) return $q.reject( new ReferenceError( 'expected an object but, received undefined' ) );
      const placeResource = new PlaceResource( { _id } );
      return placeResource.$delete();
    }

    function update( place ) {
      if ( !place ) return $q.reject( new ReferenceError( 'expected an object but, received undefined' ) );
      const placeResource = new PlaceResource( place );
      return placeResource.$update();
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