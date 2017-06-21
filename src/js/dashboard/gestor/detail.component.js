class GestorDetailController {
  constructor(ErrorCatcher) {
    "ngInject"

    angular.extend(this, {
      ErrorCatcher,
    })
  }
}

const GestorDetailElement = {
  controller: GestorDetailController,
  template: `
    <md-list-item md-whiteframe="2">
      <p>{{$ctrl.gestor}}</p>
    </md-list-item>
  `,
  bindings: {
    gestor: "<",
  },
}

export default GestorDetailElement
