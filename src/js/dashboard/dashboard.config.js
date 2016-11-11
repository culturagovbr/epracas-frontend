function DashBoardConfig($stateProvider) {
  "ngInject";

  // $scope.$state = $state;

  $stateProvider
    .state("app.dashboard", {
      url: "/dashboard",
      controller: "DashBoardCtrl",
      controllerAs: "$ctrl",
      templateUrl: "dashboard/dashboard.tmpl.html",
      title: "Dashboard - e-praças - Ministério da Cultura",
    })
    // .state("app.dashboard.indicadores", {
    //   url: "/indicadores",
    // })
    // .state("app.dashboard.pracas", {
    //   url: "/pracas",
    // })
    // .state("app.dashboard.gestores", {
    //   url: "/gestores",
    // })
    // .state("app.dashboard.agenda", {
    //   url: "/agenda",
    // })
    .state("app.dashboard.vinculacao", {
      url: "/vinculacao",
      controller: "DashboardVinculoCtrl",
      controllerAs: "$ctrl",
      templateUrl: "dashboard/vinculo.tmpl.html",
    })
    .state("app.dashboard.usuarios", {
      url: "/usuarios",
      controller: "DashboardUsersCtrl",
      controllerAs: "$ctrl",
      templateUrl: "dashboard/users.tmpl.html",
    });
}

export default DashBoardConfig;
