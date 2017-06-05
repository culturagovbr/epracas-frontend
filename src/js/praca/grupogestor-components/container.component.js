class GrupoGestorController {
  constructor($mdDialog, $log) {
    "ngInject"

    angular.extend(this, {
      $mdDialog,
      $log,
    })
  }

  showGrupoGestorDialog(praca) {
    this.$mdDialog.show({
      controller: "GrupoGestorDialogController",
      controllerAs: "$ctrl",
      templateUrl: "praca/grupogestor-components/grupogestor.dialog.tmpl.html",
      locals: { praca },
      fullscreen: true,
    })
  }

  showMembroGestorDialog(praca) {
    this.$mdDialog.show({
      controller: "MembroGestorDialogController",
      controllerAs: "$ctrl",
      templateUrl: "praca/grupogestor-components/membrogestor.dialog.tmpl.html",
      locals: { praca },
      fullscreen: true,
    })
  }

  showGestorDialog(praca) {
    if (angular.isUndefined(praca.grupo_gestor) || praca.grupo_gestor === null) {
      this.showGrupoGestorDialog(praca)
    } else {
      this.showMembroGestorDialog(praca, praca.grupo_gestor)
    }
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
      <md-fab-speed-dial class="md-fab-top-right" ng-click="$ctrl.showGestorDialog($ctrl.praca)">
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
    situacao: "<",
  },
}

export default GrupoGestorContainer
