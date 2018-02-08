import angular from "angular"

class ParceirosCtrl {
  constructor($state, $mdDialog, $http, $log, Upload, AppConstants, Toast
    , ErrorCatcher, Praca, praca, objValue, booDisabled) {
    "ngInject"

    const parceiro = objValue
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
      parceiro,
      booDisabled,
    })

    // this.strDisabled = (booDisabled)? '' : 'disabled="disabled"';
    parceiro.rec_financeiro = (typeof parceiro.recursos_financeiros !== "undefined" && parceiro.recursos_financeiros !== "0.00")
    this._listaAtividades = Praca.getAllRamoAtividade()
  }

  cancel() {
    this.$mdDialog.cancel()
  }

  save(praca_id_pub, data) {
    const caller = this.ErrorCatcher.callerName()
    delete data.imagem

    if (data.rec_financeiro === false) {
      data.recursos_financeiros = 0
    }

    if (data.imgFile) {
      data.imagem = this.Upload.dataUrltoBlob(data.imgFile)
    }
    if (data.id_pub) {
      this.Upload.upload({ url: `${this.AppConstants.api}/pracas/${praca_id_pub}/parceiros/${data.id_pub}/`, method: "PATCH", data: data })
        .then(() => { this.$mdDialog.hide(); this.Toast.showSuccessToast("Parceiro Cadastrado com Sucesso!"); this.$state.reload() })
        .catch(
          (err) => {
            this.ErrorCatcher.error(caller, err)
            this.$log.error(`saveParceiros: ${angular.toJson(err.status)} - ${angular.toJson(err.data)}`)
          })
    } else {
      this.Upload.upload({ url: `${this.AppConstants.api}/pracas/${praca_id_pub}/parceiros/`, method: "POST", data: data })
        .then(
          () => {
            this.$mdDialog.hide()
            this.Toast.showSuccessToast("Parceiro Cadastrado com Sucesso!")
            this.$state.reload() })
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