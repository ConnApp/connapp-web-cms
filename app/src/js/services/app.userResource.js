!(function( angular ) {
  if ( !angular ) throw new ReferenceError( 'Angular ^1.5 is required' );
  angular.module( 'app' )
    .factory( 'userResource', userResource );

  function userResource( $resource ) {
    const resource = $resource( '/users', null,  { update: { method: 'PUT' } } );

    function get( _id ) {
      const User = $resource( '/users/:_id' );
      return User.get( { _id } );
    }

    function save( user ) {
      const userResource = new resource( user );
      return userResource.$save();
    }
    /**
     * 
     */
    function query() {
      return resource.query();
    }

    function update( user ) {
      const userResource = new resource( user );
      return userResource.$update();
    }

    return {
      get,
      save,
      query,
      update
    };
  }
})( angular );