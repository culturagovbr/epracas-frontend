class Vinculacao {
  constructor($http, $q, Upload, ErrorCatcher, AppConstants) {
    "ngInject"

    angular.extend(this, {
      $http,
      $q,
      Upload,
      AppConstants,
    })
  }

  save(data) {
    const caller = this.ErrorCatcher.callerName()

    if (!data.id_pub) {
      return this.$http({
        url: this.AppConstants.vinculoEndPoint,
        method: "POST",
        data: data,
      })
      .catch(
        (err) => {
          this.ErrorCatcher.error(caller, err)
          return this.$q.reject()
        }
      )
    }

    return this.$http({
      url: `${this.AppConstants.vinculoEndPoint}${data.id_pub}/`,
      method: "PATCH",
      data: data,
    })
    .catch(
      (err) => {
        this.ErrorCatcher.error(caller, err)
        return this.$q.reject()
      }
    )
  }

  get(id_pub) {
    const caller = this.ErrorCatcher.callerName()

    if (!id_pub) return false
    return this.$http({
      url: `${this.AppConstants.vinculoEndPoint}${id_pub}/`,
      method: "GET",
    })
    .catch(
      (err) => {
        this.ErrorCatcher.error(caller, err)
        return this.$q.reject()
      }
    )
  }

  list() {
    const caller = this.ErrorCatcher.callerName()

    return this.$http({
      url: this.AppConstants.vinculoEndPoint,
      method: "GET",
    })
    .catch(
      (err) => {
        this.ErrorCatcher.error(caller, err)
        return this.$q.reject()
      }
    )
  }

  delete(id_pub) {
    const caller = this.ErrorCatcher.callerName()

    return this.$http({
      url: `${this.AppConstants.vinculoEndPoint}${id_pub}/`,
      method: "DELETE",
    })
    .catch(
      (err) => {
        this.ErrorCatcher.error(caller, err)
        return this.$q.reject()
      }
    )
  }

  save_document(process_id_pub, data) {
    const caller = this.ErrorCatcher.callerName()

    if (!data.id_pub) {
      return this.Upload.upload({
        url: `${this.AppConstants.vinculoEndPoint}${process_id_pub}/documento/`,
        method: "POST",
        data: data,
      })
      .catch(
        (err) => {
          this.ErrorCatcher.error(caller, err)
          return this.$q.reject()
        }
      )
    }

    return this.$http({
      url: `${this.AppConstants.vinculoEndPoint}${process_id_pub}/documento/${data.id_pub}/`,
      method: "PATCH",
      data: data,
    })
    .catch(
      (err) => {
        this.ErrorCatcher.error(caller, err)
        return this.$q.reject()
      }
    )
  }

  get_document(process_id_pub, document_id_pub) {
    const caller = this.ErrorCatcher.callerName()

    if (!document_id_pub) return false

    return this.$http({
      url: `${this.AppConstants.vinculoEndPoint}${process_id_pub}/documento/${document_id_pub}/`,
      method: "GET",
    })
    .catch(
      (err) => {
        this.ErrorCatcher.error(caller, err)
        return this.$q.reject()
      }
    )
  }

  list_documents(process_id_pub) {
    const caller = this.ErrorCatcher.callerName()

    if (!process_id_pub) return false

    return this.$http({
      url: `${this.AppConstants.vinculoEndPoint}${process_id_pub}/documento/`,
      method: "GET",
    })
    .catch(
      (err) => {
        this.ErrorCatcher.error(caller, err)
        return this.$q.reject()
      }
    )
  }

  delete_document(process_id_pub, document_id_pub) {
    const caller = this.ErrorCatcher.callerName()

    return this.$http({
      url: `${this.AppConstants.vinculoEndPoint}${process_id_pub}/documento/${document_id_pub}/`,
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

export default Vinculacao
