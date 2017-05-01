class VinculacaoCtrl {
  constructor($http, $scope, $timeout, $log, $mdDialog, Upload, AppConstants, Vinculacao, praca) {
    "ngInject"

    angular.extend(this, {
      $http,
      $scope,
      $timeout,
      $log,
      $mdDialog,
      Upload,
      AppConstants,
      Vinculacao,
      praca,
    })
  }

  cancel() {
    this.$mdDialog.cancel()
  }

  upload(id_pub, vincFiles) {
    this.$mdDialog.show({
      clickOutsideToClose: false,
      template: `
        <div layout="row" layout-padding layout-align="center center">
          <div flex=30>
            <md-progress-circular md-mode="indeterminate"></md-progress-circular>
          </div>
          <div flex=70>
            <p>Salvando informações sobre Pedido de Vinculação.
            Por favor, aguarde.</p>
          </div>
        </div>
        `,
    })
    this.Vinculacao.save({ praca: id_pub })
    .then(
        (processo) => {
          this.Vinculacao.save_document(
              processo.data.id_pub,
              { cpfFile: vincFiles.CPF, compFile: vincFiles.comp }
          )
          .then(
              (response) => { this.$timeout(() => { this.$scope.result = response.data }) },
              (err) => { if (err.status > 0) { this.$scope.errorMsg = `${err.status}: ${err.data}` } },
              (evt) => { this.$scope.progress = parseInt((100.0 * evt.loaded) / evt.total, 10) }
          )
          .then(
              () => {
                this.$mdDialog.show(
                    this.$mdDialog.alert({
                      title: "Pedido Enviado",
                      textContent: `Seu pedido de vinculo a esta praça foi enviado.
                        Você receberá um email em breve com mais detalhes.`,
                      ok: "Ok, entendi.",
                    })
                )
              }
          )
        }
    )
    .catch(
      (err) => {
        if (err.status > 400) {
          this.$log.log(`VinculacaoCtrl Error: ${angular.toJson(err.status)} - ${angular.toJson(err.data)}`)
          this.$mdDialog.show(
              this.$mdDialog.alert({
                title: "Permissão negada!",
                textContent: `Você não tem permissão para fazer o envio de arquivo. Se você não é gestor
                  do Ministério da Cultura e não consegue enviar os documentos, entre em contato.`,
                ok: "Ok, estou ciente.",
              })
          )
        } else {
          this.$log.log(`VinculacaoCtrl Error: ${angular.toJson(err.status)} - ${angular.toJson(err.data)}`)
          this.$mdDialog.show(
              this.$mdDialog.alert({
                title: "Erro!",
                textContent: "Ocorreu um erro durante o seu pedido." +
                  "Nossa equipe está monitorando o sistema para soluciona-lo o mais rapido possivel.",
                ok: "Ok, estou ciente.",
              })
          )
        }
      }
    )
  }
}

export default VinculacaoCtrl
