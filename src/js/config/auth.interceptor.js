function authInterceptor(JWT, AppConstants, $injector, $q) {
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
        return $injector.get('oauthService').initImplicitFlow();
      }

      return $q.reject(rejection);
    },
  };
}

export default authInterceptor;
