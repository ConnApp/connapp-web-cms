/* eslint-disable */

import angular from 'angular';
import angularRoute from 'angular-route';
import angularSanitize from 'angular-sanitize';
import angularResource from 'angular-resource';
import infiniteScroll from 'ng-infinite-scroll';
import uiMessages from './directives/messages/messages';
import uiAlert from './directives/alert/alert';
import tableView from './components/table-view/table-view';
import wizMarkdown from './lib/wiz-markdown/wizMarkdown/wizMarkdown';

const APP_NAME = 'app';
angular.module( APP_NAME, [ 'ngRoute', 'ngResource', 'uiMessages', 'uiAlert', 'wiz.markdown', 'flow', 'infinite-scroll', 'tableView' ] );

export default APP_NAME;
