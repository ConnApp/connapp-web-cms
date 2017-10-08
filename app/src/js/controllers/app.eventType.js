!(function( angular ) {
  if ( !angular ) throw new ReferenceError( 'angularjs 1.5+ is required' );

  'use strict';
  angular.module( 'app' )
    .controller( 'eventTypeController', eventTypeController )
    .controller( 'formEventTypeController', formEventTypeController );

  function formEventTypeController( $log, $scope, $location, $routeParams, $q, uiAlert, DataResource ) {
    const 
      vm = this,
      eventTypeResource = new DataResource( '/eventTypes', '/:_id' ),
      { _id } = $routeParams;

    // ===# View Model #=== //
    vm.eventType = {};
    vm.alert = {};
    vm.alertEmitter = uiAlert( vm.alert );
    vm.submitForm = submitForm;

    // ===# Bootstraping data #=== //
    if ( _id ) {
      eventTypeResource
        .get( _id )
        .$promise
        .then( _eventType => vm.eventType = _eventType ) 
        .catch( error => vm.alertEmitter.danger( error.data ) );
    }

    // ===# Setup #===//
    function submitForm( eventType ) {
      if ( $scope.eventTypeForm.$invalid ) return;

      $q
        .resolve( eventType )
        .then( saveForm )
        .then( redirectToEventTypeList )
        .catch( error => vm.alertEmitter.danger( error.data ) );  
    }

    function redirectToEventTypeList() {
      $location.path( '/event/types' );
    }

    function saveForm( eventType ) {
      if ( !_id ) return eventTypeResource.save( eventType );
      return eventTypeResource.update( eventType );
    }

  }

  function eventTypeController( $log, DataResource ) {
    const 
      vm = this,
      eventTypeResource = new DataResource( '/eventTypes', '/:_id' );

    // ===# View Model ===# //
    vm.eventType = {};
    vm.reverse = false;
    vm.reverseOrderBy = () => vm.reverse = !vm.reverse;
    vm.setCurrentEventType = setCurrentEventType;
    vm.deleteEventType = deleteEventType;

    // ===# Bootstraping data #=== //
    vm.eventTypeList = eventTypeResource.query();

    // ===# Setup #=== //
    function setCurrentEventType( eventType ) {
      vm.eventType = eventType;
    }

    function deleteEventType( { _id } ) {
      if ( !_id ) return;

      eventTypeResource
        .logicalRemove( _id )
        .then( spliceEventType( _id ) )
        .catch( $log.error );
    }

    function spliceEventType( _id ) {
      return () => {
        vm.eventTypeList = vm.eventTypeList.filter( eventType => eventType._id !== _id );
      };
    }

  }
})( angular );