export default class MembroUglDialogController {
  constructor($state, $mdDialog, $log, Toast, UnidadeGestora, praca) {
    "ngInject"

    angular.extend(this, {
      $state,
      $mdDialog,
      $log,
      Toast,
      UnidadeGestora,
      praca,
    })

    this.UnidadeGestora.options(praca)
      .then((data) => {
        this.listaTipoMembro = data.tipo.choices
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
          this.$state.reload()
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
