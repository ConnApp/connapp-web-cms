!(function( angular ) {
  if ( !angular ) throw new ReferenceError( 'angularjs 1.5+ is required' );

  'use strict';
  angular.module( 'app' )
    .controller( 'listPlaceController', listPlaceController )
    .controller( 'formPlaceController', formPlaceController );

  function formPlaceController( $log, $scope, $location, $routeParams, $q, placeResource, uiAlert ) {
    const 
      vm = this,
      { _id } = $routeParams;

    // ===# View Model #=== //
    vm.place = {};
    vm.alert = {};
    vm.flow = {};
    vm.alertEmitter = uiAlert( vm.alert );
    vm.submitForm = submitForm;

    // ===# Bootstraping data #=== //
    if ( _id ) {
      placeResource
        .get( _id )
        .$promise
        .then( _place => vm.place = _place ) 
        .catch( error => vm.alertEmitter.danger( error.data ) );
    }

    // ===# Setup #===//
    function submitForm( place ) {
      if ( $scope.placeForm.$invalid ) return;

      $q
        .resolve( place )
        .then( saveForm )
        .then( redirectToPlaceList )
        .catch( error => vm.alertEmitter.danger( error.data ) );  
    }

    function redirectToPlaceList() {
      $location.path( '/place/list' );
    }

    function saveForm( place ) {
      if ( !_id ) return placeResource.save( place );
      return placeResource.update( place );
    }

  }

  function listPlaceController( $log, placeResource ) {
    const vm = this;

    // ===# View Model ===# //
    vm.place = {};
    vm.setCurrentPlace = setCurrentPlace;
    vm.deletePlace = deletePlace;

    // ===# Bootstraping data #=== //
    vm.places = placeResource.query();

    // ===# Setup #=== //
    function setCurrentPlace( place ) {
      vm.place = place;
    }

    function deletePlace( { _id } ) {
      if ( !_id ) return;

      placeResource
        .logicalRemove( _id )
        .then( splicePlace( _id ) )
        .catch( $log.error );
    }

    function splicePlace( _id ) {
      return () => {
        vm.places = vm.places.filter( place => place._id !== _id );
      };
    }

  }
})( angular );