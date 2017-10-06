!(function( angular ) {
  if ( !angular ) throw new ReferenceError( 'angularjs 1.5+ is required' );

  'use strict';
  angular.module( 'app' )
    .controller( 'formInfoController', formInfoController )
    .controller( 'listInfoController', listInfoController )
    .controller( 'previewInfoController', previewInfoController );

  function formInfoController( $log, $scope, $timeout, $q, $routeParams, $location, wizMarkdownSvc, DataResource, uiAlert ) {
    const 
      vm = this,
      infoResource = new DataResource( '/info', '/:_id' ),
      { _id } = $routeParams;

    // ===# View models #=== //
    vm.breadcrumb = _id ? 'Editar informação': 'Nova informação';
    vm.info = {};
    vm.flow = {};
    vm.alert = {};
    vm.alertEmiter = uiAlert( vm.alert );
    vm.previewMode = false;
    vm.previewNews = previewNews;
    vm.submitForm = submitForm;

    // ===# Bootstraping data #=== //
    if ( _id ) {
      infoResource
        .get( _id )
        .$promise
        .then( info => vm.info = info )
        .catch( $log.error );
    }

    // ===# Markdown setup #=== //
    function previewNews( message ) {
      vm.previewMode = !vm.previewMode;
      vm.info.preview = wizMarkdownSvc.Transform( message );
    }

    // ===# Setup #=== //
    function submitForm( info ) {
      if ( $scope.infoForm.$invalid ) return;

      $q.resolve( info )
        .then( saveForm( info ) )     
        .then( redirectToNewsList )
        .catch( () => vm.alertEmiter.danger( 'Erro inesperado ao tentar cadastrar informação' ) );
    }

    function saveForm( info ) {
      if ( !_id ) return infoResource.save( info );
      return infoResource.update( info );
    }

    function redirectToNewsList() {
      $location.path( '/info/list' );
    }

  }

  function listInfoController( DataResource ) {
    const 
      vm = this,
      infoResource = new DataResource( '/info' );

    // ===# View Models #=== //
    vm.orderBy = 'title';

    // ===# Carga inicial #=== //
    vm.infoFeed = infoResource.query();
    
  }

  function previewInfoController( $log, $routeParams, $location, DataResource, wizMarkdownSvc, uiAlert ) {
    const 
      vm = this,
      infoResource = new DataResource( '/info', '/:_id' ),
      { _id } = $routeParams;
    
    // ===# View Models #=== //
    vm.alert = {};
    vm.alertEmitter = uiAlert( vm.alert );
    vm.deleteInfo = deleteInfo;
    
    // ===# Bootstraping data #=== //
    infoResource
      .get( _id )
      .$promise
      .then( info => {
        info.content = wizMarkdownSvc.Transform( info.message );
        vm.info = info;
      })
      .catch( error => vm.alertEmitter.danger( error.data.message ) );
    
    function deleteInfo() {
      infoResource
        .logicalRemove( _id )
        .then( redirectToInfoList )
        .catch( $log.error );
    }

    function redirectToInfoList() {
      $location.path( '/info/list' );
    }
  }
})( angular );