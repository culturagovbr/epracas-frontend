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

  save_membrogestor(praca, grupogestor, membrogestor) {
    if (membrogestor.id_pub) {
      return this.$http({
        url: `${this.AppConstants.pracaEndPoint}${praca}/grupogestor/${grupogestor.id_pub}/membrogestor/${membrogestor.id_pub}/`,
        method: "PATCH",
        data: membrogestor,
      })
    }
    return this.$http({
      url: `${this.AppConstants.pracaEndPoint}${praca}/grupogestor/${grupogestor.id_pub}/membrogestor/${membrogestor.id_pub}/`,
      method: "POST",
      data: membrogestor,
    })
  }

  delete_membrogestor(praca, grupogestor, membrogestor) {
    return this.$http({
      url: `${this.AppConstants.pracaEndPoint}${praca}/grupogestor/${grupogestor.id_pub}/membrogestor/${membrogestor.id_pub}/`,
      method: "DELETE",
    })
  }
}

export default GrupoGestor
