class GaleriaElementController {
  constructor(Praca) {
    "ngInject";


    console.info('aaa');
  }
}

const GaleriaElement = {
  controller: GaleriaElementController,
  controllerAs: "$ctrl",
  template: `
    <md-icon></md-icon>
    <md-subheader>Galeria123</md-subheader>
    <galeria-list></galeria-list>
    
    
    
    
    `,
  bindings: {
    imagens: "<",
  },
};

export default GaleriaElement
