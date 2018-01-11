const ParceirosDetailElement = {
  template: `
    <md-card layout-padding>
      <div ng-show="$ctrl.parceiro.imagem" class="epr-avatar" style="background-image: url('{{ $ctrl.parceiro.imagem}}')"></div>
      <span class="epr-name">{{ $ctrl.parceiro.nome }}</span>
      <span class="epr-subname">
        <p><b>Nome: </b>{{$ctrl.parceiro.nome}}</p>
        <p><b>Email: </b>{{$ctrl.parceiro.email}}</p>
        <p><b>Atividade: </b>{{$ctrl.parceiro.ramo_atividade_name}}</p>
      </span>
    </md-card>
    `,
  bindings: {
    parceiro: "<",
    onDelete: "&",
  },
}

export default ParceirosDetailElement
