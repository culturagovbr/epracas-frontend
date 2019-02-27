import angular from "angular"

class Controller {
  constructor($mdDialog, AppConstants) {
    "ngInject"

    angular.extend(this, {
      $mdDialog,
      AppConstants,
    })

    this.urlDelete = `${this.AppConstants.api}/pracas/${this.praca.id_pub}/parceiros/`
    this.urlDialog = "praca/parceiros-components/parceiros-dialog.tmpl.html"
    this.strController = "ParceirosCtrl"
    this.booImg = true
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

const Parceiros = {
  controller: Controller,
  template: `
    <div ng-if="$ctrl.praca.situacao=='i'" id="container-parceiros">
      <div flex layout-padding class="info">
        <div class="layout-row title">
          <md-icon>people</md-icon>
          <h1 flex>Parceiros da Praça</h1>
        </div>
        <md-fab-speed-dial show-as-manager="true" pracaid="{{$ctrl.praca.id_pub}}" pracagestor="{{$ctrl.praca.gestor.user_id_pub}}" class="md-fab-top-right " ng-click="$ctrl.dialogForm($event, $ctrl.strController, $ctrl.urlDialog, $ctrl.praca)">
          <md-fab-trigger>
            <md-button class="md-fab hoverable">
              <md-icon class="material-icons">add</md-icon>
            </md-button>
          </md-fab-trigger>
        </md-fab-speed-dial>
        <div ng-if="$ctrl.parceiros.length == 0">
          <p>Ainda não existem Parceiros para esta Praça. <b>:(</b></p>
        </div>
        <div layout-wrap layout-margin layout="row">
          <ep-praca-card ng-repeat="objValue in $ctrl.parceiros" praca="$ctrl.praca"
          boo-img="$ctrl.booImg" str-controller="$ctrl.strController" obj-value="objValue"
          url-dialog="$ctrl.urlDialog" mix-delete="$ctrl.urlDelete"></ep-praca-card>
        </div>
      </div>
    </div>
    `,
  bindings: {
    praca: "<",
    parceiros: "<",
  },
}

export default Parceiros
