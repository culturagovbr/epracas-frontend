const GrupoGestorContainer = {
  template: `
    <md-content id="container-grupogestor" layout-gt-xs="row">
      <md-fab-speed-dial class="md-warm md-fab-top-right">
        <md-fab-trigger>
          <md-button class="md-fab">
            <md-icon>add</md-icon>
          </md-button>
        </md-fab-trigger>
      </md-fab-speed>
      <div flex layout-padding class="info">
        <div class="layout-row title">
          <md-icon>group</md-icon>
          <h1 flex>Grupo Gestor</h1>
        </div>
        <div ng-show="!$ctrl.grupo_gestor">
          <p>Os dados sobre o Grupo Gestor ainda não foram inseridos nesta Praça.</p>
        </div>
      </div>
    </md-content>
    `,
  bindings: {
    grupo_gestor: "<",
    situacao: "<",
  },
}

export default GrupoGestorContainer
