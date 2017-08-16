class AtoresBoardController {
  constructor($mdDialog) {
    "ngInject"

    angular.extend(this, {
      $mdDialog,
    })
  }

  showAddDialog(praca) {
    this.$mdDialog.show({
      controller: "AtoresCtrl",
      controllerAs: "$ctrl",
      templateUrl: "praca/atores-components/atores-dialog.tmpl.html",
      locals: { praca },
      fullscreen: true,
    })
  }
}
const AtoresBoardElement = {
  controller: AtoresBoardController,
  template: `
    <div ng-if="$ctrl.praca.situacao=='i'" id="container-atores">
      <div flex layout-padding class="info">
        <div class="layout-row title">
          <md-icon>group_work</md-icon>
          <h1 flex>Atores da Praça</h1>
        </div>
        <md-fab-speed-dial show-as-manager="true" class="md-fab-top-right" ng-click="$ctrl.showAddDialog($ctrl.praca)" style="padding:0;">
          <md-fab-trigger>
            <md-button class="md-fab">
              <md-icon class="material-icons">add</md-icon>
            </md-button>
          </md-fab-trigger>
        </md-fab-speed-dial>
        <praca-atores-list atores="$ctrl.atores"></praca-atores-list>
      </div>
    </div>
    `,
  bindings: {
    praca: "<",
    atores: "<",
  },
}

export default AtoresBoardElement
