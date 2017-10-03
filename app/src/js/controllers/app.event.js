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
        .then( parseMsToData )
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
        .then( parseDataToMs )
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

    function parseDataToMs( event ) {
      const { startDate, endDate, startHour, endHour } = event;
      event.start = new Date( startDate ).getTime() + new Date( startHour ).getTime();
      event.end = new Date( endDate ).getTime() + new Date( endHour ).getTime();
      return event;
    }

    function parseMsToData( event ) {
      const 
        start = `${getFullDate( event.start )}T00:00:00.000Z`,
        end = `${getFullDate( event.end )}T00:00:00.000Z`,
        startHour = `1970-01-01T${getFullHours( event.start )}:00.000Z`,
        endHour = `1970-01-01T${getFullHours( event.end )}:00.000Z`;

      event.startDate = new Date( start );
      event.startHour = new Date( startHour );
      event.endDate = new Date( end );
      event.endHour = new Date( endHour );
      return event;
    }

    function getFullHours( date ) {
      const regexp = /\d{2}:\d{2}/;
      return date.match( regexp )[ 0 ];
    }

    function getFullDate( date ) {
      const regexp = /\d{4}-\d{2}-\d{2}/;
      return date.match( regexp )[ 0 ];
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
        event.start = moment( event.start ).calendar();
        return event;
      });
    }
  }
})( angular );