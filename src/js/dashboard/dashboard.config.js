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
    .state("app.dashboard.pracas", {
      url: "/pracas",
      controller: "DashboardPracasCtrl",
      controllerAs: "$ctrl",
      templateUrl: "dashboard/pracas/pracas.tmpl.html",
    })
    // .state("app.dashboard.gestores", {
    //   url: "/gestores",
    // })
    .state("app.dashboard.events", {
      url: "/agenda",
      controller: "DashboardEventsCtrl",
      controllerAs: "$ctrl",
      templateUrl: "dashboard/events.tmpl.html",
    })
    .state("app.dashboard.vinculacao", {
      url: "/vinculacao",
      controller: "DashboardVinculoCtrl",
      controllerAs: "$ctrl",
      templateUrl: "dashboard/vinculacao/vinculo.tmpl.html",
    })
    .state("app.dashboard.usuarios", {
      url: "/usuarios",
      controller: "DashboardUsersCtrl",
      controllerAs: "$ctrl",
      templateUrl: "dashboard/users/users.tmpl.html",
    });
}

export default DashBoardConfig;
