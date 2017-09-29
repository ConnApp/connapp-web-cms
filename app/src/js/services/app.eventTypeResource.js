!(function( angular ) {
  if ( !angular ) throw new ReferenceError( 'angularjs 1.5+ is required' );

  'use strict';
  angular.module( 'app' )
    .factory( 'eventTypeResource', eventTypeResource );

  function eventTypeResource( $resource, $q ) {
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
      EventTypeResource = $resource( '/eventTypes', null, resourceActions );

    function save( eventType ) {
      const eventTypeResource = new EventTypeResource( eventType );
      return eventTypeResource.$save();
    }

    function query() {
      return EventTypeResource.query();
    }

    function get( _id ) {
      if ( !_id ) return $q.reject( new ReferenceError( 'property _id is undefined' ) );
      const eventTypeResource =  $resource( '/eventTypes/:_id' );
      return eventTypeResource.get( { _id } );
    }

    function logicalRemove( _id ) {
      if ( !_id ) return $q.reject( new ReferenceError( 'expected an object but, received undefined' ) );
      const eventTypeResource = new EventTypeResource( { _id } );
      return eventTypeResource.$delete();
    }

    function update( eventType ) {
      if ( !eventType ) return $q.reject( new ReferenceError( 'expected an object but, received undefined' ) );
      const eventTypeResource = new EventTypeResource( eventType );
      return eventTypeResource.$update();
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