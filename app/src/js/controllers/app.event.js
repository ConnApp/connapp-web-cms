!(function( angular ) {
  if ( !angular ) throw new ReferenceError( 'angularjs 1.5+ is required' );

  'use strict';
  angular.module( 'app' )
    .controller( 'formEventController', formEventController )
    .controller( 'listEventController', listEventController )
    .controller( 'appendSpeakerIntoEventController', appendSpeakerIntoEventController );

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
      const 
        startHour = getFullHours( event.startHour ).getTime(),
        startDate = getFullDate( event.startDate ).getTime(),
        endHour = getFullHours( event.endHour ).getTime(),
        endDate = getFullDate( event.endDate ).getTime();

      event.start = startDate + startHour;
      event.end =  endDate + endHour;
      return event;
    }

    function parseMsToData( event ) {
      event.startDate = getFullDate( event.start );
      event.startHour = getFullHours( event.start );
      event.endDate = getFullDate( event.end );
      event.endHour = getFullHours( event.end );

      return event;
    }

    function getFullHours( stringDate ) {
      if ( typeof stringDate !== 'string' ) {
        stringDate = Date.prototype.toISOString.call( stringDate );
      }
      const
        regexp = /\d{2}:\d{2}/,
        hourExp = stringDate.match( regexp )[ 0 ];

      return new Date( `1970-01-01T${hourExp}:00.000Z` );
    }

    function getFullDate( stringDate ) {
      if ( typeof stringDate !== 'string' ) {
        stringDate = Date.prototype.toISOString.call( stringDate );
      }
      const 
        regexp = /\d{4}-\d{2}-\d{2}/,
        dateExp = stringDate.match( regexp )[ 0 ];

      return new Date( `${dateExp}T00:00:00.000Z` );
    }
  }

  function listEventController( $log, $scope, $filter, DataResource ) {
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
    vm.orderBy = 'name';
    vm.reverse = false;
    vm.reverseOrderBy = () => vm.reverse = !vm.reverse;
    vm.setCurrentEvent = event => vm.event = event;
    vm.deleteEvent = deleteEvent;

    // ===# Setup #=== //

    function deleteEvent( event ) {
      const { _id } = event;
      const removeEventFromTable = event => () => vm.events = vm.events.filter( _event => _event._id !== event._id );
      eventResource
        .logicalRemove( _id )
        .then( removeEventFromTable( event ) )
        .catch( $log.error );
    }

    function formatDate( events ) {
      return events.map( event => {
        event.start = $filter( 'date' )( event.start, 'dd/MM/yyyy HH:mm' );
        return event;
      });
    }
  }

  function appendSpeakerIntoEventController( $log, $scope, $routeParams, $q, uiAlert, DataResource) {
    const 
      vm = this,
      eventResource = new DataResource( '/events', '/:_id' ),
      { _id } = $routeParams;


    // ===# View Model #=== //
    vm.event = {};
    vm.speaker = {};
    vm.speakers = [];
    vm.alert = {};
    vm.alertEmitter = uiAlert( vm.alert );
    vm.appendSpeaker = appendSpeaker;
    vm.removeSpeaker = removeSpeaker;
    vm.setCurrentSpeaker = setCurrentSpeaker;

    // ===# Bootstraping data #=== //
    eventResource
      .get( _id )
      .$promise
      .then( event => vm.event = event )
      .then( speakersQuery )
      .then( $log.info )
      .catch( $log.error );

    // ===# Setup #=== //
    const mapSpeakersId = speakers => speakers.map( speaker => speaker._id );

    function speakersQuery( event ) {
      const 
        { speakers } = event,
        speakersId = mapSpeakersId( speakers ),
        speakerResource = new DataResource( '/speakers', '/:_id' );

      const filterSpeakersAlreadyAdded = speakers => speakers.filter( speaker => speakersId.indexOf( speaker._id ) < 0 );
      
      speakerResource
        .query()
        .$promise
        .then( filterSpeakersAlreadyAdded )
        .then( speakers => vm.speakers = speakers );
    }

    function appendSpeaker( speaker ) {
      if ( $scope.appendSpeakerForm.$invaid ) return;

      vm.event.speakers.push( speaker );
      eventResource
        .update( vm.event )
        .then( speakersQuery( vm.event ) )
        .then( () => vm.alertEmitter.success( 'Palestrando adicionado com sucesso!' ) )
        .catch( () => vm.alertEmitter.danger( 'Erro inesperado ao tentar adicionar palestrante' ) );
    }

    function removeSpeaker( speaker ) {
      if ( !speaker ) return;
      const filterSpeaker = _speaker => _speaker._id !== speaker._id;

      vm.event.speakers = vm.event.speakers.filter( filterSpeaker );
      eventResource
        .update( vm.event )
        .then( speakersQuery( vm.event ) )
        .then( () => vm.alertEmitter.success( 'Palestrando removido com sucesso!' ) )
        .catch( () => vm.alertEmitter.danger( 'Erro inesperado ao tentar remover palestrante' ) );
    }

    function setCurrentSpeaker( speaker ) {
      vm.speaker = speaker;
    }
  }
})( angular );