function authInterceptor(JWT, AppConstants, $window, $q) {
	'ngInject';

	return {
		request: function(config) {
			if(config.url.indexOf(AppConstants.api) === 0 && JWT.get()) {
				config.headers.Authorization = 'Token ' + JWT.get();
			}
			
			return config;

		},

		responseError: function(rejection) {
			if (rejection.status === 401) {

				JWT.destroy();

				$window.location.reload();
				
			}
			return $q.reject(rejection);
			
		}
	}
	
}

export default authInterceptor;
