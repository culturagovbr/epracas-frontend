class PracaCardController {
  constructor($state, $document, $mdDialog, Toast, Praca) {
    "ngInject";

		angular.extend(this, {
			_$state: $state,
			_$document: $document,
			_$mdDialog: $mdDialog,
			_Toast: Toast,
			_Praca: Praca,
		})

      if (angular.isUndefined(this.praca)) {
          this.praca = {};
      }

      if (angular.isUndefined(this.praca.header_img) || this.praca.header_img === null ) {
          this.praca.header_img = "/assets/header.jpg";
      }
  }

  infoPraca(praca) {
    this._Praca.get(praca.id_pub)
      .then(result => {
        this._$mdDialog.show({
          controller: 'PracaInfoCtrl',
          controllerAs: '$ctrl',
          templateUrl: 'praca/pracainfo-dialog.tmpl.html',
          parent: angular.element(this._$document.body),
          locals: { praca: result }
        })
      })
  }

  infoGestor(gestor)
  {
    //TODO: implement
  }

  excluirPraca() {
    this.onDelete({praca: this.praca})
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
      style="background-image: url({{$ctrl.praca.header_img}})"
      ng-click="$ctrl.navigateTo('app.praca', {pk: $ctrl.praca.id_pub})">

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
              <md-button ng-click="$ctrl.excluirPraca()">
                <md-icon>clear</md-icon>
                Excluir Praça
              </md-button>
            </md-menu-item>

          </md-menu-content>

        </md-menu>
      </div>

    </md-list-item>
    `,
  bindings: {
    praca: "=",
    onDelete: "&",
  },
}

export default PracaCard;
