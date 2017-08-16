const AtoresDetailElement = {
  template: `
    <md-card layout-padding>
      <div class="epr-avatar" ng-show="$ctrl.ator.imagem" style="background-image: url('{{ $ctrl.ator.imagem}}')"></div>
      <span class="epr-name">{{ $ctrl.ator.nome }}</span>
      <span class="epr-subname"></span>
    </md-card>
    `,
  bindings: {
    ator: "<",
    onDelete: "&",
  },
}

export default AtoresDetailElement
