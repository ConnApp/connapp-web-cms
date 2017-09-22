!(function( angular ) {
  if ( !angular ) throw new ReferenceError( 'angularjs 1.5+ is required' );
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
      <div class="row mt-2" ng-show="message">
        <div class="col-12 col-sm-12 col-md-6 col-lg-4 ml-auto mr-auto">
          <div class="alert fade in show" role="alert" ng-class="type">
            <button class="close" type="button" ng-click="hideAlert()">
              <span>&times;</span>
            </button>
            <p class="alert-heading mb-0" ng-bind="message"></p>
          </div>
        </div>
      </div>
    `);
  }
})( angular );