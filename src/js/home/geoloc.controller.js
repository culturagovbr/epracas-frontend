class GeolocCtrl {
  constructor($q, $state, $scope, AppConstants, GeoLocation) {
    'ngInject';

    this.appName = AppConstants.appName;
		this._$state = $state;
		this._$q = $q;

		this.pracas_proximas = GeoLocation.getCurrentPosition().then(
			(position) => GeoLocation.getDistanceList(position).then(
				(distances) => this.pracas_proximas = distances
			)
		);
  }


}

export default GeolocCtrl;
