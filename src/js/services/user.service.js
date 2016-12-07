export default class User {
  constructor(JWT, AppConstants, $http, $state, $q, $log, $window) {
    "ngInject";

    this._JWT = JWT;
    this._AppConstants = AppConstants;
    this._$http = $http;
    this._$state = $state;
    this._$q = $q;
    this._$log = $log;
    this._$window = $window;

    this.current = null;
  }


  logout() {
    this.current = null;
    this._JWT.destroy();
    this._$window.location.href = `${this._AppConstants.logoutUrl}${this._$state.href('app.home', {}, {absolute: true})}`;
  }

  verifyAuth() {
    const deferred = this._$q.defer();

    if (!this._JWT.get()) {
      deferred.resolve(false);
      return deferred.promise;
    }

    if (this.current) {
      deferred.resolve(true);
    } else {
      const accessToken = localStorage.access_token;
      this.setUserInfo(accessToken).then(
        res => deferred.resolve(true),
        err => deferred.resolve(false)
      );
    }

    return deferred.promise;
  }

  ensureAuthIs(bool) {
    const deferred = this._$q.defer();

    this.verifyAuth().then(
      (authValid) => {
        if (authValid !== bool) {
          this._$state.go("app.home");
          deferred.resolve(false);
        } else {
          deferred.resolve(true);
        }
      }
    );

    return deferred.promise;
  }

  setUserInfo(accessToken) {
    const deferred = this._$q.defer();

    if (accessToken && !this.current) {
      return this._$http({
        url: this._AppConstants.userinfoUrl,
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }).then(
        (res) => {
          this.current = res.data;
          deferred.resolve(true);
        },
        (err) => {
          this.current = null;
          deferred.resolve(false);
        }
      )
      .then(
        res => {
          this._$http({
            url: this._AppConstants.apiUserInfo,
            method: "POST",
            data: this.current,
          })
            .then(
              res => this.current = res.data
            )
            .catch(
              err => this._$log.log(`setUserInfo() Error: ${err}`)
            );
        },
      )
    }
    return deferred.promise;
  }

  list() {
    const deferred = this._$q.defer();

    this._$http({
      url: `${this._AppConstants.apiUserInfo}`,
      method: "GET",
    })
      .then(
        res => deferred.resolve(res.data),
        err => deferred.reject(err),
      );
    return deferred.promise;
  }

  changeStaffPowers(id_pub, status) {
    const deferred = this._$q.defer();

    this._$http({
      url: `${this._AppConstants.apiUserInfo}${id_pub}/`,
      method: "PATCH",
      data: { is_staff: status },
    })
      .then(
        res => deferred.resolve(res.data),
        err => deferred.reject(err)
      )
    return deferred.promise;
  }
}
