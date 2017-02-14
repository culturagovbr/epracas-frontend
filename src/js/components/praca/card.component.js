class PracaCardController {
  constructor($state, $document, $mdDialog, Praca) {
    "ngInject";

    this._$state = $state;
    this._$document = $document;
    this._$mdDialog = $mdDialog;
    this._Praca = Praca;

    if (this.praca.header_url.lastIndexOf(".jpg") == -1) {
      this.praca.header_url = "/assets/header.jpg";
    }

  }

  infoPracafunction(praca)
  {
    this._Praca.get(praca.id_pub)
      .then(result => {
        this._$mdDialog.show({
          controller: 'PracaInfoCtrl',
          controllerAs: '$ctrl',
          templateUrl: 'praca/pracainfo-dialog.tmpl.html',
          parent: angular.element(this._$document.body),
          locals: { pracaData: result }
        })
      })
  }

  infoGestor(gestor)
  {
    //TODO: implement
  }

  excluirPraca(praca)
  {
    //TODO: implement
  }

  navigateTo(route, params)
  {
    this._$state.go(route, params)
  }
}

const PracaCard = {
  controller: PracaCardController,
  template: `
    <md-list-item id="praca-card"
      class="praca-container"
      layout-align="space-between"
      style="background-image: url({{ $ctrl.praca.header_url }})"
      ng-click="navigateTo('app.praca', {pk: $ctrl.praca.id_pub})">

      <div class="md-list-item-text praca-text"
        >
        {{ $ctrl.praca.municipio }} - {{ $ctrl.praca.uf | uppercase }}
        <span class="big">{{ $ctrl.praca.nome }}</span>
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
}

export default PracaCard;
