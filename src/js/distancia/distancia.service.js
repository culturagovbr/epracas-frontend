export default class GeoLocation {
  constructor(AppConstants, $http, $window, $q) {
    "ngInject";


    this._AppConstants = AppConstants;
    this._$http = $http;
    this._$q = $q;
    this._$window = $window;
  }

  getCurrentPosition() {
    return this._$q((resolve, reject) => {
      if(!this._$window.navigator.geolocation) {
        reject("Geolocation not supported");
        return
      }

      this._$window.navigator.geolocation.getCurrentPosition(
        position => resolve(position),
        error => reject(error)
      )
    })
  }

  getDistanceList(latlong) {
    return this._$http({
      url: `${this._AppConstants.api}/distancia/`,
      method: "POST",
      data: { lat: latlong.coords.latitude,
              long: latlong.coords.longitude,
      },
    }).then(
      response => response.data,
      err => err.data
    );
  }

}
