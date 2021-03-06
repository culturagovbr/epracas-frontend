class GeolocCtrl {
  constructor($scope, $state, $window, GeoLocation, leafletData, Toast) {
    "ngInject";

    angular.extend(this, {
      $scope,
      $state,
      $window,
      GeoLocation,
      leafletData,
      Toast
    })

    $scope.$state = $state;
    self = this

    
    GeoLocation.getCurrentPosition().catch(()=>{
      self.Toast.showRejectedToast('É necessário disponibilizar sua localização para este site nas configurações do seu navegador.')
      $scope.$state.go('app.home')
      $window.scrollTo(0, 0);
    })

    this.geoLoc = {
      defaults: {
        tileLayerOptions: {
          detectRetina: true,
          reuseTiles: true,
        },
        scrollWheelMouse: false,
        doubleClickZoom: false,
        zoomControl: true,
      },
      markers: {},
    }

    this.pracas_proximas = [];
    let bounds = [];

    GeoLocation.getCurrentPosition()
      .then(position => GeoLocation.getDistanceList(position))
        .then(distances => distances.forEach((praca, index, pracas) => {
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
          if (index === pracas.length - 1){ 
            leafletData.getMap('geoLocationMap').then(
              map => map.setView(
                new L.LatLng(
                  praca.latlong.split(',')[0],
                  praca.latlong.split(',')[1]),
                  9)
              )
          }
        })
      ).catch(error => console.warn(error))

  }

}

export default GeolocCtrl;
