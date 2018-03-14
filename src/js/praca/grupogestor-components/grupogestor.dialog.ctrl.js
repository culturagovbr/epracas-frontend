export default class GrupoGestorDialogController {
  constructor($state, $mdDialog, $log, Toast, GrupoGestor, praca, grupogestor) {
    "ngInject"

    angular.extend(this, {
      $state,
      $mdDialog,
      $log,
      Toast,
      GrupoGestor,
      praca,
      grupogestor,
    })

    this.isSaving = false

    this.GrupoGestor.options_grupogestor(praca)
      .then((data) => {
        this.listaTipoDocumento = data.tipo_documento.choices
      })

  }

  cancel() { this.$mdDialog.cancel() }

  save(praca, data) {
    this.isSaving = true

    this.GrupoGestor.save_grupogestor(praca, data)
      .then(
        (response) => {
          this.$mdDialog.hide()
          if (data.data_finalizacao != null) {
            this.Toast.showSuccessToast("Grupo Gestor Encerrado")
          } else {
            this.Toast.showSuccessToast("Grupo Gestor Adicionado")
          }
          this.$state.reload()
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
