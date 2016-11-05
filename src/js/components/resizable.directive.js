function resizable($window) {
  "ngInject";

  return function($scope) {
    $scope.initializeWindowSize = function() {
      $scope.windowHeight = $window.innerHeight;
      $scope.windowWidth = $window.innerWidth;
    };
    $scope.initializeWindowSize();
    angular.element($window).bind(
    "resize",
      () => {
        $scope.initializeWindowSize();
        $scope.apply();
      }
    );
  };
}

export default resizable;
