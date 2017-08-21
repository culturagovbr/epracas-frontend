class UserDetailController {
  constructor($mdDialog, user, Gestor) {
    "ngInject";

    angular.extend(this, {
      Gestor,
    });

    this._$mdDialog = $mdDialog;
    this.user = user;

    Gestor.list()
      .then(response => this.gestores = response.data);
  }

  cancel() {
    this._$mdDialog.cancel();
  }

}

export default UserDetailController;
