class ChangeHeaderImgCtrl {
  constructor($scope, $timeout, $mdDialog, $log, Toast, Upload, AppConstants, praca) {
    "ngInject";

    angular.extend(this, {
      _$scope: $scope,
      _$timeout: $timeout,
      _$mdDialog: $mdDialog,
      _Toast: Toast,
      _$log: $log,
      _Upload: Upload,
      _AppConstants: AppConstants,
      praca: praca,
    })
  }

  cancel() {
    this._$mdDialog.cancel();
  }

  upload(dataUrl, name) {
    this._Upload.upload({
      url: `${this._AppConstants.api}/pracas/${this.praca.id_pub}/header_upload/`,
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
          this.praca.header_url = response.header_url;
          this._$mdDialog.hide();
          this._Toast.showSuccessToast("Cabeçalho foi alterado com sucesso!")
        }
      )
      .catch(
          err => {
            this._$log.error(`uploadHeaderImg: Failed! ${angular.toJson(err.status)} - ${angular.toJson(err.data)}`);
            this._Toast.showRejectedToast("Desculpe, houve algum erro ao atualizar o cabeçalho. :(")
          })
  }
}

export default ChangeHeaderImgCtrl;
