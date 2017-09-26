class UnidadeGestora {
  constructor($http, ErrorCatcher, AppConstants) {
    "ngInject"

    angular.extend(this, {
      $http,
      ErrorCatcher,
      AppConstants,
    })
  }

  options(praca) {
    const caller = this.ErrorCatcher.callerName()

    return this.$http({
      url: `${this.AppConstants.pracaEndPoint}${praca.id_pub}/unidadegestora/`,
      method: "OPTIONS",
    })
    .then(response => response.data)
    .then(data => data.actions.POST)
      .catch(
        (err) => {
          this.ErrorCatcher.error(caller, err)
        }
      )
  }

  list(praca) {
    const caller = this.ErrorCatcher.callerName()

    return this.$http({
      url: `${this.AppConstants.pracaEndPoint}${praca.id_pub}/unidadegestora/`,
      method: "GET"
    })
    .catch(
      (err) => {
        this.ErrorCatcher.error(caller, err)
        return this.$q.reject()
      }
    )
  }

  save(praca, membro) {
    const caller = this.ErrorCatcher.callerName()

    if (membro.id_pub) {
      return this.$http({
        url: `${this.AppConstants.pracaEndPoint}${praca.id_pub}/unidadegestora/${membro.id_pub}/`,
        method: "PATCH",
        data: membro,
      })
      .catch(
        (err) => {
          this.ErrorCatcher.error(caller, err)
          return this.$q.reject()
        }
      )
    }

    return this.$http({
      url: `${this.AppConstants.pracaEndPoint}${praca.id_pub}/unidadegestora/`,
      method: "POST",
      data: membro,
    })
    .catch(
      (err) => {
        this.ErrorCatcher.error(caller, err)
        return this.$q.reject()
      }
    )
  }

  delete(praca, membro) {
    const caller = this.ErrorCatcher.callerName()

    return this.$http({
      url: `${this.AppConstants.pracaEndPoint}${praca.id_pub}/unidadegestora/${membro.id_pub}/`,
      method: "DELETE",
    })
    .catch(
      (err) => {
        this.ErrorCatcher.error(caller, err)
        return this.$q.reject()
      }
    )
  }
}

export default UnidadeGestora
