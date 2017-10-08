!(function( angular ) {
  if ( !angular ) throw new ReferenceError( 'angularjs 1.5+ is required' );

  'use strict';
  angular.module( 'app' )
    .directive( 'ngModel', ngModel );

  function ngModel() {
    return {
      require: '?ngModel',
      restrict: 'A',
      link( scope, element, attrs, ngModel ) {
        if ( !ngModel ) return;
        if ( attrs.type !== 'time' ) return;

        ngModel.$formatters.unshift(function( value ) {
          return value.replace(/:00\.000$/, '' );
        });
      }
    };
  }
})( angular );