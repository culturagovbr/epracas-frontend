class Vinculacao {
  constructor($http, $log, AppConstants) {
    "ngInject"

    angular.extend(this, {
      $http,
      $log,
      AppConstants,
    })
  }

  save(data) {
    if (!data.id_pub) {
      return this.$http({
        url: this.AppConstants.vinculoEndPoint,
        method: "POST",
        data: data,
      })
    }

    return this.$http({
      url: `${this.AppConstants.vinculoEndPoint}${data.id_pub}/`,
      method: "PATCH",
      data: data,
    })
  }

  get(id_pub) {
    if (!id_pub) return false
    return this.$http({
      url: `${this.AppConstants.vinculoEndPoint}${id_pub}/`,
      method: "GET",
    })
  }

  list() {
    return this.$http({
      url: this.AppConstants.vinculoEndPoint,
      method: "GET",
    })
  }

  delete(id_pub) {
    return this.$http({
      url: `${this.AppConstants.vinculoEndPoint}${id_pub}/`,
      method: "DELETE",
    })
  }
}

export default Vinculacao
