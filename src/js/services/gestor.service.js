class Gestor {
  constructor($http, $q, ErrorCatcher, AppConstants) {
    "ngInject"

    angular.extend(this, {
      $http,
      $q,
      ErrorCatcher,
      AppConstants,
    })
  }

  list() {
    const caller = this.ErrorCatcher.callerName()

    return this.$http({
      url: this.AppConstants.gestorEndPoint,
      method: "GET",
      params: { atual: true },
    })
      .catch((err) => {
        this.ErrorCatcher.error(caller, err)
        return this.$q.reject()
      })
  }
}

export default Gestor
