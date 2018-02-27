import angular from "angular"

class Controller {
  constructor($mdDialog, $log) {
    "ngInject"

    angular.extend(this, {
      $mdDialog,
      $log,
    })

    this.urlDelete = "membroGestor"
    this.urlDialog = "praca/grupogestor-components/membrogestor.dialog.tmpl.html"
    this.strController = "MembroGestorDialogController"
    this.booImg = false
  }

  $onInit() {
    if (
      (angular.isUndefined(this.praca.grupo_gestor)) ||
      (this.praca.grupo_gestor === null) ||
      (this.praca.grupo_gestor.length === 0)
    ) {
      this.ggEmpty = true
    } else {
      this.ggEmpty = false
    }
  }

  showGrupoGestorDialog(event, praca) {
    const grupogestor = praca.grupo_gestor
    this.$mdDialog.show({
      controller: "GrupoGestorDialogController",
      controllerAs: "$ctrl",
      templateUrl: "praca/grupogestor-components/grupogestor.dialog.tmpl.html",
      locals: { praca, grupogestor },
      fullscreen: true,
      clickOutsideToClose: true,
      targetEvent: event,
    })
  }

  showMembroGestorDialog(event, praca) {
    this.$mdDialog.show({
      controller: "MembroGestorDialogController",
      controllerAs: "$ctrl",
      templateUrl: "praca/grupogestor-components/membrogestor.dialog.tmpl.html",
      locals: { praca },
      fullscreen: true,
      clickOutsideToClose: true,
      targetEvent: event,
    })
  }

  showMembroGestorListDialog(event, praca) {
    this.$mdDialog.show({
      controller: "MembroGestorListDialogController",
      controllerAs: "$ctrl",
      templateUrl: "praca/grupogestor-components/membrogestor-list.dialog.tmpl.html",
      locals: { praca },
      fullscreen: true,
      clickOutsideToClose: true,
      targetEvent: event,
    })
  }

  showGestorDialog(event, strController, urlDialog, praca) {
    if (this.ggEmpty) {
      this.showGrupoGestorDialog(event, praca)
    } else {
      this.showMembroGestorDialog(event, praca, praca.grupo_gestor)
    }
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

const GrupoGestor = {
  controller: Controller,
  template: `
    <div id="container-grupogestor" layout-padding layout-gt-xs="row">
      <div flex layout-padding class="info">
        <div class="layout-row title">
          <md-icon>group</md-icon>
          <h1 flex><a href="#" ng-disable="!$ctrl.praca.grupo_gestor.membros" ng-click="$ctrl.showMembroGestorListDialog($event, $ctrl.praca)"> Grupo Gestor</a></h1>
        </div>
        <div ng-show="$ctrl.ggEmpty">
          <p>Os dados sobre o Grupo Gestor ainda não foram inseridos nesta Praça.</p>
        </div>
        <div layout-wrap layout-margin layout="row">
          <ep-praca-card ng-repeat="objValue in $ctrl.praca.grupo_gestor.membros" praca="$ctrl.praca"
          boo-img="$ctrl.booImg" str-controller="$ctrl.strController" obj-value="objValue" 
          url-dialog="$ctrl.urlDialog" mix-delete="$ctrl.urlDelete"></ep-praca-card>
        </div>
      <md-fab-speed-dial show-as-manager="true" pracaid="{{$ctrl.praca.id_pub}}" pracagestor="{{$ctrl.praca.gestor.user_id_pub}}" class="md-fab-top-right" ng-click="$ctrl.showGestorDialog($event, $ctrl.strController, $ctrl.urlDialog, $ctrl.praca)">
        <md-fab-trigger>
          <md-button class="md-fab">
            <md-icon>add</md-icon>
          </md-button>
        </md-fab-trigger>
      </md-fab-speed>
      </div>
    </div>
    `,
  bindings: {
    praca: "<",
    grupo_gestor: "<",
    ggEmpty: "<",
    situacao: "<",
  },
}

export default GrupoGestor
