class UploadImgCtrl {
  constructor($mdDialog, $log, Upload, AppConstants, praca) {
    "ngInject";

    angular.extend(this, {
      _$mdDialog: $mdDialog,
      _$log: $log,
      _Upload: Upload,
      _AppConstants: AppConstants,
      praca: praca,
    })
  }

  cancel() {
    this._$mdDialog.cancel()
  }

  uploadImg(imagem) {
    this._Upload.upload({
      url: `${this._AppConstants.api}/pracas/${this.praca.id_pub}/imagens/`,
      method: "POST",
      data: { arquivo: imagem }
    })
  }

}

export default UploadImgCtrl;
