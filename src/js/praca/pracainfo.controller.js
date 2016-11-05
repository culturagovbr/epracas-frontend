class PracaInfoCtrl {
  constructor($scope, $http, $mdDialog, $log, AppConstants){
    "ngInject";

    this._$mdDialog = $mdDialog;
    this._$scope = $scope;
    this._$http = $http;

    this._praca = $scope.praca;

    this._AppConstants = AppConstants;
  }

  cancel() {
    this._$mdDialog.cancel();
  }

  save() {
    this._$http({
      url: `${this._AppConstants.api}/pracas/${this._praca.id_pub}/`,
      method: "POST",
      data: this._praca,
    })
      .then(
        response => { 
          this._mdDialog.show(
            this._$mdDialog.alert({
              title: "Informações alteradas.",
              textContent: "As informações sobre a praça foram salvas.",
              ok: "Ok, entendi.",
            })
          );
          this._$scope.praca = this._praca;
          this._log.log(`Success!!! ${angular.toJson(response.data)}`);
        }
      );
  }

}

export default PracaInfoCtrl;
