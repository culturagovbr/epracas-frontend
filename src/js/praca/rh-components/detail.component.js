class RecursosHumanosDetailController {
  constructor($log) {
    "ngInject"
  }
}

const RecursosHumanosDetail = {
  template: `
    <md-card layout-padding flex="18">
      <p class="nome">{{$ctrl.rh.nome}}</p>
      <p class="funcao">{{$ctrl.rh.funcao}}</p> 
    </md-card>
  `,
  bindings: {
    rh: "<",
  },
}

export default RecursosHumanosDetail
