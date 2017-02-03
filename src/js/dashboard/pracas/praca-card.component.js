class PracaCardController {
  constructor($scope, $state, $document, $mdDialog, Praca) {
    "ngInject";

    if (this.praca.header_url.lastIndexOf(".jpg") == -1) {
      this.praca.header_url = "/assets/header.jpg";
    }

    $scope.$state = $state;
    this._$document = $document;
    this._$mdDialog = $mdDialog;
    this._Praca = Praca;

    $scope.situacoes = [
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

    $scope.modelos = [
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

  infoPraca(praca) {
    this._Praca.get(praca.id_pub)
      .then(
        (result) => {
          this._$mdDialog.show({
            controller: "PracaInfoCtrl",
            controllerAs: "$ctrl",
            templateUrl: "praca/pracainfo-dialog.tmpl.html",
            parent: angular.element(this._$document.body),
            locals: { pracaData: result },
          });
        }
      );
  }

  infoGestor(praca) {

  }

  excluirPraca(praca) {

  }
}

const PracaCardElement = {
  controller: PracaCardController,
  template: `
    <md-list-item
      class="praca-container"
      layout-align="space-between"
      style="background-image: url({{ $ctrl.praca.header_url }})">

      <div class="md-list-item-text praca-text"
        ng-click="$state.go('app.praca', {pk: $ctrl.praca.id_pub})"
        >{{ $ctrl.praca.nome }}
        {{ $ctrl.praca.municipio}} - {{ $ctrl.praca.uf | uppercase }}
      </div>
      <div class="md-secondary epr-fill" layout-align="end start">
        <md-menu>
          <md-button layout-align="end start" class="md-icon-button" ng-click="$mdMenu.open($event)">
            <md-icon>menu</md-icon>
          </md-button>

          <md-menu-content width="4">

            <md-menu-item>
              <md-button ng-click="$ctrl.infoPraca($ctrl.praca)">
                <md-icon>info</md-icon>
                Visualizar Informações sobre a Praça
              </md-button>
            </md-menu-item>

            <md-menu-item>
              <md-button ng-click="$ctrl.infoGestor($ctrl.praca)">
                <md-icon>face</md-icon>
                Visualizar Informações sobre o Gestor da Praça
              </md-button>
            </md-menu-item>

            <md-menu-item>
              <md-button ng-click="$ctrl.excluirPraca($ctrl.praca)">
                <md-icon>clear</md-icon>
                Excluir Praça
              </md-button>
            </md-menu-item>

          </md-menu-content>

        </md-menu>
      </div>

      <!-- <div class="md-list-item-text" layout="column">
        <h3>{{ praca.nome }}</h3>
        <h4>{{ praca.municipio}} - {{ praca.uf | uppercase }}</h4>
        <p>Modelo: {{ praca.modelo_descricao }}</p>
        <p>Situação: {{ praca.situacao_descricao }}</p>
      </div> -->
    </md-list-item>
  `,
  bindings: {
    praca: "=",
  },
};

export default PracaCardElement;
