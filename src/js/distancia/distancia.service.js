export default class GeoLocation {
  constructor(AppConstants, $http, $window, $q) {
    "ngInject";


    this._AppConstants = AppConstants;
    this._$http = $http;
    this._$q = $q;
    this._$window = $window;
  }

  getCurrentPosition() {
    const deferred = this._$q.defer();

    if (!this._$window.navigator.geolocation) {
      deferred.reject("Geolocation not supported.");
    } else {
      this._$window.navigator.geolocation.getCurrentPosition(
        position => deferred.resolve(position),
        err => deferred.reject(err)
      );
    }
    return deferred.promise;
  }


  getDistanceList(latlong) {
    const deferred = this._$q.defer();

    this._$http({
      url: `${this._AppConstants.api}/distancia/`,
      method: "POST",
      data: { lat: latlong.coords.latitude,
              long: latlong.coords.longitude,
      },
    }).then(
      res => deferred.resolve(res.data),
      err => deferred.reject(err)
    );

    return deferred.promise;
  }

}
