class ParceirosCtrl {
  constructor($mdDialog, $http, AppConstants, Toast, praca, $log) {
    "ngInject";

    angular.extend(this, {
      $mdDialog,
      $http,
      AppConstants,
      Toast,
      praca,
      $log,
    })

    this._listaAtividades = [
      {
        value: 1,
        display_name: "agropecuária",
      },
      {
        value: 2,
        display_name: "assistência social",
      },
      {
        value: 3,
        display_name: "comércio",
      },
      {
        value: 4,
        display_name: "comunicação",
      },
      {
        value: 5,
        display_name: "cultura",
      },
      {
        value: 6,
        display_name: "educação",
      },
      {
        value: 7,
        display_name: "esporte",
      },
      {
        value: 8,
        display_name: "indústria",
      },
      {
        value: 9,
        display_name: "organização comunitária",
      },
      {
        value: 10,
        display_name: "organização social",
      },
      {
        value: 11,
        display_name: "saúde",
      },
      {
        value: 12,
        display_name: "serviços",
      },
    ];

    this.parceiro = {};
    this.parceiro.praca = praca.id_pub;
  }

  cancel() {
    this.$mdDialog.cancel();
  }

  save(praca_id_pub, data) {
    this.$http({
      url: `${this.AppConstants.api}/pracas/${praca_id_pub}/parceiros/`,
      method: "POST",
      data: data,
    })
      .then(
        () => {
          this.$mdDialog.hide()
          this.Toast.showSuccessToast("Parceiro Cadastrado com Sucesso!")
        }
      )
      .catch(
        (err) => this.$log.error(`saveParceiros: ${angular.toJson(err.status)} - ${angular.toJson(err.data)}`)
      );
  }
}

export default ParceirosCtrl;
