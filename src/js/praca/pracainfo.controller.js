class PracaInfoCtrl {
  constructor($scope, $http, $mdDialog, $mdToast, $log, AppConstants) {
    "ngInject";

    this._$scope = $scope;
    this._$http = $http;
    this._$mdDialog = $mdDialog;
    this._$mdToast = $mdToast;
    this._$log = $log;
    this._AppConstants = AppConstants;

    this._praca = $scope.praca;
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
        (response) => {
          this._log.log(`Success!!! ${angular.toJson(response.data)}`);
          this._$mdDialog.hide();
          this._$mdToast.show(
            this._$mdToast.simples()
              .textContent("Informações alteradas com sucesso")
              .position("right", "top")
              .hideDelay(3500)
          );
        }
      );
  }
}
export default PracaInfoCtrl;
