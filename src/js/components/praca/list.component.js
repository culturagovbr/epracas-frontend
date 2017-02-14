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
        <md-button aria-label="Adicionar Praça" class="md-primary md-fab md-fab-bottom-right">
          <md-tooltip md-direction="top">Adicionar Praça</md-tooltip>
          <md-icon>add</md-icon>
        </md-button>
        <md-content flex class="epr-content" id="pracas">
          <div layout="row" style="height:5em">
            <md-button class="big-btn md-primary" ng-click="$ctrl.toggleFilter()">
              <md-icon>search</md-icon>
            </md-button>
            <div class="epr-animate" ng-if="$ctrl.isFilterOpen">
              <md-input-container class="epr-small">
                <input ng-model="$ctrl.filtro.municipio" placeholder="Filtre pelo municipio" autofocus>
              </md-input-container>

              <md-input-container class="epr-small">
                <input ng-model="$ctrl.filtro.uf" placeholder="Filtre pelo estado(UF)">
              </md-input-container>

              <md-input-container class="epr-small">
                <md-select ng-model="$ctrl.filtro.modelo" placeholder="Filtre pelo modelo">
                  <md-option ng-repeat="modelo in $ctrl.modelos"
                    value="{{ $ctrl.modelo.value }}">
                    {{ $ctrl.modelo.descricao }}
                  </md-option>
                </md-select>
                <div class="md-errors-spacer"></div>
              </md-input-container>

              <md-input-container class="epr-small">
                <md-select ng-model="$ctrl.filtro.situacao" placeholder="Filtre pela situação">
                  <md-option ng-repeat="situacao in $ctrl.situacoes"
                    value="{{ situacao.value }}">
                    {{ situacao.descricao }}
                  </md-option>
                </md-select>
                <div class="md-errors-spacer"></div>
              </md-input-container>

            </div>
          </div>

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

        </md-content>

        <md-progress-circular ng-if="$ctrl.loadingPracas"
          md-mode="indeterminate">
        </md-progress-circular>
  `,
  bindings: {
    pracas: "=",
    filter: "=",
  },
};

export default ListElement;
