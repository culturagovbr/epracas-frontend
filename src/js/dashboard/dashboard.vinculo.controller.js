class DashboardVinculoCtrl {
  constructor($scope, $http, $mdDialog, $document, $log, AppConstants) {
    "ngInject";

    this._$mdDialog = $mdDialog;
    this._$document = $document;
    this._$scope = $scope;

    this.pedidos = "";
    $http({
      url: AppConstants.vinculoEndPoint,
      method: "GET",
    })
      .then(
        pedidos => {
          (this.pedidos = pedidos.data);
          $log.log(pedidos.data);
        }
      )
      .catch(
        err => $log.log(`Error: DashboardVinculoCtrl ${err}`)
      );
  }

  processoVinculacao(pedido) {
    this._$mdDialog.show({
      controller: "DashboardVinculoDialogCtrl",
      controllerAs: "$ctrl",
      templateUrl: "dashboard/vinculo-dialog.tmpl.html",
      parent: angular.element(this._$document.body),
      locals: { pedido: pedido },
    });
  }

}

export default DashboardVinculoCtrl;
