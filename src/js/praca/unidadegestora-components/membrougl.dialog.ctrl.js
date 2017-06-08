export default class MembroUglDialogController {
  constructor($http, $mdDialog, $log, Toast, UnidadeGestora, praca) {
    "ngInject"

    angular.extend(this, {
      $http,
      $mdDialog,
      $log,
      Toast,
      UnidadeGestora,
      praca,
    })
  }

  cancel() { this.$mdDialog.cancel() }

  save(praca, membro) {
    this.isSaving = true

    this.UnidadeGestora.save(praca, membro)
      .then(
        (response) => {
          this.$mdDialog.hide()
          this.Toast.showSuccessToast("Membro da UGL Adicionado")
        }
      )
      .catch(
        (err) => {
          this.$log.error(`Erro ao salvar membro da UGL ${angular.toJson(err.status)}, ${angular.toJson(err.data)}`)
          this.Toast.showRejectedToast("Erro ao adicionar membro")
        }
      )
  }


}
