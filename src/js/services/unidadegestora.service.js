class UnidadeGestora {
  constructor($http, AppConstants) {
    "ngInject"

    angular.extend(this, {
      $http,
      AppConstants,
    })
  }

  save(praca, membro) {
    if (membro.id_pub) {
      return this.$http({
        url: `${this.AppConstants.pracaEndPoint}${praca.id_pub}/unidadegestora/${membro.id_pub}/`,
        method: "PATCH",
        data: membro,
      })
    }
    return this.$http({
      url: `${this.AppConstants.pracaEndPoint}${praca.id_pub}/unidadegestora/`,
      method: "POST",
      data: membro,
    })
  }

  delete(praca, membro) {
    return this.$http({
      url: `${this.AppConstants.pracaEndPoint}${praca.id_pub}/unidadegestora/${membro.id_pub}/`,
      method: "DELETE",
    })
  }
}

export default UnidadeGestora
