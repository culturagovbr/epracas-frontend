class ListElementController {
  constructor($scope, $state) {
    "ngInject";

    this.situations = [
      {
        value: "",
        descricao: "",
      },
      {
        value: "i",
        descricao: "Inaugurada",
      },
      {
        value: "a",
        descricao: "Obras em Andamento",
      },
      {
        value: "c",
        descricao: "Obras Concluidas",
      },
    ];

    this.models = [
      {
        value: "",
        descricao: "",
      },
      {
        value: "p",
        descricao: "700m²",
      },
      {
        value: "m",
        descricao: "3000m²",
      },
      {
        value: "g",
        descricao: "7000m²",
      },
    ];
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
