const ParceirosBoardElement = {
  template: `
    <div ng-if="$ctrl.praca.situacao=='i'" id="container-parceiros">
      <div flex layout-padding class="info">
        <div class="layout-row title">
          <md-icon>people</md-icon>
          <h1 flex>Parceiros da Praça</h1>
        </div>
        <praca-parceiros-list parceiros="$ctrl.parceiros"></praca-parceiros-list>
      </div>
    </div>
    `,
  bindings: {
    praca: "<",
    parceiros: "<",
  },
}

export default ParceirosBoardElement
