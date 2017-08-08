import moment from "moment"

class GrupoGestor {
  constructor($http, ErrorCatcher, Upload, AppConstants) {
    "ngInject"

    angular.extend(this, {
      $http,
      ErrorCatcher,
      Upload,
      AppConstants,
    })
  }

  save_grupogestor(praca, grupogestor) {
    const caller = this.ErrorCatcher.callerName()

    grupogestor.data_instituicao = moment(grupogestor.data_instituicao).format("YYYY-MM-DD")

    if (grupogestor.data_finalizacao) {
      grupogestor.data_finalizacao = moment(grupogestor.data_finalizacao).format("YYYY-MM-DD")
      delete grupogestor.estatuto
      delete grupogestor.documento_constituicao
    }

    if (grupogestor.id_pub) {
      delete grupogestor.documento_constituicao
      return this.$http({
        url: `${this.AppConstants.pracaEndPoint}${praca}/grupogestor/${grupogestor.id_pub}/`,
        method: "PATCH",
        data: grupogestor,
      })
      .catch(
        (err) => {
          this.ErrorCatcher.error(caller, err)
          return this.$q.reject()
        }
      )
    }

    return this.Upload.upload({
      url: `${this.AppConstants.pracaEndPoint}${praca}/grupogestor/`,
      method: "POST",
      data: grupogestor,
    })
    .catch(
      (err) => {
        this.ErrorCatcher.error(caller, err)
        return this.$q.reject()
      }
    )
  }

  delete_grupogestor(praca, grupogestor) {
    const caller = this.ErrorCatcher.callerName()

    return this.$http({
      url: `${this.AppConstants.pracaEndPoint}${praca}/grupogestor/${grupogestor.id_pub}/`,
      method: "DELETE",
    })
    .catch(
      (err) => {
        this.ErrorCatcher.error(caller, err)
        return this.$q.reject()
      }
    )
  }

  options_grupogestor(praca) {
    const caller = this.ErrorCatcher.callerName()

    return this.$http({
      url: `${this.AppConstants.pracaEndPoint}${praca.id_pub}/grupogestor/`,
      method: "OPTIONS",
    })
    .then(response => response.data)
    .then(data => data.actions.POST)
    .catch(
      (err) => {
        this.ErrorCatcher.error(caller, err)
        return this.$q.reject()
      }
    )
  }

  save_membrogestor(praca, grupogestor, membrogestor) {
    const caller = this.ErrorCatcher.callerName()

    membrogestor.data_posse = moment(membrogestor.data_posse).format("YYYY-MM-DD")
    if (membrogestor.data_desligamento) {
      membrogestor.data_desligamento = moment(membrogestor.data_desligamento).format("YYYY-MM-DD")
    }
    if (membrogestor.id_pub) {
      return this.$http({
        url: `${this.AppConstants.pracaEndPoint}${praca}/grupogestor/${grupogestor}/membrogestor/${membrogestor.id_pub}/`,
        method: "PATCH",
        data: membrogestor,
      })
      .catch(
        (err) => {
          this.ErrorCatcher.error(caller, err)
          return this.$q.reject()
        }
      )
    }
    return this.$http({
      url: `${this.AppConstants.pracaEndPoint}${praca}/grupogestor/${grupogestor}/membrogestor/`,
      method: "POST",
      data: membrogestor,
    })
    .catch(
      (err) => {
        this.ErrorCatcher.error(caller, err)
        return this.$q.reject()
      }
    )
  }

  delete_membrogestor(praca, grupogestor, membrogestor) {
    const caller = this.ErrorCatcher.callerName()

    return this.$http({
      url: `${this.AppConstants.pracaEndPoint}${praca}/grupogestor/${grupogestor}/membrogestor/${membrogestor}/`,
      method: "DELETE",
    })
    .catch(
      (err) => {
        this.ErrorCatcher.error(caller, err)
        return this.$q.reject()
      }
    )
  }

  options_membrogestor(praca) {
    const caller = this.ErrorCatcher.callerName()

    return this.$http({
      url: `${this.AppConstants.pracaEndPoint}${praca.id_pub}/grupogestor/${praca.grupo_gestor.id_pub}/membrogestor/`,
      method: "OPTIONS",
    })
    .then(response => response.data)
    .then(data => data.actions.POST)
    .catch(
      (err) => {
        this.ErrorCatcher.error(caller, err)
        return this.$q.reject()
      }
    )
  }
}

export default GrupoGestor
