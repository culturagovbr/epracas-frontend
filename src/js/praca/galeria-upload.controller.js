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
		if (imagem && imagem.length) {
			for (let i=0; i < imagem.length; i++) {
				this._Upload.upload({
					url: `${this._AppConstants.api}/pracas/${this.praca.id_pub}/imagens/`,
					method: "POST",
					data: {
							arquivo: imagem[i],
							titulo: imagem[i].titulo,
							descricao: imagem[i].descricao,
						}
					})
				}
			}
		}
  }

export default UploadImgCtrl;
