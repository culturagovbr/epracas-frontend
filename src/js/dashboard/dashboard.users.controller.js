class DashboardUsersCtrl {
  constructor($http, $log, $mdMenu, AppConstants) {
    "ngInject";

    this.users = "";
    $http({
      url: AppConstants.apiUserInfo,
      method: "GET",
    })
    .then(
      users => (this.users = users.data)
    )
    .catch(
      err => $log.log(`Error: DashBoardUsers ${err}`)
    );

    this._$log = $log;
    this._$http = $http;
    this._AppConstants = AppConstants;
  }

  giveStaffPowers(id_pub) {
    this._$http({
      url: `${this._AppConstants.apiUserInfo}${id_pub}/`,
      method: "PATCH",
      data: { is_staff: true },
    })
      .then(
        res => this._$log.log(`giveStaffPowers() Success!! ${res.data}`)
      )
      .catch(
        reject => this._$log.log(`giveStaffPowers() Error: ${reject.status}`)
      );
  }
}

export default DashboardUsersCtrl;
