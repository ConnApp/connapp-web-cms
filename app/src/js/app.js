import angular from 'angular';
import angularRoute from 'angular-route';
import angularResource from 'angular-resource';
import uiMessages from './directives/messages/messages';

const APP_NAME = 'app';
angular.module( APP_NAME, [ 'ngRoute', 'ngResource', 'uiMessages' ] );

export default APP_NAME;
