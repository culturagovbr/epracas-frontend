class AppHeaderCtrl {
  constructor(AppConstants, User, $scope, $state, $log) {
    "ngInject";

    this.appName = AppConstants.appName;
    this.currentUser = User.current;

    $scope.$state = $state;

    function buildMenu(currentUser) {
      $scope.userMenu = {};

      if (angular.isDefined(currentUser.is_staff)) {
        $scope.userMenu.dashboard = { id: "dashboard",
            name: "Dashboard do Gestor MinC",
            icon: "dashboard",
            app: "app.dashboard",
          };
      }

      if (angular.isDefined(currentUser.praca_manager)) {
        $scope.userMenu.praca = { id: "praca",
            name: "Minha Praça",
            icon: "domain",
            // app: `app.praca, {pk: ${currentUser.praca}}`,
          };
      }
    }

    $scope.$watch(() => User.current, (newUser) => {
      this.currentUser = newUser;
      buildMenu(this.currentUser);
      $log.log($scope.userMenu);
    });
  }
}

const AppHeader = {
  controller: AppHeaderCtrl,
  templateUrl: "layout/header.html",
  bindings: {
    userMenu: "@",
  },
};


export default AppHeader;
