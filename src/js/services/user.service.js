export default class User {
  constructor(JWT, AppConstants, $http, $state, $q, $log, $window) {
    "ngInject";

    angular.extend(this, {
      _JWT: JWT,
      _AppConstants: AppConstants,
      _$http: $http,
      _$state: $state,
      _$q: $q,
      _$log: $log,
      _$window: $window,
    })

    this.current = null;
  }

  logout() {
    this.current = null;
    this._JWT.destroy();
    this._$window.location.href = `${this._AppConstants.logoutUrl}${this._$state.href("app.home", {}, {absolute: true})}`;
  }

  verifyAuth() {
    const deferred = this._$q.defer();

    if (angular.isUndefined(this._JWT.get()) || this._JWT.get() === null) {
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

  getUserInfo(accessToken) {
    return this._$http({
      url: this._AppConstants.userinfoUrl,
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  }

  setUserInfo(accessToken) {
    const deferred = this._$q.defer();

    if (angular.isDefined(accessToken) && (angular.isUndefined(this.current) || this.current === null)) {
      this.getUserInfo(accessToken)
        .then(res =>  (this.current = res.data))
        .then(
          () => {
            this._$http({
              url: `${this._AppConstants.apiUserInfo}${this.current.sub}/`,
              method: "GET",
            })
              .then(
                (res) => {
                  const userInfo = res.data[0]
                  if ((this.current.profile_picture_url === userInfo.profile_picture_url) &&
                      (this.current.name === userInfo.name) &&
                      (this.current.email === userInfo.email) &&
                      (this.current.cpf === userInfo.cpf)) {
                        this.current = userInfo;
                        deferred.resolve(userInfo);
                  } else {
                    this._$http({
                      url: `${this._AppConstants.apiUserInfo}${this.current.sub}/`,
                      method: "PATCH",
                      data: this.current,
                    })
                      .then(res =>  {
                        this.current = res.data
                        deferred.resolve(res.data)
                      })
                      .catch(err => this._$log.error(`setUserInfo() Error on PATCH: ${angular.toJson(err.status)} - ${angular.toJson(err.data)}`))
                  }
                },
                (err) => {
                  // console.info(`${this._AppConstants.apiUserInfo}${this.current.sub}/`);
                  // console.info(`${this._AppConstants.apiUserInfo}${this.current.sub}/`);
                  this._$http({
                    url: `${this._AppConstants.apiUserInfo}${this.current.sub}/`,
                    method: "POST",
                    data: this.current,
                  })
                    .then(
                      res => this.current = res.data
                    )
                    .catch(
                      // err =>
                      () => {
                        window.location.reload(false); // Solucao temporaria de tela em branco, forçando recarregar a pagina automaticamente.
                        // this._$log.error(`setUserInfo() Error on POST: ${angular.toJson(err.status)} - ${angular.toJson(err.data)}`)
                      }
                    )
                }
              )
          }
        )
    } else {
      deferred.resolve(true);
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
        res => { deferred.resolve(res.data); },
        err => { deferred.reject(err) }
    );
    return deferred.promise;
  }

  delete(id_pub) {
    return this._$http({
      url: `${this._AppConstants.apiUserInfo}${id_pub}/`,
      method: "DELETE",
    })
      .then(
          res => res.data,
          err => err
      )
  }

  changeStaffPowers(sub, status) {
    const deferred = this._$q.defer();

    this._$http({
      url: `${this._AppConstants.apiUserInfo}${sub}/`,
      method: "PATCH",
      data: { is_staff: status },
    })
      .then(
        res => deferred.resolve(res.data),
        err => deferred.reject(err)
      )
    return deferred.promise;
  }

  IsManagerOrAdmin(praca) {
    if (angular.isUndefined(this.current) || (this.current === null)) {
      return false
    } else if (this.current.is_staff === true) {
      return true
    } else if ((angular.isDefined(praca.gestor) && praca.gestor !== null)) {
      return this.current.id_pub === praca.gestor.user_id_pub
    }
    return false
  }

  IsAdmin() {
    if (angular.isUndefined(this.current) || (this.current === null)) {
      return false
    }
    return this.current.is_staff
  }

}
