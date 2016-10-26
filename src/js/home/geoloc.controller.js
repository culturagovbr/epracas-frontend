class GeolocCtrl {
  constructor($scope, $state, GeoLocation) {
    "ngInject";

    $scope.$state = $state;

    this.pracas_proximas = GeoLocation.getCurrentPosition().then(
      position => GeoLocation.getDistanceList(position).then(
        distances => this.pracas_proximas = distances
      )
    );
  }
}

export default GeolocCtrl;
