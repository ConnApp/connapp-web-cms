!(function( angular ) {
  if ( !angular ) throw new ReferenceError( 'angularjs 1.5+ is required' );

  'use strict';
  angular.module( 'uiAlert', [] );
  angular.module( 'uiAlert' )
    .directive( 'uiAlert', () => {
      return {
        template: alertTemplate(),
        restrict: 'E',
        transclude: true,
        scope: {
          type: '<',
          message: '='
        },
        controller( $scope ) {
          $scope.hideAlert = hideAlert;

          function hideAlert() {
            $scope.message = false;
          }
        }
      };
    });

  function alertTemplate() {
    return (`
      <div class="alert fade in show" role="alert" ng-class="type" ng-show="message">
        <button class="close" type="button" ng-click="hideAlert()">
          <span>&times;</span>
        </button>
        <p class="alert-heading mb-0 text-center" ng-bind="message"></p>
      </div>
    `);
  }
})( angular );