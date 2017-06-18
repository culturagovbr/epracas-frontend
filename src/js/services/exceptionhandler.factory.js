import Raven from "raven-js"

const factoriesModule = angular.module("ErrorCatcherHandler", [])
  .factory("$exceptionHandler", ($window, $log) => {
    "ngInject"

    $log.log("Using the RavenJS exception handler.")

    return function (exception, cause, ...args) {
      $log.error($log, args)
      Raven.captureException(angular.toJson(exception))
    }
  })

export default factoriesModule
