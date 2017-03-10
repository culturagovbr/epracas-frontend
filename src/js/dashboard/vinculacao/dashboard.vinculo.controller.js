class DashboardVinculoCtrl {
  constructor($scope, $http, $mdDialog, $document, $log, AppConstants) {
    "ngInject";

    angular.extend(this, {
      _$mdDialog: $mdDialog,
      _$document: $document,
    })

    this._$scope = $scope;

    this.pedidos = "";
    $http({
      url: AppConstants.vinculoEndPoint,
      method: "GET",
    })
    .then(
        pedidos => {
          (this.pedidos = pedidos.data);
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
      templateUrl: "dashboard/vinculacao/vinculo-dialog.tmpl.html",
      parent: angular.element(this._$document.body),
      locals: { pedido: pedido },
    });
  }

}

export default DashboardVinculoCtrl;
