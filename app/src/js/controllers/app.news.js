!(function( angular ) {
  if ( !angular ) throw new ReferenceError( 'angularjs 1.5+ is required' );

  'use strict';
  angular.module( 'app' )
    .controller( 'createNewsController', createNewsController );

  function createNewsController( $scope, $timeout, $q, wizMarkdownSvc, newsResource, uiAlert ) {
    const vm = this;

    // ===# View models #=== //
    vm.news = {};
    vm.flow = {};
    vm.alert = {};
    vm.alertEmiter = uiAlert( vm.alert );
    vm.previewMode = false;
    vm.previewNews = previewNews;
    vm.submitForm = submitForm;

    // ===# Set form validate #=== //
    vm.validateImageSize = validateImageSize;

    function validateImageSize( file ) {
      const
        FILE_SIZE = 2,
        MAX_SIZE = FILE_SIZE * 1024 * 1024;
      if ( file.size > MAX_SIZE ) return $scope.newsForm.$setValidity( 'validSize', false );
      return $scope.newsForm.$setValidity( 'validSize', true );
    }

    // ===# Markdown setup #=== //
    function previewNews( message ) {
      vm.previewMode = !vm.previewMode;
      vm.news.preview = wizMarkdownSvc.Transform( message );
    }

    // ===# Setup #=== //
    function submitForm( news ) {
      if ( $scope.newsForm.$invalid ) return;

      news.cover = vm.flow.files.length ? vm.flow.files[ 0 ].file: undefined;
      $q.resolve( news )
        .then( convertImageForBase64 )
        .then( newsResource.save )
        .then( cleanInput )
        .then( () => vm.alertEmiter.success( 'Notícia cadastrada com sucesso!' ) )
        .catch( () => vm.alertEmiter.danger( 'Erro inesperado ao tentar cadastrar notícia' ) );
    }

    function cleanInput() {
      vm.news = {};
      $scope.newsForm.$setPristine( true );
    }

    function convertImageForBase64( { cover, ..._news } ) {
      return new Promise( ( resolve, reject ) => {
        if ( !cover ) return resolve( { ..._news } );

        const reader = new FileReader();

        reader.onload =  event => {
          cover = event.target.result;
          resolve( { cover, ..._news } );
        };

        reader.onerror = error => {
          reject( error );
        };

        reader.readAsDataURL( cover );
      });
    }

  }
})( angular );