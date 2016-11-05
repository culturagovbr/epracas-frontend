class ChangeHeaderImgCtrl {
  constructor($scope, $timeout, $mdDialog, $log, Upload, AppConstants) {
    "ngInject";

    this._$mdDialog = $mdDialog;
    this._$scope = $scope;
    this._AppConstants = AppConstants;
    this._Upload = Upload;
    this._praca = $scope.praca;
    this._$timeout = $timeout;
    this._$log = $log;
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
        (err) => { if (err.status > 0) { this._$scope.errorMsg = `${err.status}: ${err.data}` } },
        (evt) => this._$scope.progress = parseInt(100.0 * evt.loaded / evt.total),
      )
      .then(
        response => {
          this._$log.log(response.data);
          this._praca.header_url = response.data.header_url;
        }
      );
  }



}

export default ChangeHeaderImgCtrl;
