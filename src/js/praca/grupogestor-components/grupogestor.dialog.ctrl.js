export default class GrupoGestorDialogController {
  constructor($http, $mdDialog, $log, Toast, GrupoGestor, praca, gg) {
    "ngInject"

    angular.extend(this, {
      $http,
      $mdDialog,
      $log,
      Toast,
      GrupoGestor,
      praca,
      gg,
    })

    this.isSaving = false

    this._listaTipoDocumento = [
      { value: "d", display_name: "Decreto" },
      { value: "p", display_name: "Portaria" },
      { value: "l", display_name: "Lei" },
      { value: "n", display_name: "Não Formalizado" },
    ]
  }

  cancel() { this.$mdDialog.cancel() }

  save(praca, data) {
    this.isSaving = true

    this.GrupoGestor.save_grupogestor(praca, data)
      .then(
        (response) => {
          this.$mdDialog.hide()
          this.Toast.showSuccessToast("Grupo Gestor Adicionado")
        }
      )
      .catch(
        (err) => {
          this.$log.error(`Erro ao salvar grupo gestor ${angular.toJson(err.status)}, ${angular.toJson(err.data)}`)
          this.Toast.showRejectedToast("Erro ao adicionar Grupo Gestor")
        }
      )
  }
}
