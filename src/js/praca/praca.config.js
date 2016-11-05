function PracaConfig($stateProvider) {
  "ngInject";

  $stateProvider
    .state("app.pracas", {
      url: "/pracas",
      controller: "PracasCtrl",
      controllerAs: "$ctrl",
      templateUrl: "praca/pracas.html",
      title: "Listagem de Praças dos CEUs",
      resolve: {
        pracas(Praca, $state) {
          return Praca.list().then(
            pracas => pracas,
            (err) => {
              $state.go("app.home");
              // $log.log(`app.pracas Error: ${err}`);
            }
          );
        },
      },
    }
    )
    .state("app.praca", {
      url: "/pracas/{pk}",
      controller: "PracaCtrl",
      controllerAs: "$ctrl",
      templateUrl: "praca/pracas.praca.html",
      title: "Praça",
      resolve: {
        praca(Praca, $state, $stateParams) {
          return Praca.get($stateParams.pk).then(
            praca => praca,
            (err) => {
              // $log.log(`app.praca Error: ${err}`);
              $state.go("app.pracas");
            }
          );
        },
      },
    }
    );
}

export default PracaConfig;
