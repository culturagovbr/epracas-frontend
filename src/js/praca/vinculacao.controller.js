class VinculacaoCtrl {
  constructor($http, $scope, $timeout, $log, $mdDialog, Upload, AppConstants) {
    "ngInject";

    angular.extend(this, {
      _$http: $http,
      _$scope: $scope,
      _$timeout: $timeout,
      _$log: $log,
      _$mdDialog: $mdDialog,
      _Upload: Upload,
      _AppConstants: AppConstants,
      _praca: $scope.praca,
    })

    // this._AppConstants = AppConstants;
    // this._Upload = Upload;
    // this._$mdDialog = $mdDialog;
    // this._$timeout = $timeout;
    // this._$scope = $scope;
    // this._praca = $scope.praca;

    // self = this;
  }

  cancel() {
    this._$mdDialog.cancel();
  }

  upload(vincFiles) {
    this._$mdDialog.show({
      clickOutsideToClose: false,
      template: `
        <div layout="column" layout-align="space-around">
          <div flex=30>
            <md-progress-circular></md-progress-circular>
          </div>
          <div flex=70>
            <span>Salvando informações sobre Pedido de Vinculação.
            Por favor, aguarde.</span>
          </div>
        </div>
        `
    })
    this._$http({
      url: `${this._AppConstants.api}/processo/`,
      method: "POST",
      data: {
        praca: this._praca.id_pub,
      },
    })
    .then(
        response => {
          this._Upload.upload({
            url: `${this._AppConstants.api}/processo/${response.id_pub}/documento/`,
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
        }
    )
    .catch(
      err => {
        if (err.status == 403) {
          this._$log.log(`VinculacaoCtrl Error: ${angular.toJson(err.status)} - ${angular.toJson(err.data)}`);
          this._$mdDialog.show(
              this._$mdDialog.alert({
                title:"Permissão negada!",
                textContent: `Você não tem permissão para fazer o envio de arquivo. Se você não é gestor
                  do Ministério da Cultura e não consegue enviar os documentos, entre em contato.`,
                ok: "Ok, estou ciente.",
              })
          )
        } else {
          this._$log.log(`VinculacaoCtrl Error: ${angular.toJson(err.status)} - ${angular.toJson(err.data)}`);
          this._$mdDialog.show(
              this._$mdDialog.alert({
                title:"Erro!",
                textContent: "Ocorreu um erro durante o seu pedido." +
                  "Nossa equipe está monitorando o sistema para soluciona-lo o mais rapido possivel.",
                ok: "Ok, estou ciente.",
              })
          )
        }
      }
    );
  }
}

export default VinculacaoCtrl;
