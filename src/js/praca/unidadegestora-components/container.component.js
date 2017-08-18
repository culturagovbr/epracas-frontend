class UnidadeGestoraController {
  constructor($mdDialog, $log, UnidadeGestora) {
    "ngInject"

    angular.extend(this, {
      $mdDialog,
      $log,
      UnidadeGestora,
    })

    UnidadeGestora.options(this.praca)
    .then(data => (this.listaTipo = data.tipo.choices))
      .then(() => {
        if (this.praca.unidade_gestora.length > 0) {
          this.unidade_gestora = this.praca.unidade_gestora.map((membro) => {
            Object.assign(membro,
              { descricao: this.listaTipo.find(x => x.value === membro.tipo).display_name }
            )
            return membro
          })
        }
      })
  }

  showUGLDialog(praca) {
    this.$mdDialog.show({
      controller: "MembroUglDialogController",
      controllerAs: "$ctrl",
      templateUrl: "praca/unidadegestora-components/membrougl.dialog.tmpl.html",
      locals: { praca },
      fullscreen: true,
    })
  }

}

const UnidadeGestoraContainer = {
  controller: UnidadeGestoraController,
  template: `
    <div id="container-unidade" layout-padding layout-gt-xs="column">
      <div flex class="info">
        <div class="layout-row title">
          <md-icon class="material-icons">location_city</md-icon>
          <h1 flex class="flex">Unidade Gestora Local</h1>
        </div>

        <md-fab-speed-dial show-as-manager="true" class="md-fab-top-right" ng-click="$ctrl.showUGLDialog($ctrl.praca)" style="padding:0;">
          <md-fab-trigger>
            <md-button class="md-fab">
              <md-icon class="material-icons">add</md-icon>
            </md-button>
          </md-fab-trigger>
        </md-fab-speed-dial>

        <div ng-if="$ctrl.praca.unidade_gestora.length == '0'">
          <p>Os dados sobre a Unidade Gestora ainda não foram inseridos nesta Praça. </p>
        </div>

      </div>

      <div layout-wrap layout-margin layout="row">
        <md-card  ng-repeat="membro in $ctrl.unidade_gestora" layout-padding flex="18">
          <span class="epr-name">{{ membro.nome }}</span>
          <span class="epr-subname">{{ membro.descricao }}</span>
        </md-card>
      </div>

    </div>
    `,
  bindings: {
    praca: "<",
  },
}

export default UnidadeGestoraContainer
