class PracaInfoCtrl {
  constructor($mdDialog, Praca, praca, Toast) {
    "ngInject";

    angular.extend(this, {
      _$mdDialog: $mdDialog,
      _Praca: Praca,
      praca: praca,
      _Toast: Toast,
    })
  }

  cancel() {
    this._$mdDialog.cancel();
  }

  save(data) {
    if (angular.isUndefined(data.id_pub)) {
      this._Praca.new(data)
        .then(
          () => {
            this._$mdDialog.hide();
            this._Toast.showSuccessToast("Praca cadastrada com Sucesso!");
          }
        )
        .catch(
          (err) => {
            this._Toast.showRejectedToast(`Problemas ao alterar a Praça. ${err.data}`);
          }
        );
    } else {
      const praca = data.id_pub;
      let praca_data = {};
      const fields = ['nome', 'logradouro', 'cep', 'bairro', 'regiao', 'uf',
                'municipio', 'bio', 'repasse'];

      for (let field of fields){
        praca_data[field] = angular.copy(data[field]);
      }

      this._Praca.save(praca, praca_data)
        .then(
          () => {
            this._$mdDialog.hide();
            this._Toast.showSuccessToast("Informações alteradas com sucesso!");
          }
        )
        .catch(
          (err) => console.error(`Save Praca Info: ${err.status} - ${JSON.stringify(err)}`)
        );
    }
  }
}
export default PracaInfoCtrl;
