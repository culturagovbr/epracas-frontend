class ParceirosDetailController {
  constructor() {
    "ngInject"
  }
}

const ParceirosDetailElement = {
  controller: ParceirosDetailController,
  controllerAs: "$ctrl",
  template: `
    <md-card layout-padding flex="25">
      <div class="epr-avatar" style="background-image: url('{{ $ctrl.parceiro.imagem}}')"></div>
      <span class="epr-name">{{ $ctrl.parceiro.nome }}</span>
      <span class="epr-subname"></span>
    </md-card>
    `,
  bindings: {
    parceiro: "<",
    onDelete: "&",
  },
}

export default ParceirosDetailElement
