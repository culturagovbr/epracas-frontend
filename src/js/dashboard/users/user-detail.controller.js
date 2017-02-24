class UserDetailController {
  constructor($mdDialog, user) {
    "ngInject";

    this._$mdDialog = $mdDialog;
    this.user = user;
  }

  cancel() {
    this._$mdDialog.cancel();
  }

}

export default UserDetailController;
