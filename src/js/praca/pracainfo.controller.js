class PracaInfoCtrl {
  constructor($mdDialog, $mdToast, Praca, pracaData) {
    "ngInject";

    this._$mdDialog = $mdDialog;
    this._$mdToast = $mdToast;
    this._Praca = Praca;

    this._praca = pracaData;
  }

  cancel() {
    this._$mdDialog.cancel();
  }

  save(praca, data) {
    if (angular.isUndefined(this._praca.id_pub)) {
      this._Praca.new(data)
        .then(
          () => {
            this._$mdDialog.hide();
            this._$mdToast.show(
              this._$mdToast.simple()
              .textContent("Praça cadastrada com Sucesso!")
              .position("right", "top")
              .hideDelay(3500)
            );
          }
        );
    } else {
      this._Praca.save(praca, data)
        .then(
          () => {
            this._$mdDialog.hide();
            this._$mdToast.show(
              this._$mdToast.simple()
              .textContent("Informações alteradas com sucesso")
              .position("right", "top")
              .hideDelay(3500)
            );
          }
        );
    }
  }
}
export default PracaInfoCtrl;
