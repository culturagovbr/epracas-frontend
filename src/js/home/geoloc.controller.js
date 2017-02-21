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
      markers: [],
    }

    this.pracas_proximas = [];

    GeoLocation.getCurrentPosition().then(
        position => GeoLocation.getDistanceList(position).then(
          distances => distances.forEach(praca => {
            this.pracas_proximas.push(praca);
            debugger;
            this.geoLoc.markers.push(
                {
                  lat: praca.latlong.split(',')[0],
                  lng: praca.latlong.split(',')[1],
                  message: praca.titulo,
                  draggable: false,
                }
              )
            }
          )
        )
    );

  }
}

export default GeolocCtrl;
