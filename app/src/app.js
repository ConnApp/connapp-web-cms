import angular from 'angular';
import ngRoute from 'angular-route';

import auth from './js/controllers/auth';
import routeProvider from './js/providers/route-provider';

'use strict';
angular.module( 'app', [ 'ngRoute' ] );

angular.module( 'app' )
  .config( routeProvider );
