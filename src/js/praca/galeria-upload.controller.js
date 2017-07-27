class UploadImgCtrl {
    constructor($mdDialog, $log, Upload, AppConstants, praca, $state) {
        "ngInject";

        angular.extend(this, {
            _$mdDialog: $mdDialog,
            _$log: $log,
            _Upload: Upload,
            _AppConstants: AppConstants,
            praca: praca,
            state: $state,
        })
    }

    cancel() {
        this._$mdDialog.cancel()
    }

    uploadImg(imagem) {
        if (imagem && imagem.length) {
            this._$mdDialog.show({
                clickOutsideToClose: false,
                template: `
          <div layout="row" layout-padding layout-align="center center">
            <div flex=30>
              <md-progress-circular md-mode="indeterminate"></md-progress-circular>
            </div>
            <div flex=70>
              <p>Salvando arquivo {{i}} de {{$ctrl.imagem_count}}.
              Por favor, aguarde.</p>
            </div>
          </div>
          `,
                locals: {i: this.i, imagem_count: imagem.length}
            })

            let booEnd = false;
            for (let i = 0; i < imagem.length; i++) {
                this._Upload.upload({
                    url: `${this._AppConstants.api}/pracas/${this.praca.id_pub}/imagens/`,
                    method: "POST",
                    data: {
                        arquivo: imagem[i],
                        titulo: imagem[i].titulo,
                        descricao: imagem[i].descricao,
                    }
                }).then(() => {
                    this._$mdDialog.hide()
                });

                if (imagem.length - 1 == i) {
                        booEnd = true;
                }
            }

            if (booEnd) {
                setTimeout(() => {
                    this._$mdDialog.hide()
                }, 2000);
                setTimeout(() => {
                    this.state.reload()
                }, 3000)
            }
        }
    }
}

export default UploadImgCtrl;
