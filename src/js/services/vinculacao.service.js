class Vinculacao {
  constructor($http, $log, Upload, AppConstants) {
    "ngInject"

    angular.extend(this, {
      $http,
      $log,
      Upload,
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

  save_document(process_id_pub, data) {
    if (!data.id_pub) {
      return this.Upload.upload({
        url: `${this.AppConstants.vinculoEndPoint}${process_id_pub}/documento/`,
        method: "POST",
        data: data,
      })
    }

    return this.$http({
      url: `${this.AppConstants.vinculoEndPoint}${process_id_pub}/documento/${data.id_pub}/`,
      method: "PATCH",
      data: data,
    })
  }

  get_document(process_id_pub, document_id_pub) {
    if (!document_id_pub) return false

    return this.$http({
      url: `${this.AppConstants.vinculoEndPoint}${process_id_pub}/documento/${document_id_pub}/`,
      method: "GET",
    })
  }

  list_documents(process_id_pub) {
    if (!process_id_pub) return false

    return this.$http({
      url: `${this.AppConstants.vinculoEndPoint}${process_id_pub}/documento/`,
      method: "GET",
    })
  }

  delete_document(process_id_pub, document_id_pub) {
    return this.$http({
      url: `${this.AppConstants.vinculoEndPoint}${process_id_pub}/documento/${document_id_pub}/`,
      method: "DELETE",
    })
  }
}

export default Vinculacao
