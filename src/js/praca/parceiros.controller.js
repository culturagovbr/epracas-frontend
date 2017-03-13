class ParceirosCtrl {
  constructor($scope, $mdDialog, $http, AppConstants, $mdToast, praca, $log) {
    "ngInject";

    angular.extend(this, {
      _$scope: $scope,
      _$mdDialog: $mdDialog,
      _$http: $http,
      _AppConstants: AppConstants,
      _$mdToast: $mdToast,
      praca: praca,
      _$log: $log,
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
