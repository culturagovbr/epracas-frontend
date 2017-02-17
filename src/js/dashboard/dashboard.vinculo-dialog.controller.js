class DashboardVinculoDialogCtrl {
  constructor($scope, $mdDialog, $mdToast, pedido) {
    "ngInject";

    this._$scope = $scope;
    this._$mdDialog = $mdDialog;

    $scope.pedido = pedido;

    $scope.vincFiles = {
      comp: pedido.files.filter(file => file.tipo == 'compFile')[0],
      cpf: pedido.files.filter(file => file.tipo == 'cpfFile')[0]
    }

    $scope.vincFiles.comp.url = "http://sossolteiros.bol.uol.com.br/wp-content/uploads/2013/07/Jack-Nicholson.jpg"
    $scope.vincFiles.cpf.url = "http://sossolteiros.bol.uol.com.br/wp-content/uploads/2013/07/Jack-Nicholson.jpg"

    $scope.showToast = function(event){
      if(!$scope.toastShown)
      {
        $mdToast.show(
          $mdToast.simple()
            .textContent('Você pode ajustar o zoom com a roda do seu mouse!')
            .position('top right')
            .hideDelay(3000)
            .parent(angular.element(document.getElementById('vinculoStepper')))
        )
        $scope.toastShown = true
      }
    }
  }
}

export default DashboardVinculoDialogCtrl;
