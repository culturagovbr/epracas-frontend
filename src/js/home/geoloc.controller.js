class GeolocCtrl {
  constructor($scope, $state, GeoLocation) {
    "ngInject";

    $scope.$state = $state;

    this.geoLoc = {
      defaults: {
        tileLayerOptions: {
          detectRetina: true,
          reuseTiles: true,
        },
        scrollWheelMouse: false,
        doubleClickZoom: false,
        zoomControl: false,
        dragging: false,
      },
      markers: {},
    }

    this.pracas_proximas = [];

    GeoLocation.getCurrentPosition()
    .then(position => GeoLocation.getDistanceList(position))
    .then(distances => distances.forEach((praca, index) => {
      this.pracas_proximas.push(praca)

      let pracaName = praca.nome.split("-")[0]
      this.geoLoc.markers[pracaName] = {
        lat: parseFloat(praca.latlong.split(', ')[0]),
        lng: parseFloat(praca.latlong.split(', ')[1]),
        message: praca.nome,
        draggable: false,
        focus: false
      }
    }))
    .catch(error => console.warn(error))

  }
}

export default GeolocCtrl;
