class ParceirosCtrl {
  constructor($state, $mdDialog, $http, $log, Upload, AppConstants, Toast, ErrorCatcher, praca) {
    "ngInject"

    angular.extend(this, {
      $state,
      $mdDialog,
      $http,
      $log,
      Upload,
      AppConstants,
      Toast,
      ErrorCatcher,
      praca,
    })

    this._listaAtividades = [
      {
        value: 1,
        display_name: "agropecuária",
      },
      {
        value: 2,
        display_name: "assistência social",
      },
      {
        value: 3,
        display_name: "comércio",
      },
      {
        value: 4,
        display_name: "comunicação",
      },
      {
        value: 5,
        display_name: "cultura",
      },
      {
        value: 6,
        display_name: "educação",
      },
      {
        value: 7,
        display_name: "esporte",
      },
      {
        value: 8,
        display_name: "indústria",
      },
      {
        value: 9,
        display_name: "organização comunitária",
      },
      {
        value: 10,
        display_name: "organização social",
      },
      {
        value: 11,
        display_name: "saúde",
      },
      {
        value: 12,
        display_name: "serviços",
      },
    ]
  }

  cancel() {
    this.$mdDialog.cancel()
  }

  save(praca_id_pub, data) {
    const caller = this.ErrorCatcher.callerName()
    delete data.imagem

    if (data.imgFile) { data.imagem = this.Upload.dataUrltoBlob(data.imgFile) }
    if(data.id_pub){
      this.Upload.upload({
        url: `${this.AppConstants.api}/pracas/${praca_id_pub}/parceiros/${data.id_pub}/`,
        method: "PATCH",
        data: data,
      })
        .then(
          () => {
            this.$mdDialog.hide()
            this.Toast.showSuccessToast("Parceiro Cadastrado com Sucesso!")
            this.$state.reload()
          }
        )
        .catch(
          (err) => {
            this.ErrorCatcher.error(caller, err)
          this.$log.error(`saveParceiros: ${angular.toJson(err.status)} - ${angular.toJson(err.data)}`)
          })
    } else {
      this.Upload.upload({
        url: `${this.AppConstants.api}/pracas/${praca_id_pub}/parceiros/`,
        method: "POST",
        data: data,
      })
        .then(
          () => {
            this.$mdDialog.hide()
            this.Toast.showSuccessToast("Parceiro Cadastrado com Sucesso!")
            this.$state.reload()
          }
        )
        .catch(
          (err) => {
            this.ErrorCatcher.error(caller, err)
          this.$log.error(`saveParceiros: ${angular.toJson(err.status)} - ${angular.toJson(err.data)}`)
          })
    }
  }

  ImgDialog() {
    this.$mdDialog.show({
      controller: "ParceiroImgController",
      controllerAs: "$ctrl",
      templateUrl: "praca/parceiros-components/parceiros-img-upload.dialog.tmpl.html",
      multiple: true,
    })
    .then(data => (this.parceiro.imgFile = data))
  }
}

export default ParceirosCtrl
