class GestorListController {
  constructor(Gestor, ErrorCatcher, $scope) {
    "ngInject"

    angular.extend(this, {
      Gestor,
      ErrorCatcher,
    })

    this.gestores = {};
    this.Gestor.list()
      .then(response => this.gestores = response.data)
      .catch((err) => {
        ErrorCatcher.error("GestorListController.constructor", err)
      })

    this.refreshData = function(gestor) {
      this.gestores = this.gestores.filter((val) => {return val.url != gestor.url});
    };
  }
}

const GestorListElement = {
  controller: GestorListController,
  template: `
    <md-grid-list md-cols-xs="1" md-cols-sm="2" md-cols-md="3" md-cols-lg="3" md-row-height="450px">
      <md-grid-tile ng-repeat="gestor in $ctrl.gestores">
        <gestor-detail gestor="gestor" on-delete="$ctrl.refreshData(gestor)" class="col s12 m6 l4 md-padding"></gestor-detail>
        </md-grid-tile>
    </md-grid-list>
    `,
  bindings: {
    gestores: "<",
  },
}

export default GestorListElement
