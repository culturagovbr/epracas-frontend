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
      this._Praca.save(praca, data)
        .then(
          () => {
            this._$mdDialog.hide();
            this._Toast.showSuccessToast("Informações alteradas com sucesso!");
          }
        )
        .catch(
          (err) => console.error(`saveParceiros: ${err.status} - ${JSON.stringify(err)}`)
        );
    }
  }
}
export default PracaInfoCtrl;
