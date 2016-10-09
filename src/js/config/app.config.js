import authInterceptor from './auth.interceptor';

function AppConfig($httpProvider, $stateProvider, $locationProvider, $urlRouterProvider) {
  'ngInject';


	$httpProvider.interceptors.push(authInterceptor);
	$httpProvider.defaults.headers.common = { 'Content-Type': 'application/json' };

  $stateProvider
  .state('app', {
    abstract: true,
    templateUrl: 'layout/app-view.html',
		resolve: {
		 	auth: function(User) {
		 		return User.verifyAuth();
			}
		}
  });

  $urlRouterProvider.otherwise('/');
	$locationProvider.html5Mode(true);

}

export default AppConfig;
