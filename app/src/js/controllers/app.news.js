!(function( angular ) {
  if ( !angular ) throw new ReferenceError( 'angularjs 1.5+ is required' );

  'use strict';
  angular.module( 'app' )
    .controller( 'createNewsController', createNewsController );

  function createNewsController( wizMarkdownSvc ) {
    const vm = this;

    // ===# View models #=== //
    vm.news = {};
    vm.previewMode = false;
    vm.previewNews = previewNews;
    

    function previewNews( message ) {
      vm.news.preview = wizMarkdownSvc.Transform( message );
      vm.previewMode = !vm.previewMode;
    }
  }
})( angular );