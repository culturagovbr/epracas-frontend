class GaleriaElementController {
  constructor(Praca, praca) {
    "ngInject"
  }
}

const GaleriaElement = {
  controller: GaleriaElementController,
  controllerAs: "$ctrl",
  template: `
    <md-icon></md-icon>
    <md-subheader>Galeria</md-subheader>
    <galeria-list></galeria-list>
    `,
  bindings: {
    imagens: "<",
  },
}

export default GaleriaElement
