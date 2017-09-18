import angular from 'angular';
import angularRoute from 'angular-route';
import angularResource from 'angular-resource';

const APP_NAME = 'app';
angular.module( APP_NAME, [ 'ngRoute', 'ngResource' ] );

export default APP_NAME;
