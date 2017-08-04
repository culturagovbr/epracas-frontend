class RecursosHumanosListController {
  constructor($mdDialog, $log) {
    "ngInject"

    angular.extend(this, {
      $mdDialog,
      $log,
    })
  }

  showAddDialog(praca) {
    this.$mdDialog.show({
      controller: "RhAddDialogController",
      controllerAs: "$ctrl",
      templateUrl: "praca/rh-components/rh-add.dialog.tmpl.html",
      locals: { praca, rh: null },
      fullscreen: true,
    })
  }

  showListDialog(praca) {
    this.$mdDialog.show({
      controller: "RhListDialogController",
      controllerAs: "$ctrl",
      templateUrl: "praca/rh-components/rh-list.dialog.tmpl.html",
      locals: { praca },
      fullscreen: true,
    })
  }

}

const RecursosHumanosList = {
  controller: RecursosHumanosListController,
  template: `
    <div id="container-rh" layout="column" layout-padding>
      <div flex layout-padding class="info">

        <div class="layout-row title">
          <md-icon class="material-icons">location_city</md-icon>
          <h1 flex class="flex"><a href="#" ng-click="$ctrl.showListDialog($ctrl.praca)">Recursos Humanos</a></h1>
        </div>

        <div ng-if="$ctrl.rhs.length == 0">
          <p>Os dados sobre Recursos Humanos ainda não foram inseridos nesta Praça. </p>
        </div>

      </div>

      <div layout="row" layout-wrap layout-margin>
        <rh-detail rh="recurso" ng-repeat="recurso in $ctrl.rhs"></praca-rh-detail>
      </div>

      <md-fab-speed-dial show-as-manager="true" class="md-fab-top-right" ng-click="$ctrl.showAddDialog($ctrl.praca)" style="padding:0;">
        <md-fab-trigger>
          <md-button class="md-fab">
            <md-icon class="material-icons">add</md-icon>
          </md-button>
        </md-fab-trigger>
      </md-fab-speed-dial>
    </div>
    `,
  bindings: {
    praca: "<",
    rhs: "<",
  },
}

export default RecursosHumanosList
