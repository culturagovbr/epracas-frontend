class ListElementController {
  constructor($log, $mdDialog, Toast, Praca) {
    "ngInject";

    angular.extend(this, {
      _$log: $log,
      _$mdDialog: $mdDialog,
      _Toast: Toast,
      _Praca: Praca,
    })
  }

  excluirPraca(praca){

    this._$mdDialog.show(
        this._$mdDialog.confirm()
        .title("Excluir Praça")
        .textContent("Ao excluir uma Praça, tanto ela quanto seus itens relacionados, como Gestores, Imagens e outras informações deixam de ser públicas, apesar de permanecerem no sistema. Deseja continuar?")
        .ariaLabel("Excluir Praça")
        .ok("Sim, excluir esta Praça")
        .cancel("Não, mantenha a Praça")
        )
      .then(
          () => {
            this._Praca.delete(praca.id_pub)
              .then(
                  response => {
                  let idx = this.pracas.indexOf(praca);
                  if(idx >= 0) {
                    this.pracas.splice(idx, 1);
                  }
                  this._Toast.showSuccessToast("Praça Arquivada.");
              })
              .catch(
                  err => {
                    this._$log.error(`Erro ao excluir a Praça. ${angular.toJson(err.status)} - ${angular.toJson(err.data)}`);
                    this._Toast.showRejectedToast("Erro ao excluir a Praça.");
                  }
                );
          }
        );
  }
}

const ListElement = {
  controller: ListElementController,
  template: `
    <md-list>
      <praca-card ng-repeat="praca in $ctrl.pracas |
        filter:{
          contrato: $ctrl.filter.contrato,
          regiao: $ctrl.filter.regiao,
          municipio: $ctrl.filter.municipio,
          uf: $ctrl.filter.uf,
          modelo: $ctrl.filter.modelo,
          situacao: $ctrl.filter.situacao
          }"
          praca="praca" on-delete="$ctrl.excluirPraca(praca)">
      </praca-card>
    </md-list>
  `,
  bindings: {
    pracas: "=",
    filter: "=",
  },
};

export default ListElement;
