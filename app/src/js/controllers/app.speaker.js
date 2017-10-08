!(function( angular ) {
  if ( !angular ) throw new ReferenceError( 'angularjs 1.5+ is required' );

  'use strict';
  angular.module( 'app' )
    .controller( 'formSpeakerController', formSpeakerController )
    .controller( 'listSpeakerController', listSpeakerController );

  function formSpeakerController( $log, $scope, $q, $routeParams, $location, DataResource, uiAlert ) {
    const 
      vm = this,
      { _id } = $routeParams,
      speakerResource = new DataResource( '/speakers', '/:_id' );

    // ===# View Model #=== //
    vm.breadcrumb = _id ? 'Editando palestrante': 'Novo palestrante';
    vm.speaker = { image: { perfil: undefined } };
    vm.flow = {};
    vm.alert = {};
    vm.alertEmitter = uiAlert( vm.alert );


    vm.submitForm = submitForm;
    vm.convertImageFile = convertImageFile;
    vm.cleanImageModel = cleanImageModel;

    // ===# Bootstraping data #=== //
    if ( _id ) {
      speakerResource
        .get( _id )
        .$promise
        .then( speaker => {
          speaker.image = speaker.image ? speaker.image: { perfil: undefined };
          vm.speaker = speaker;
        })
        .catch( $log.error );
    }

    // ===# Setup #=== //
    function submitForm( speaker ) {
      if ( $scope.speakerForm.$invalid ) return;

      $q
        .resolve( speaker )
        .then( saveForm( speaker ) )
        .then( redirectToSpeakerList )
        .catch( () => vm.alertEmitter.danger( 'Erro inesperado ao tentar cadastrar palestrante' ) );
    }

    function saveForm( speaker ) {
      if ( !_id ) return speakerResource.save( speaker );
      return speakerResource.update( speaker );
    }

    function redirectToSpeakerList() {
      $location.path( '/speaker/list' );
    }


    function convertImageFile( { file } ) {
      const reader = new FileReader();
      
      validateImageSize( file );
      reader.readAsDataURL( file ); 
  
      reader.onload = event => {
        vm.speaker.image.perfil = event.target.result;
        $scope.$apply();
      };

      reader.onerror = () => {
        vm.alertEmitter.danger( 'Erro ao tentar carregar imagem' );
        $scope.$apply();
      };
    }

    function cleanImageModel() {
      vm.speaker.image.perfil = null;
    }

    function validateImageSize( file ) {
      const
        FILE_SIZE = 2,
        MAX_SIZE = FILE_SIZE * 1024 * 1024;

      if ( file.size > MAX_SIZE ) {
        $scope.speakerForm.$setValidity( 'validSize', false );
        return false;
      }

      $scope.speakerForm.$setValidity( 'validSize', true );
      return true;
    }

  }

  function listSpeakerController( $log, DataResource ) {
    const 
      vm = this,
      speakerResource = new DataResource( '/speakers' );

    // ===# View Models #=== //
    vm.speaker = {};
    vm.reverse = false;
    vm.setCurrentSpeaker = setCurrentSpeaker;
    vm.deleteSpeaker = deleteSpeaker;
    vm.reverseOrderBy = () => vm.reverse = !vm.reverse;

    // ===# Bootstraping data #=== //
    vm.speakers = speakerResource.query();

    // ===# Setup # === //
    function setCurrentSpeaker( speaker ) {
      vm.speaker = speaker;
    }

    function deleteSpeaker( speaker ) {
      const { _id } = speaker;
      if ( !_id ) return;

      speakerResource
        .logicalRemove( _id )
        .then( spliceSpeaker( _id ) )
        .catch( $log.error );
    }

    function spliceSpeaker( _id ) {
      return () => {
        vm.speakers = vm.speakers.filter( speaker => speaker._id !== _id );
      };
    }
  }
})( angular );