class DashboardVinculoDialogCtrl {
  constructor($scope, $mdDialog, pedido) {
    "ngInject";

    this._$scope = $scope;
    this._$mdDialog = $mdDialog;

    $scope.pedido = pedido;
    $scope.vincFiles = {
      comp: pedido.files.filter(file => file.tipo == 'compFile')[0],
      cpf: pedido.files.filter(file => file.tipo == 'cpfFile')[0]
    }
  }
}

export default DashboardVinculoDialogCtrl;
