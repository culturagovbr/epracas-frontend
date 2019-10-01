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
    <md-list>
      <div class="row">
        <gestor-detail gestor="gestor" on-delete="$ctrl.refreshData(gestor)"  ng-repeat="gestor in $ctrl.gestores" class="col s12 m6 l4" style="height: 480px"><gestor-detail>
      </div>
    </md-list>
    `,
  bindings: {
    gestores: "<",
  },
}

export default GestorListElement
