import Raven from "raven-js"

const factoriesModule = angular.module("ErrorCatcherHandler", [])
  .factory("$exceptionHandler", ["$window", "$log", function ($window, $log) {
    // "ngInject"

    $log.log("Using the RavenJS exception handler.")

    return function (exception, cause) {
      $log.error(arguments)
      Raven.captureException(exception)
    }
  }])

export default factoriesModule
