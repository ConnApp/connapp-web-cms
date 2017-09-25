!(function( angular ) {
  if ( !angular ) throw new ReferenceError( 'angularjs 1.5+ is required' );

  'use strict';
  angular.module( 'app' )
    .controller( 'createNewsController', createNewsController );

  function createNewsController( wizMarkdownSvc, newsResource ) {
    const vm = this;

    // ===# View models #=== //
    vm.news = {};
    vm.flow = {};
    vm.previewMode = false;
    vm.previewNews = previewNews;
    vm.submitForm = submitForm;
    

    function previewNews( message ) {
      vm.previewMode = !vm.previewMode;
      vm.news.preview = wizMarkdownSvc.Transform( message );
    }

    function submitForm( news ) {
      
    }
  }
})( angular );