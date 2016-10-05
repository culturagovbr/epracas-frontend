export default class GeoLocation {
	constructor(AppConstants, $http, $window, $q) {
		'ngInject';


		this._AppConstants = AppConstants;
		this._$http = $http;
		this._$q = $q;

		getCurrentPosition() {
			let deferred = this._$q.defer();

			if(!$window.navigator.geolocation) {
				deferred.reject('Geolocation not supported.');
			} else {
				$window.navigator.geolocation.getCurrentPosition(
					function(position) {
						deferred.resolve(position);
					}
					function(err) {
						deferred.reject(err);
					});
			}

			return deferred.promise;

		}

		getDistanceList(latlong) {
			let deferred = this._$q.defer();

			this._$http({
				url: this._AppConstants.api + '/distancia/',
				method: 'POST',
				data: { latlong: latlong }
			}).then(
				(res) => {
					deferred.resolve(res.data);
				},
				(err) => deferred.reject(err)
			);

			return deferred.promise;
		}
	};
