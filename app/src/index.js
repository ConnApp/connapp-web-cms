/* eslint-disable */

// ===# module imports #=== //
import app from './js/app';
// ===# controller imports #=== //
import session from './js/controllers/app.session';
import homeController from './js/controllers/app.home';
import userController from './js/controllers/app.user';
import newsController from './js/controllers/app.news';
import eventTypeController from './js/controllers/app.eventType';
import placeController from './js/controllers/app.place';
// ===# interceptor imports #=== //
import loadingInterceptor from './js/interceptors/app.loading';
// ===# provider imports #=== //
import routeProvider from './js/providers/ngRoute.routeProvider';
import httpProvider from './js/providers/app.httpProvider';
// ===# resource imports #=== //
import userResource from './js/services/app.userResource';
import newsResource from './js/services/app.newsResource';
import eventTypeResource from './js/services/app.eventTypeResource';
import placeResource from './js/services/app.placeResource';
// ===# service imports #=== //
import alertService from './js/services/uiAlert.alert';
import sessionService from './js/services/app.session';
