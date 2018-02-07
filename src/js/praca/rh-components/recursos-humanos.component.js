import angular from "angular"

class RecursosHumanosListController {
  constructor($mdDialog, $log) {
    "ngInject"

    angular.extend(this, {
      $mdDialog,
      $log,
    })

    this.mixDelete = "rh"
    this.urlDialog = "praca/rh-components/rh.dialog.tmpl.html"
    this.strController = "RhDialogController"
    this.booImg = false
  }

  dialogForm(event, strCtrl, strUrl, praca) {
    const objValue = {}
    const booDisabled = false
    event.stopPropagation()
    this.$mdDialog.show({
      controller: strCtrl,
      templateUrl: strUrl,
      controllerAs: "$ctrl",
      locals: { praca, objValue, booDisabled },
      bindToController: true,
      clickOutsideToClose: true,
      targetEvent: event,
      fullscreen: true,
    })
  }
}

const RecursosHumanos = {
  controller: RecursosHumanosListController,
  template: `
    <div id="container-rh" layout="column" layout-padding>
      <div flex layout-padding class="info">
        <div class="layout-row title">
          <md-icon class="material-icons">location_city</md-icon>
          <h1 flex class="flex">Recursos Humanos</h1>
        </div>
        <div ng-if="$ctrl.rhs.length == 0">
          <p>Os dados sobre Recursos Humanos ainda não foram inseridos nesta Praça. </p>
        </div>
      </div>
      <md-fab-speed-dial show-as-manager="true" class="md-fab-top-right" ng-click="$ctrl.dialogForm($event, $ctrl.strController, $ctrl.urlDialog, $ctrl.praca)" style="padding:0;">
        <md-fab-trigger>
          <md-button class="md-fab">
            <md-icon class="material-icons">add</md-icon>
          </md-button>
        </md-fab-trigger>
      </md-fab-speed-dial>
      <div layout="row" layout-wrap layout-margin>
        <ep-praca-card ng-repeat="objValue in $ctrl.rhs" praca="$ctrl.praca"
        boo-img="$ctrl.booImg" str-controller="$ctrl.strController" obj-value="objValue" 
        url-dialog="$ctrl.urlDialog" mix-delete="$ctrl.mixDelete"></ep-praca-card>
      </div>
    </div>
    `,
  bindings: {
    praca: "<",
    rhs: "<",
  },
}

export default RecursosHumanos
