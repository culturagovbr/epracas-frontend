class GeolocCtrl {
  constructor($scope, $state, GeoLocation, leafletData) {
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
      center: {
        lat: Number(40.712),
        lng: Number(-74.125),
        zoom: 1,
      },
    }

    this.pracas_proximas = [];
    let bounds = [];

    GeoLocation.getCurrentPosition()
      .then(position => GeoLocation.getDistanceList(position))
      .then(distances => distances.forEach((praca, index) => {
        this.pracas_proximas.push(praca);

        let pracaId = praca.id_pub.split("-")[0];
        this.geoLoc.markers[pracaId] = {
          lat: parseFloat(praca.latlong.split(', ')[0]),
          lng: parseFloat(praca.latlong.split(', ')[1]),
          message: praca.nome,
          draggable: false,
          focus: false
        }

        const marker = L.marker(praca.latlong.split(',')[0], praca.latlong.split(',')[1]);
        bounds.push(marker);
      }
      )
      )
      .catch(error => console.warn(error))


    const pontos = new L.featureGroup(bounds);
    const fronteira = pontos.getBounds();
    leafletData.getMap('geoLocationMap').then(
        map => {
          console.log(pontos);
          console.log(fronteira);
          // pontos.addTo(map);
          // map.fitBounds(pontos.getBounds())
          map.fitBounds([
              [40.712, -74.227],
              [40.774, -74.125]
          ]);
        }
    )
      

  }
}

export default GeolocCtrl;
