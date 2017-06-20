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
    )
    .state("app.galeria", {
      url: "/pracas/{pk}/galeria",
      title: "Galeria da Praça",
      controller: "PracaGaleriaCtrl",
      controllerAs: "$ctrl",
      templateUrl: "praca/praca-galeria.html",
        resolve: {
          imagens(Praca, $state, $stateParams) {
            return Praca.getImages($stateParams.pk).then(
                imagens => imagens,
              (err) => {
                $state.go("app.pracas");
              }
            );
          },
        },
    })
    .state("app.atividade", {
      url: "/praca/atividade/{pk}",
      title: "Atividade da Praça",
      controller: "PracaAtividadeCtrl",
      controllerAs: "$ctrl",
      templateUrl: "praca/praca-atividade.html",
        resolve: {
          objData(Atividade, $state, $stateParams) {
            return Atividade.get($stateParams.pk).then(
                objData => objData,
              (err) => {
                $state.go("app.pracas");
              }
            );
          },
        },
    });
}

export default PracaConfig;
