export default class MembroGestorDialogController {
  constructor($http, $mdDialog, $log, Toast, GrupoGestor, praca) {
    "ngInject"

    angular.extend(this, {
      $http,
      $mdDialog,
      $log,
      Toast,
      GrupoGestor,
      praca,
    })

    this.GrupoGestor.options_grupogestor(praca)
      .then((data) => {
        this.listaConstituicao = data.tipo_documento.choices
      })

    this.GrupoGestor.options_membrogestor(praca)
      .then((data) => {
        this.listaOrigem = data.origem.choices
      })
  }

  cancel() { this.$mdDialog.cancel() }

  save(praca, membro) {
    this.isSaving = true

    this.GrupoGestor.save_membrogestor(praca.id_pub, praca.grupo_gestor.id_pub, membro)
      .then(
        (response) => {
          this.$mdDialog.hide()
          this.Toast.showSuccessToast("Membro Gestor Adicionado")
        }
      )
      .catch(
        (err) => {
          this.$log.error(`Erro ao salvar membro gestor ${angular.toJson(err.status)}, ${angular.toJson(err.data)}`)
          this.Toast.showRejectedToast("Erro ao adicionar gestor")
        }
      )
  }

  showFinalizaGrupoGestorDialog(praca) {
    const grupogestor = praca.grupo_gestor
    this.$mdDialog.show({
      controller: "GrupoGestorDialogController",
      controllerAs: "$ctrl",
      templateUrl: "praca/grupogestor-components/finaliza-grupogestor.dialog.tmpl.html",
      locals: { praca, grupogestor },
      fullscreen: true,
    })
  }

}
