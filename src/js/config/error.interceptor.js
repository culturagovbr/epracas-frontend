import Raven from "raven-js"

function errorHttpInterceptor($q) {
  "ngInject"

  return {
    responseError: function responseError(rejection) {
      Raven.captureException(new Error("HTTP response error"), {
        extra: {
          config: rejection.config,
          status: rejection.status,
        },
      })
      return $q.reject(rejection)
    },
  }
}

export default errorHttpInterceptor
