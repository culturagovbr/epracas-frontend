class Atores {
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
      url: `${this.AppConstants.pracaEndPoint}${praca.id_pub}/atores/`,
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

  save(praca, ator) {
    const caller = this.ErrorCatcher.callerName()

    if (ator.id_pub) {
      return this.$http({
        url: `${this.AppConstants.pracaEndPoint}${praca.id_pub}/atores/${ator.id_pub}/`,
        method: "PATCH",
        data: ator,
      })
      .catch(
        (err) => {
          this.ErrorCatcher.error(caller, err)
          return this.$q.reject()
        }
      )
    }

    return this.$http({
      url: `${this.AppConstants.pracaEndPoint}${praca.id_pub}/atores/`,
      method: "POST",
      data: ator,
    })
    .catch(
      (err) => {
        this.ErrorCatcher.error(caller, err)
        return this.$q.reject()
      }
    )
  }

  list(praca){
    const caller = this.ErrorCatcher.callerName()

    return this.$http({
      url: `${this.AppConstants.pracaEndPoint}${praca.id_pub}/atores/`,
      method: "GET",
    })
    .catch(
      (err) => {
        this.ErrorCatcher.error(caller, err)
        return this.$q.reject()
      }
    )
  }

  delete(praca, ator) {
    const caller = this.ErrorCatcher.callerName()

    return this.$http({
      url: `${this.AppConstants.pracaEndPoint}${praca.id_pub}/atores/${ator.id_pub}/`,
      method: "DELETE",
      data: ator,
    })
    .catch(
      (err) => {
        this.ErrorCatcher.error(caller, err)
        return this.$q.reject()
      }
    )
  }
}

export default Atores
