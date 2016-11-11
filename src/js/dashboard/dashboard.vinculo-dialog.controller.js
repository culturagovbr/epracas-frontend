class DashboardVinculoDialogCtrl {
  constructor($scope, $mdDialog, pedido) {
    "ngInject";

    this._$scope = $scope;
    this._$mdDialog = $mdDialog;

    $scope.pedido = pedido;

  }
}

export default DashboardVinculoDialogCtrl;
