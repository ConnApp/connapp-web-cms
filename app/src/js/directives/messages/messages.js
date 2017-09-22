!(function( angular ) {
  if ( !angular ) throw new ReferenceError( 'angularjs 1.5+ is required' );
  angular.module( 'uiMessages', [] );
  angular.module( 'uiMessages' )
    .directive( 'uiMessage', () => {
      return {
        template: messageTemplate(),
        restrict: 'E',
        transclude: true,
        scope: {
          for: '=',
          submitted: '=',
          when: '@'
        }
      };
    });

  function messageTemplate() {
    return (`
      <div ng-if="( for.$error[when] && ( for.$dirty || for.$touched ) ) || ( submitted && for.$error[when] )">
        <small class="text-danger" ng-transclude></small>
      </div>
    `);
  }
})( angular );