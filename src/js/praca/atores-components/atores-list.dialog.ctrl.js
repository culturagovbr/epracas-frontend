export default class AtoresListDialogController {
  constructor($state, $mdDialog, $log, orderByFilter, Toast, Atores, ErrorCatcher, praca) {
    "ngInject"

    angular.extend(this, {
      $state,
      $mdDialog,
      $log,
      orderByFilter,
      Toast,
      Atores,
      ErrorCatcher,
      praca,
    })

    this.isSaving = false

    Atores.list(praca)
    .then(res => this.atores = res.data)
  }

  cancel() { this.$mdDialog.cancel() }

  atorEditDialog(praca, ator) {
    this.$mdDialog.show({
      controller: "AtoresCtrl",
      controllerAs: "$ctrl",
      templateUrl: "praca/atores-components/atores-dialog.tmpl.html",
      locals: { praca, ator },
      fullscreen: true,
      multiple: true,
    })
  }

  atorDelDialog(praca, ator) {
    const caller = this.ErrorCatcher.callerName()

    this.$mdDialog.show(
      this.$mdDialog.confirm()
      .title("Excluir Ator")
      .textContent("Ao excluir uma informação, você subtrai ela do sistema e impede que ela seja processada para qualquer tipo de estatistica. Tem certeza que deseja excluir esta informação?")
      .ariaLabel("Excluir Ator")
      .ok("Sim, excluir o Ator")
      .cancel("Não, não excluir o Ator"))
      .then(() => {
        this.Atores.delete(praca, ator)
          .then(() => {
            this.atores = this.atores.filter(res => res !== ator)
            this.Toast.showSuccessToast("Ator excluido com sucesso")
            this.$state.reload()
          })
          .catch((err) => {
            this.Toast.showRejectedToast("Erro ao excluir ator")
            this.ErrorCatcher.error(caller, err)
          })
      })
  }
}
