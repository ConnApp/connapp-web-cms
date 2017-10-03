!(function( angular ) {
  if ( !angular ) throw new ReferenceError( 'angularjs 1.5+ is required' );

  'use strict';
  angular.module( 'app' )
    .controller( 'formEventController', formEventController )
    .controller( 'listEventController', listEventController );

  function formEventController( $log, $scope, $routeParams, $q, DataResource, uiAlert ) {
    const 
      vm = this,
      { _id } = $routeParams,
      eventResource = new DataResource( '/events', '/:_id' ),
      eventTypeResource = new DataResource( 'eventTypes' ),
      placeResource = new DataResource( '/places' );

    // ===# Bootstraping data #=== //
  
    vm.places = placeResource.query();
    vm.eventTypeList = eventTypeResource.query();

    if ( _id ) {
      eventResource
        .get( _id )
        .$promise
        .then( parseData )
        .then( event => vm.event = event )
        .catch( error => vm.alertEmitter.danger( error.data.message ) );
    }
    

    // ===# View model #=== //
    vm.place = {};
    vm.alert = {};
    vm.alertEmitter = uiAlert( vm.alert );
    vm.submitForm = submitForm;

    // ===# Setup #=== //

    function submitForm( event ) {
      if ( $scope.eventForm.$invalid ) return;
      
      $q
        .resolve( event )
        .then( saveForm )
        .then( cleanEventModel )
        .then( vm.alertEmitter.success( 'Evento foi armazenado com sucesso!' ) )
        .catch( error => vm.alertEmitter.danger( error.data.message ) );
    }

    function saveForm( event ) {
      const _event = {
        ...event,
        eventType: event.eventType._id,
        place: event.place._id
      };

      if ( _id ) return eventResource.update( _event );
      return eventResource.save( _event );
    }

    function cleanEventModel() {
      if ( !_id ) {
        vm.event = {};
        $scope.eventForm.$setPristine( true );
      }
    }

    function parseData( event ) {
      const { startDate, startHour, endDate, endHour } = event;
      event.startHour = new Date( startHour );
      event.startDate = new Date( startDate );
      event.endDate = new Date( endDate );
      event.endHour = new Date( endHour );
      return event;
    }
  }

  function listEventController( $log, $scope, DataResource ) {
    const
      vm = this,
      eventResource = new DataResource( '/events' );
  
    // ===# Bootstraping data #=== //
    eventResource
      .query()
      .$promise
      .then( formatDate )
      .then( events => vm.events = events );

    // ===# View model #=== //
    vm.event = {};
    vm.setCurrentEvent = setCurrentEvent;
    vm.deleteEvent = deleteEvent;

    // ===# Setup #=== //
    function setCurrentEvent( event ) {
      vm.event = event;
    }

    function deleteEvent( event ) {
      const _id = { event };
      eventResource
        .logicalRemove( _id )
        .then( removeEventFromTable( event ) )
        .catch( $log.error );
    }

    function removeEventFromTable( event ) {
      return () => {
        vm.events = vm.events.filter( _event => _event._id !== event._id );
      };
    }

    function formatDate( events ) {
      return events.map( event => {
        const startTime = new Date( event.startDate ).getTime() + new Date( event.startHour ).getTime();

        event.start = moment( startTime ).calendar();
        return event;
      });
    }
  }
})( angular );