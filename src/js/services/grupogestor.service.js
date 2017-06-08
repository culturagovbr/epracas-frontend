import moment from "moment"

class GrupoGestor {
  constructor($http, Upload, AppConstants) {
    "ngInject"

    angular.extend(this, {
      $http,
      Upload,
      AppConstants,
    })
  }

  save_grupogestor(praca, grupogestor) {
    grupogestor.data_instituicao = moment(grupogestor.data_instituicao).format("YYYY-MM-DD")
    if (grupogestor.data_finalizacao) {
      grupogestor.data_finalizacao = moment(grupogestor.data_finalizacao).format("YYYY-MM-DD")
    }
    if (grupogestor.id_pub) {
      delete grupogestor.documento_constituicao
      return this.$http({
        url: `${this.AppConstants.pracaEndPoint}${praca}/grupogestor/${grupogestor.id_pub}/`,
        method: "PATCH",
        data: grupogestor,
      })
    }
    return this.Upload.upload({
      url: `${this.AppConstants.pracaEndPoint}${praca}/grupogestor/`,
      method: "POST",
      data: grupogestor,
    })
  }

  delete_grupogestor(praca, grupogestor) {
    return this.$http({
      url: `${this.AppConstants.pracaEndPoint}${praca}/grupogestor/${grupogestor.id_pub}/`,
      method: "DELETE",
    })
  }

  options_grupogestor(praca) {
    return this.$http({
      url: `${this.AppConstants.pracaEndPoint}${praca.id_pub}/grupogestor/`,
      method: "OPTIONS",
    })
    .then(response => response.data)
    .then(data => data.actions.POST)
  }

  save_membrogestor(praca, grupogestor, membrogestor) {
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
    }
    return this.$http({
      url: `${this.AppConstants.pracaEndPoint}${praca}/grupogestor/${grupogestor}/membrogestor/`,
      method: "POST",
      data: membrogestor,
    })
  }

  delete_membrogestor(praca, grupogestor, membrogestor) {
    return this.$http({
      url: `${this.AppConstants.pracaEndPoint}${praca}/grupogestor/${grupogestor}/membrogestor/${membrogestor}/`,
      method: "DELETE",
    })
  }

  options_membrogestor(praca) {
    return this.$http({
      url: `${this.AppConstants.pracaEndPoint}${praca.id_pub}/grupogestor/${praca.grupo_gestor.id_pub}/membrogestor/`,
      method: "OPTIONS",
    })
    .then(response => response.data)
    .then(data => data.actions.POST)
  }
}

export default GrupoGestor
