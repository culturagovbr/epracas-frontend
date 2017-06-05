class MembroGestorDialogController {
  constructor($http, $mdDialog, $log, GrupoGestor) {
    "ngInject"

    angular.extend(this, {
      $http,
      $mdDialog,
      $log,
      GrupoGestor,
    })

    this.listaOrigem = [
      { value: 1, display_name: "Poder Publico" },
      { value: 2, display_name: "Sociedade Civil" },
      { value: 3, display_name: "Moradores do Entorno" },
    ]

    this.listaConstituicao = [
      { value: 1, display_name: "Decreto" },
      { value: 2, display_name: "Portaria" },
      { value: 3, display_name: "Lei" },
      { value: 4, display_name: "Não formalizado" },
    ]
  }

  cancel() { this.$mdDialog.cancel() }

  save(praca, membro) {
    this.isSaving = true
    const gg = praca.grupogestor[0]

    this.GrupoGestor.save_membrogestor(praca, gg, membro)
      .then(
        (response) => {
          this.$mdDialog.hide()
          this.Toast.showSuccessToast("Membro Gestor Adicionado")
        }
      )
      .catch(
        (err) => {
          this.$log.error(`Erro ao salvar membro gestor ${err.status}, {err.data}`)
          this.Toast.showRejectedToast("Erro ao adicionar gestor")
        }
      )
  }
}

export default MembroGestorDialogController
