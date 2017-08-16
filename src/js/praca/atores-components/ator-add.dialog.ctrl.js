export default class AtorAddDialogController {
  constructor($mdDialog, $log, Toast, Atores, praca, ator) {
    "ngInject"

    angular.extend(this, {
      $mdDialog,
      $log,
      Toast,
      Atores,
      praca,
      ator,
    })

    this.isSaving = false

    Atores.options(praca)
      .then((data) => {
        this.listaArea = data.area.choices
        this.listaDescricao = data.descricao.choices
      })
  }

  cancel() { this.$mdDialog.cancel() }

  save(praca, rh) {
    this.isSaving = true

    this.RecursoHumano.save(praca, rh)
      .then(
        (response) => {
          this.$mdDialog.hide()
          this.Toast.showSuccessToast("Recurso Humano Adicionado")
        }
      )
      .catch(
        (err) => {
          this.$log.error(`Erro ao salvar Recurso Humano${angular.toJson(err.status)}, ${angular.toJson(err.data)}`)
          this.Toast.showRejectedToast("Erro ao adicionar Rh")
        }
      )
  }
}
