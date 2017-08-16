const AtoresListElement = {
  template: `
        <div ng-if="$ctrl.atores.length == 0">
          <p>Ainda não existem Atores para esta Praça. <b>:(</b></p>
        </div>
        <div layout-wrap layout-margin layout="row">
          <praca-atores-detail ator="ator" ng-repeat="ator in $ctrl.atores"></praca-atores-detail>
        </div>
      `,
  bindings: {
    atores: "<",
  },
}

export default AtoresListElement
