import GestorDialog from "./dialog.component"

class GrupoGestorController {
  constructor($mdDialog) {
    "ngInject"

    angular.extend(this, {
      $mdDialog,
    })
  }

  showGestorDialog() {
    this.$mdDialog.show(GestorDialog)
  }
}

const GrupoGestorContainer = {
  controller: GrupoGestorController,
  template: `
    <div id="container-grupogestor" layout-padding layout-gt-xs="row">
      <div flex layout-padding class="info">
        <div class="layout-row title">
          <md-icon>group</md-icon>
          <h1 flex>Grupo Gestor</h1>
        </div>
        <div ng-show="!$ctrl.grupo_gestor">
          <p>Os dados sobre o Grupo Gestor ainda não foram inseridos nesta Praça.</p>
        </div>
      <md-fab-speed-dial class="md-fab-top-right" ng-click="$ctrl.showGestorDialog()">
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
    grupo_gestor: "<",
    situacao: "<",
  },
}

export default GrupoGestorContainer
