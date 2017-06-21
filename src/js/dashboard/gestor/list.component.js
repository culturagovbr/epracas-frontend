class GestorListController {
  constructor(Gestor, ErrorCatcher) {
    "ngInject"

    angular.extend(this, {
      Gestor,
      ErrorCatcher,
    })

    this.gestores = {}

    this.Gestor.list()
      .then(response => this.gestores = response.data)
      .catch((err) => {
        ErrorCatcher.error("GestorListController.constructor", err)
      })
  }
}

const GestorListElement = {
  controller: GestorListController,
  template: `
    <md-list>
      <gestor-detail gestor="gestor" ng-repeat="gestor in $ctrl.gestores"><gestor-detail>
      // <md-list-item md-whiteframe="2" ng-repeat="gestor in $ctrl.gestores">
      //   <p>{{gestor}}</p>
      // </md-list-item>
    </md-list>
    `,
  bindings: {
    gestores: "<",
  },
}

export default GestorListElement
