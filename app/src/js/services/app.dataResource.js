!(function( angular ) {
  if ( !angular ) throw new ReferenceError( 'angularjs 1.5+ is required' );

  'use strict';
  angular.module( 'app' )
    .service( 'DataResource', DataResource );

  function DataResource( $resource, $q ) {
    return function dataResourceConstructor( resourceName, endpoint ) {
      if ( !resourceName ) throw ReferenceError( 'we expected a resource, but received undefined' );

      const resourceActions = {
        remove:  {
          method: 'DELETE',
          hasBody: true,
          headers: { 'Content-Type': 'application/json;charset=UTF-8' }
        },
        update: {
          method: 'PUT',
          hasBody: true,
          headers: { 'Content-Type': 'application/json;charset=UTF-8' }
        }
      };
      const Resource = $resource( resourceName, null, resourceActions );

      /**
       * @method save
       * @public
       * @param {Object} data 
       * @return {Promise}
       */
      function save( data ) {
        if( !angular.isObject( data ) ) return $q.reject( new ReferenceError( `${typeof data} is not an object` ) );
        const dataResource = new Resource( data );
        return dataResource.$save();
      }

      /**
       * @method update
       * @public
       * @param {Object} data
       * @return {Promise}
       */
      function update( data ) {
        if( !angular.isObject( data ) ) return $q.reject( new ReferenceError( `${typeof data} is not an object` ) );
        const dataResource = new Resource( data );
        return dataResource.$update();
      }

      /**
       * @method get
       * @public
       * @param {ObjectId} _id
       * @return {Promise}
       */
      function get( _id ) {
        if ( !_id || _id.length < 24 ) $q.reject( new TypeError( `${_id} is not a valid id` ) );
        endpoint = resourceName + endpoint;
        const Resource = $resource( endpoint );
        return Resource.get( { _id } );
      }

      /**
       * @method query
       * @public
       * @param {Object} query
       * @return {Array<Object>}
       */
      function query( query ) {
        return Resource.query( query );
      }

      /**
       * @method logicalRemove
       * @public
       * @param {ObjectId} _id
       * @return {Promise}
       */
      function logicalRemove( _id ) {
        if ( !_id || _id.length < 24 ) $q.reject( new TypeError( `${_id} is not a valid id` ) );
        const dataResource = new Resource( { _id } );
        return dataResource.$remove();
      }

      this.save = save;
      this.update = update;
      this.get = get;
      this.query = query;
      this.logicalRemove = logicalRemove;
    };
  }
})( angular );