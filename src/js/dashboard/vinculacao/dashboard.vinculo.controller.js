class DashboardVinculoCtrl {
  constructor($mdDialog, $document, $log, ErrorCatcher, Toast, Praca, Vinculacao, AppConstants) {
    "ngInject"

      angular.extend(this, {
        $mdDialog,
        $document,
        $log,
        ErrorCatcher,
        Toast,
        Praca,
        Vinculacao,
        AppConstants,
      })

    this.pedidos = ""
    Vinculacao.list()
      .then(result => (this.pedidos = result.data))
      .catch(err => $log.log(`Error: DashboardVinculoCtrl ${angular.toJson(err)}`))
  }

  showUserInfo(user) {
    this.$mdDialog.show({})
  }

  showPracaInfo(praca) {
    this.Praca.get(praca.id_pub)
      .then((result) => {
        this.$mdDialog.show({
          controller: "PracaInfoCtrl",
          controllerAs: "$ctrl",
          templateUrl: "praca/pracainfo-dialog.tmpl.html",
          parent: angular.element(this.$document.body),
          locals: { praca: result },
        })
      })
  }

  startProcessoVinculacao(pedido) {
    this.$mdDialog.show({
      controller: "DashboardVinculoDialogCtrl",
      controllerAs: "$ctrl",
      templateUrl: "dashboard/vinculacao/vinculo-dialog.tmpl.html",
      parent: angular.element(this.$document.body),
      locals: { pedido: pedido },
    })
  }

  deleteProcessoVinculacao(pedido) {
    this.$mdDialog.show(
        this.$mdDialog.confirm()
        .title("Excluir Pedido de Vinculação")
        .textContent("Ao excluir um pedido de vinculação de um usuário à uma praça, você automaticamente excluir também os arquivos anexos a este pedido. Deseja continuar?")
        .ariaLabel("Excluir Pedido de Vinculação")
        .ok("Sim, excluir este pedido")
        .cancel("Não, mantenha o pedido")
        )
      .then(
          () => this.Vinculacao.delete(pedido.id_pub)
          .then(() => {
            const index = this.pedidos.indexOf(pedido)
            if (index > -1) {
              this.pedidos.splice(index, 1)
            }
          this.Toast.showSuccessToast("Pedido excluido com sucesso")
          })
          .catch(err => this.Toast.showRejectedToast(`Problema ao excluir pedido ${err.status} - ${err.data}`))
          )
  }
}

export default DashboardVinculoCtrl
