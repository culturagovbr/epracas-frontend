class ChangeHeaderImgCtrl {
  constructor($scope, $timeout, $mdDialog, $mdToast, $log, Upload, AppConstants) {
    "ngInject";

    this._$mdDialog = $mdDialog;
    this._$scope = $scope;
    this._AppConstants = AppConstants;
    this._Upload = Upload;
    this._praca = $scope.praca;
    this._$timeout = $timeout;
    this._$log = $log;
    this._$mdToast = $mdToast;
  }

  cancel() {
    this._$mdDialog.cancel();
  }

  upload(dataUrl, name) {
    this._Upload.upload({
      url: `${this._AppConstants.api}/pracas/${this._praca.id_pub}/header_upload/`,
      method: "POST",
      data: { header_img: this._Upload.dataUrltoBlob(dataUrl, name) },
    })
      .then(
        (response) => this._$timeout(() => this._$scope.result = response.data),
        (err) => { if (err.status > 0) { this._$scope.errorMsg = `${err.status}: ${err.data}` }; },
        (evt) => this._$scope.progress = parseInt(100.0 * evt.loaded / evt.total)
      )
      .then(
        response => {
          this._$log.log(`uploadHeaderImg: Success! ${response}`);
          this._praca.header_url = response.header_url;
          this._$mdDialog.hide();
          this._$mdToast.show(
            this._$mdToast.simple()
              .textContent("Cabeçalho foi alterado. Recarregue a página para ver as mudanças.")
              .position("right", "top")
              .hideDelay(5000)
          );
        }
      );
  }
}

export default ChangeHeaderImgCtrl;
