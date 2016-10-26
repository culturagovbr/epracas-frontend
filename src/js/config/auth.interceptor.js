function authInterceptor(JWT, AppConstants, $window, $q) {
  "ngInject";

  return {
    request(config) {
      if (config.url.indexOf(AppConstants.api) === 0 && JWT.get()) {
        config.headers.Authorization = `JWT ${JWT.get()}`;
      }

      return config;
    },

    responseError(rejection) {
      if (rejection.status === 401) {
        JWT.destroy();
        $window.location.reload();
      }

      return $q.reject(rejection);
    },
  };
}

export default authInterceptor;
