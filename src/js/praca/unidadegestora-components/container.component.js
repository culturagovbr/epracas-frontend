class UnidadeGestoraController {
  constructor($mdDialog, $log) {
    "ngInject"

    angular.extend(this, {
      $mdDialog,
      $log,
    })
  }

  showUGLDialog(praca) {
    const grupogestor = praca.grupo_gestor
    this.$mdDialog.show({
      controller: "MembroUglDialogController",
      controllerAs: "$ctrl",
      templateUrl: "praca/unidadegestora-components/membrougl.dialog.tmpl.html",
      locals: { praca, grupogestor },
      fullscreen: true,
    })
  }

}

const UnidadeGestoraContainer = {
  controller: UnidadeGestoraController,
  template: `
        <div id="container-unidade" layout-padding layout-gt-xs="row">
          <div flex layout-padding class="info">
            <div class="layout-row title">
              <md-icon>location_city</md-icon>
              <h1 flex>Unidade Gestora Local</h1>
            </div>
            <div ng-show="!$ctrl.praca.unidade_gestora">
              <p>Os dados sobre a Unidade Gestora ainda não foram inseridos nesta Praça. </p>
            </div>

        <div layout-wrap layout-margin layout="row">
          <md-card  ng-repeat="membro in $ctrl.praca.unidade_gestora" layout-padding flex="18">
            <div class="epr-avatar" style="background-image: url('{{ membro.imagem}}')"></div>
            <span class="epr-name">{{ membro.nome }}</span>
            <span class="epr-subname">{{ membro.origem_descricao }}</span>
          </md-card>
        </div>

        <md-fab-speed-dial show-as-manager="true" class="md-fab-top-right" ng-click="$ctrl.showUGLDialog($ctrl.praca)">
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
    unidade_gestora: "<",
    situacao: "<",
  },
}

export default UnidadeGestoraContainer
