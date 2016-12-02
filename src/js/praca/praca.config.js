function PracaConfig($stateProvider) {
  "ngInject";

  $stateProvider
    .state("app.pracas", {
      url: "/pracas",
      controller: "PracaListCtrl",
      controllerAs: "$ctrl",
      templateUrl: "praca/praca-list.html",
      title: "Listagem de Praças dos CEUs",
      resolve: {
        pracas(Praca, $state) {
          return Praca.list().then(
            pracas => pracas,
            (err) => {
              $state.go("app.home");
            }
          );
        },
      },
    }
    )
    .state("app.praca", {
      url: "/pracas/{pk}",
      controller: "PracaDetailCtrl",
      controllerAs: "$ctrl",
      templateUrl: "praca/praca-detail.html",
      title: "Praça",
      resolve: {
        praca(Praca, $state, $stateParams) {
          return Praca.get($stateParams.pk).then(
            praca => praca,
            (err) => {
              $state.go("app.pracas");
            }
          );
        },
      },
    }
    );
}

export default PracaConfig;
