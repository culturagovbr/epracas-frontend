class ParceirosBoardController {
  constructor($mdDialog) {
    "ngInject"

    angular.extend(this, {
      $mdDialog,
    })
  }

  showAddDialog(praca) {
    this.$mdDialog.show({
      controller: "ParceirosCtrl",
      controllerAs: "$ctrl",
      templateUrl: "praca/parceiros-components/parceiros-dialog.tmpl.html",
      locals: { praca },
      fullscreen: true,
    })
  }

  showListDialog(praca) {
    this.$mdDialog.show({
      controller: "ParceirosListDialogCtrl",
      controllerAs: "$ctrl",
      templateUrl: "praca/parceiros-components/parceiros-list.dialog.tmpl.html",
      locals: { praca },
      fullscreen: true,
    })
  }
}

const ParceirosBoardElement = {
  controller: ParceirosBoardController,
  template: `
    <div ng-if="$ctrl.praca.situacao=='i'" id="container-parceiros">
      <div flex layout-padding class="info">
        <div class="layout-row title">
          <md-icon>people</md-icon>
          <h1 flex><a href="#" ng-click="$ctrl.showListDialog($ctrl.praca)">Parceiros da Praça</a></h1>
        </div>
        <md-fab-speed-dial show-as-manager="true" class="md-fab-top-right" ng-click="$ctrl.showAddDialog($ctrl.praca)" style="padding:0;">
          <md-fab-trigger>
            <md-button class="md-fab">
              <md-icon class="material-icons">add</md-icon>
            </md-button>
          </md-fab-trigger>
        </md-fab-speed-dial>
        <praca-parceiros-list parceiros="$ctrl.parceiros"></praca-parceiros-list>
      </div>
    </div>
    `,
  bindings: {
    praca: "<",
    parceiros: "<",
  },
}

export default ParceirosBoardElement
