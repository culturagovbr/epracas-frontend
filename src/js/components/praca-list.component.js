class ListElementCtrl {
  constructor() {
  }
}

const ListElement = {
  controller: ListElementCtrl,
  template: `
      <md-list-item
        class="md-3-line"
        layout-padding
        ng-click="$state.go('app.praca', {pk: praca.id_pub})">
        <md-icon class="md-avatar">explorer</md-icon>
        <div class="md-list-item-text" layout="column">
          <h3>{{$ctrl.praca.nome}}</h3>
          <h4>{{$ctrl.praca.municipio}} - {{$ctrl.praca.uf | uppercase}}</h4>
          <p>Modelo: {{$ctrl.praca.modelo_descricao}}</p>
          <p>Situação: {{$ctrl.praca.situacao_descricao}}</p>
          <p>Distancia: {{$ctrl.praca.distancia / 1000}} Kms</p>
        </div>
      </md-list-item>
    `,
  bindings: {
    praca: "=",
  },
};

export default ListElement;
