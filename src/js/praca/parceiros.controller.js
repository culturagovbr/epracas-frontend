class ParceirosCtrl {
  constructor($mdDialog, $http, AppConstants, $mdToast, praca, $log) {
    "ngInject";

    this._$mdDialog = $mdDialog;
    this._$http = $http;
    this._AppConstants = AppConstants;
    this._$mdToast = $mdToast;
    this._$log = $log;

    this._listaAtividades = [
      {
        value: 1,
        display_name: "agricultura, pecuária, produção florestal, pesca e aqüicultura",
      },
      {
        value: 2,
        display_name: "indústrias extrativas",
      },
      {
        value: 3,
        display_name: "indústrias de transformação",
      },
      {
        value: 4,
        display_name: "eletricidade e gás",
      },
      {
        value: 5,
        display_name: "água, esgoto, atividades de gestão de resíduos e descontaminação",
      },
      {
        value: 6,
        display_name: "construção",
      },
      {
        value: 7,
        display_name: "comércio; reparação de veículos automotores e motocicletas",
      },
      {
        value: 8,
        display_name: "transporte, armazenagem e correio",
      },
      {
        value: 9,
        display_name: "alojamento e alimentação",
      },
      {
        value: 10,
        display_name: "informação e comunicação",
      },
      {
        value: 11,
        display_name: "atividades financeiras, de seguros e serviços relacionados",
      },
      {
        value: 12,
        display_name: "atividades imobiliárias",
      },
      {
        value: 13,
        display_name: "atividades profissionais, científicas e técnicas",
      },
      {
        value: 14,
        display_name: "atividades administrativas e serviços complementares",
      },
      {
        value: 15,
        display_name: "administração pública, defesa e seguridade social",
      },
      {
        value: 16,
        display_name: "educação",
      },
      {
        value: 17,
        display_name: "saúde humana e serviços sociais",
      },
      {
        value: 18,
        display_name: "artes, cultura, esporte e recreação",
      },
      {
        value: 19,
        display_name: "outras atividades de serviços",
      },
      {
        value: 20,
        display_name: "serviços domésticos",
      },
      {
        value: 21,
        display_name: "organismos internacionais e outras instituições extraterritoriais",
      },
    ];

    this.parceiro = {};
    this.parceiro.praca = praca.id_pub;
  }

  cancel() {
    this._$mdDialog.cancel();
  }

  save() {
    this._$http({
      url: `${this._AppConstants.api}/parceiros/`,
      method: "POST",
      data: this.parceiro,
    })
      .then(
        () => {
          this._$mdDialog.hide();
          this._$mdToast.show(
            this._$mdToast.simple()
            .textContent("Parceiro Cadastrado com Sucesso!")
            .position("right", "top")
            .hideDelay(3500)
          );
        }
      )
      .catch(
        (err) => this._$log.log(`saveParceiros: ${err.status} - ${JSON.stringify(err)}`)
      );
  }
}

export default ParceirosCtrl;
