const ParceirosListElement = {
  template: `
        <div ng-if="$ctrl.parceiros.length == 0">
          <p>Ainda não existem Parceiros para esta Praça. <b>:(</b></p>
        </div>
        <div layout-wrap layout-margin layout="row">
          <praca-parceiros-detail parceiro="parceiro" ng-repeat="parceiro in $ctrl.parceiros"></praca-parceiros-detail>
        </div>
      `,
  bindings: {
    parceiros: "<",
  },
}

export default ParceirosListElement
