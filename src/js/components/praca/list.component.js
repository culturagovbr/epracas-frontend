class ListElementController {
  constructor($scope, $state) {
    "ngInject";
  }
}

const ListElement = {
  controller: ListElementController,
  template: `
    <md-list>
      <praca-card ng-repeat="praca in $ctrl.pracas |
        filter:{
          municipio: $ctrl.filter.municipio,
          uf: $ctrl.filter.uf,
          modelo: $ctrl.filter.modelo,
          situacao: $ctrl.filter.situacao
          }"
          praca="praca">
      </praca-card>
    </md-list>
  `,
  bindings: {
    pracas: "=",
    filter: "=",
  },
};

export default ListElement;
