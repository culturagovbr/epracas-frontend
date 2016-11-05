class VinculacaoCtrl {
  constructor($scope, $timeout, $mdDialog, Upload, AppConstants) {
    "ngInject";

    this._AppConstants = AppConstants;
    this._Upload = Upload;
    this._$mdDialog = $mdDialog;
    this._$timeout = $timeout;
    this._$scope = $scope;
    this._praca = $scope.praca;

    self = this;
  }

  cancel() {
    this._$mdDialog.cancel();
  }

  upload(vincFiles) {
    this._Upload.upload({
      url: `${this._AppConstants.api}/pracas/${this._praca.id_pub}/vinculo_upload/`,
      method: "POST",
      data: {
        cpfFile: vincFiles.CPF,
        compFile: vincFiles.comp
      },
    })
      .then(
        response => this._$timeout(() => { this._$scope.result = response.data }),
        (err) => { if (err.status > 0) { this._$scope.errorMsg = `${err.status}: ${err.data}` } },
        (evt) => this._$scope.progress = parseInt(100.0 * evt.loaded / evt.total),
      )
      .then(
        response => {
          this._$mdDialog.show(
            this._$mdDialog.alert({
              title: "Pedido Enviado",
              textContent: "Seu pedido de vinculo a esta praça foi enviado." + 
                "Você receberá um email em breve com mais detalhes.",
              ok: "Ok, entendi."
            })
          )
        },
      )
      .catch(
        err => {
          $log.log(`VinculacaoCtrl Error: ${err} - ${errorMsg}`);
          this._$mdDialog.show(
            this._$mdDialog.alert({
              title:"Erro!",
              textContent: "Ocorreu um erro durante o seu pedido." +
                "Nossa equipe está monitorando o sistema para soluciona-lo o mais rapido possivel.",
              ok: "Ok, estou ciente.",
            })
          )
        }
      );
  }
}

export default VinculacaoCtrl;
