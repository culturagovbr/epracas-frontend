class ListElementController {
  constructor($log, $mdDialog, Toast, Praca) {
    "ngInject"

    angular.extend(this, {
      $log,
      $mdDialog,
      Toast,
      Praca,
    })
  }

  excluirPraca(praca) {
    this.$mdDialog.show(
      this.$mdDialog.confirm()
      .title("Excluir Praça")
      .textContent("Ao excluir uma Praça, tanto ela quanto seus itens relacionados, como Gestores, Imagens e outras informações deixam de ser públicas, apesar de permanecerem no sistema. Deseja continuar?")
      .ariaLabel("Excluir Praça")
      .ok("Sim, excluir esta Praça")
      .cancel("Não, mantenha a Praça")
    )
      .then(
        () => {
          this.Praca.delete(praca.id_pub)
            .then(
              () => {
                this.pracas = this.pracas.filter(res => res !== praca)
                this.Toast.showSuccessToast("Praça Arquivada.")
              })
            .catch(
              (err) => {
                this.$log.error(`Erro ao excluir a Praça. ${angular.toJson(err.status)} - ${angular.toJson(err.data)}`)
                this.Toast.showRejectedToast("Erro ao excluir a Praça.")
              }
            )
        }
      )
  }

}

const ListElement = {
  controller: ListElementController,
  template: `
    <md-list>
      <praca-card ng-repeat="praca in $ctrl.pracas track by praca.id_pub"
          praca="praca" on-delete="$ctrl.excluirPraca(praca)">
      </praca-card>
    </md-list>
  `,
  bindings: {
    pracas: "=",
  },
}

export default ListElement
