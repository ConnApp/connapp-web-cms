!(function( angular ) {
  if ( !angular ) throw new ReferenceError( 'angularjs 1.5+ is required' );

  'use strict';
  angular.module( 'app' )
    .controller( 'formNewsController', formNewsController )
    .controller( 'listNewsController', listNewsController )
    .controller( 'previewNewsController', previewNewsController );

  function formNewsController( $log, $scope, $timeout, $q, $routeParams, $location, wizMarkdownSvc, newsResource, uiAlert ) {
    const 
      vm = this,
      { _id } = $routeParams;

    // ===# View models #=== //
    vm.breadcrumb = _id ? 'Editar notícia': 'Nova notícia';
    vm.news = {};
    vm.flow = {};
    vm.alert = {};
    vm.alertEmiter = uiAlert( vm.alert );
    vm.previewMode = false;
    vm.previewNews = previewNews;
    vm.submitForm = submitForm;
    vm.convertImageFile = convertImageFile;
    vm.cleanImageModel = cleanImageModel;

    // ===# Bootstraping data #=== //
    if ( _id ) {
      newsResource
        .get( _id )
        .$promise
        .then( news => vm.news = news )
        .catch( $log.error );
    }

    // ===# Markdown setup #=== //
    function previewNews( message ) {
      vm.previewMode = !vm.previewMode;
      vm.news.preview = wizMarkdownSvc.Transform( message );
    }

    // ===# Setup #=== //
    function submitForm( news ) {
      if ( $scope.newsForm.$invalid ) return;

      $q.resolve( news )
        .then( saveForm( news ) )     
        .then( redirectToNewsList )
        .catch( () => vm.alertEmiter.danger( 'Erro inesperado ao tentar cadastrar notícia' ) );
    }

    function saveForm( news ) {
      if ( !_id ) return newsResource.save( news );
      return newsResource.update( news );
    }

    function redirectToNewsList() {
      $location.path( '/news/list' );
    }

    function convertImageFile( { file } ) {
      const reader = new FileReader();
      
      validateImageSize( file );
      reader.readAsDataURL( file ); 
  
      reader.onload = event => {
        vm.news.cover = event.target.result;
        $scope.$apply();
      };

      reader.onerror = () => {
        vm.alertEmitter.danger( 'Erro ao tentar carregar imagem' );
        $scope.$apply();
      };
    }

    function cleanImageModel() {
      vm.news.cover = null;
    }

    function validateImageSize( file ) {
      const
        FILE_SIZE = 2,
        MAX_SIZE = FILE_SIZE * 1024 * 1024;

      if ( file.size > MAX_SIZE ) {
        $scope.newsForm.$setValidity( 'validSize', false );
        return false;
      }

      $scope.newsForm.$setValidity( 'validSize', true );
      return true;
    }

  }

  function listNewsController( newsResource ) {
    const 
      vm = this;
    // ===# View Models #=== //
    vm.orderBy = 'title';

    // ===# Carga inicial #=== //
    vm.newsFeed = newsResource.query();
    
  }

  function previewNewsController( $log, $routeParams, $location, newsResource, wizMarkdownSvc ) {
    const 
      vm = this,
      { _id } = $routeParams;
    
    // ===# View Models #=== //
    vm.deleteNews = deleteNews;
    
    /**
     * Buscando notícia.
     */
    newsResource.get( _id )
      .$promise.then( news => {
        news.content = wizMarkdownSvc.Transform( news.message );
        vm.news = news;
      })
      .catch( $log.error );
    
    function deleteNews() {
      newsResource.logicalRemove( _id )
        .then( () => {
          $location.path( '/news/list' );
        })
        .catch( $log.error );
    }
  }
})( angular );