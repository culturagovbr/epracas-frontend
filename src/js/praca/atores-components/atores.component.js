class Controller {
  constructor($mdDialog, Atores) {
    "ngInject"

    angular.extend(this, {
      $mdDialog, Atores,
    })

    // this.urlDelete = `${this.AppConstants.api}/pracas/${this.praca.id_pub}/parceiros/`
    this.urlDialog = "praca/atores-components/atores-dialog.tmpl.html"
    this.strController = "AtoresCtrl"
    this.booImg = false
  }


  showAddDialog(praca, ator) {
    this.$mdDialog.show({
      controller: "AtoresCtrl",
      controllerAs: "$ctrl",
      templateUrl: "praca/atores-components/atores-dialog.tmpl.html",
      locals: { praca, ator },
      fullscreen: true,
    })
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

const Atores = {
  controller: Controller,
  template: `
    <div ng-if="$ctrl.praca.situacao=='i'" id="container-atores">
      <div flex layout-padding class="info">
        <div class="layout-row title">
          <md-icon>group_work</md-icon>
          <h1 flex>Atores da Praça</h1>
        </div>
        <md-fab-speed-dial show-as-manager="true" class="md-fab-top-right" ng-click="$ctrl.dialogForm($event, $ctrl.strController, $ctrl.urlDialog, $ctrl.praca)" style="padding:0;">
          <md-fab-trigger>
            <md-button class="md-fab">
              <md-icon class="material-icons">add</md-icon>
            </md-button>
          </md-fab-trigger>
        </md-fab-speed-dial>
        <div ng-if="$ctrl.atores.length == 0">
          <p>Ainda não existem Atores para esta Praça. <b>:(</b></p>
        </div>
        <div layout-wrap layout-margin layout="row">
          <ep-praca-card ng-repeat="objValue in $ctrl.atores" praca="$ctrl.praca"
          boo-img="$ctrl.booImg" str-controller="$ctrl.strController" obj-value="objValue" 
          url-dialog="$ctrl.urlDialog" mix-delete="$ctrl.Atores"></ep-praca-card>
        </div>
      </div>
    </div>
    `,
  bindings: {
    praca: "<",
    atores: "<",
  },
}

export default Atores
