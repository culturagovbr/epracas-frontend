class PracaInfoCtrl {
  constructor($mdDialog, $mdToast, Praca, pracaData, Toast) {
    "ngInject";

    this._$mdDialog = $mdDialog;
    this._$mdToast = $mdToast;
    this._Praca = Praca;
    this._Toast = Toast;

    this._praca = pracaData;
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
      const praca = this._praca.id_pub;
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
