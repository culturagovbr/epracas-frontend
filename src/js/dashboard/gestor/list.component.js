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
      <div class="row">
        <gestor-detail gestor="gestor" ng-repeat="gestor in $ctrl.gestores" class="col s12 m6 l4"><gestor-detail>
      </div>
    </md-list>
    `,
  bindings: {
    gestores: "<",
  },
}

export default GestorListElement
