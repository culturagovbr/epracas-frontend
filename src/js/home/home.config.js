function HomeConfig($stateProvider) {
  "ngInject";

  $stateProvider
  .state("app.home", {
    url: "/",
    controller: "HomeCtrl",
    controllerAs: "$ctrl",
    templateUrl: "home/home.html",
    title: "Home",
  })
  .state("app.geoloc", {
    url: "/geolocalizacao",
    controller: "GeolocCtrl",
    controllerAs: "$ctrl",
    templateUrl: "home/geoloc.html",
    title: "Geolocalização de Praças",
  })
  .state("app.pesquisa", {
    url: "/pesquisa",
    controller: "PesquisaCtrl",
    controllerAs: "$ctrl",
    templateUrl: "home/pesquisa.html",
    title: "Pesquisa Equipamentos Pracinhas da Cultura",
  });
}

export default HomeConfig;
