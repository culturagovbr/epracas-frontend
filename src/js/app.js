import angular from 'angular';

// Import our app config files
import constants  from './config/app.constants';
import appConfig  from './config/app.config';
import appRun     from './config/app.run';
import 'angular-ui-router';
import 'angular-material';
import 'angular-animate';
import 'angular-aria';
import 'angular-oidc';
import 'angular-simple-logger';
import 'ui-leaflet';
// Import our templates file (generated by Gulp)
import './config/app.templates';
// Import our app functionaity
import './layout';
import './components';
import './home';
import './services';
import './auth';
import './praca';
import './agenda';


// Create and bootstrap application
const requires = [
  'ui.router',
	'ngMaterial',
	'ngAnimate',
	'ngAria',
	'oauth2',
	'nemLogging',
	'ui-leaflet',
  'templates',
  'app.layout',
  'app.components',
  'app.home',
  'app.services',
	'app.auth',
	'app.praca',
	'app.agenda',
];

// Mount on window for testing
window.app = angular.module('app', requires);

angular.module('app').constant('AppConstants', constants);

angular.module('app').config(appConfig);

angular.module('app').run(appRun);

angular.bootstrap(document, ['app'], {
  strictDi: true
});
