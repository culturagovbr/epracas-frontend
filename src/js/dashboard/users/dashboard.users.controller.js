class DashboardUsersCtrl {
  constructor($state, $mdDialog, $log, AppConstants, User, Toast) {
    "ngInject";

    this._$mdDialog = $mdDialog;
    this._$log = $log;
    this._AppConstants = AppConstants;
    this._User = User;
    this._Toast = Toast;

    User.list()
      .then(users => this.users = users)
      .catch(
        err => $log.log(`Error: DashBoardUsers ${err}`)
      );
  }

}

export default DashboardUsersCtrl;
