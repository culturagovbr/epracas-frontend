import moment from "moment"

class RecursoHumano {
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
      url: `${this.AppConstants.pracaEndPoint}${praca.id_pub}/rh/`,
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

  save(praca, rh) {
    const caller = this.ErrorCatcher.callerName()

    if (rh.data_entrada) { rh.data_entrada = moment(rh.data_entrada).format("YYYY-MM-DD") }
    if (rh.data_saida) { rh.data_saida = moment(rh.data_saida).format("YYYY-MM-DD") }

    if (rh.id_pub) {
      return this.$http({
        url: `${this.AppConstants.pracaEndPoint}${praca.id_pub}/rh/${rh.id_pub}/`,
        method: "PATCH",
        data: rh,
      })
      .catch(
        (err) => {
          this.ErrorCatcher.error(caller, err)
          return this.$q.reject()
        }
      )
    }

    return this.$http({
      url: `${this.AppConstants.pracaEndPoint}${praca.id_pub}/rh/`,
      method: "POST",
      data: rh,
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
      url: `${this.AppConstants.pracaEndPoint}${praca.id_pub}/rh/`,
      method: "GET",
    })
    .catch(
      (err) => {
        this.ErrorCatcher.error(caller, err)
        return this.$q.reject()
      }
    )
  }

  delete(praca, rh) {
    const caller = this.ErrorCatcher.callerName()

    if (rh.data_entrada) { rh.data_entrada = moment(rh.data_entrada).format("YYYY-MM-DD") }
    if (rh.data_saida) { rh.data_saida = moment(rh.data_saida).format("YYYY-MM-DD") }

    return this.$http({
      url: `${this.AppConstants.pracaEndPoint}${praca.id_pub}/rh/${rh.id_pub}/`,
      method: "DELETE",
      data: rh,
    })
    .catch(
      (err) => {
        this.ErrorCatcher.error(caller, err)
        return this.$q.reject()
      }
    )
  }
}

export default RecursoHumano
