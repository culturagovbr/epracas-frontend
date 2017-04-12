class DashboardVinculoDialogCtrl {
  constructor($scope, $http, $log, $mdDialog, $mdToast, $mdStepper, Toast, AppConstants, pedido) {
    "ngInject";

    angular.extend(this, {
      _$scope: $scope,
      _$http: $http,
      _$log: $log,
      _$mdDialog: $mdDialog,
      _$mdStepper: $mdStepper,
      _Toast: Toast,
      _AppConstants: AppConstants,
      pedido: pedido,
    })

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

    this._pedido = "";
    this.vincFiles = "";
    $http({
      url: `${AppConstants.vinculoEndPoint}${pedido.id_pub}/`,
      method: "GET",
    })
    .then(pedido => this._pedido = pedido.data)
      .then(pedido => {
        this.vincFiles = {
          cpf: pedido.files.filter(file => file.tipo == 'cpfFile')[0],
          comp: pedido.files.filter(file => file.tipo == 'compFile')[0],
        };
      })
  }

  cancelProcesso() {
    this._$mdDialog.cancel();
  }

  proximoPasso(arquivo) {
    const index = this._pedido.files.indexOf(arquivo);
    if (index > -1) {
      this._$http({
        url: `${this._AppConstants.vinculoEndPoint}${this.pedido.id_pub}/documento/${arquivo.id_pub}/`,
        method: "PATCH",
        data: {
          verificado: arquivo.verificado,
          comentarios: arquivo.comentarios,
        }
      })
      .then(
          this._$mdStepper('vinculoStepper').next()
      )
      .catch( err => {
        this._$log.error(`Erro ao salvar arquivo. ${err.status} - ${err.data}`),
        this._Toast.showRejectedToast("Erro ao salvar arquivo.")
      });
    } else {
      this._$mdStepper('vinculoStepper').next()
    }
  }

  finalizaProcesso(pedido) {
    this._$http({
      url: `${this._AppConstants.vinculoEndPoint}${pedido.id_pub}/`,
      method: "PATCH",
      data: {
        aprovado: this._pedido.aprovado,
        descricao: this._pedido.descricao,
      }
    })
    .then(
        response => {
          this._$mdDialog.cancel();
          this._Toast.showSuccessToast("Pedido aprovado. O gestor já se encontra com permissões sobre a Praça")
        }
    )
    .catch( err => {
      this._$log.error(`Erro ao finalizar o Processo de Vinculação ${angular.toJson(err.status)} - ${angular.toJson(err.data)}`);
      this._Toast.showRejectedToast("Erro ao finalizar o Processo de Vinculação");
    });
  }
}

export default DashboardVinculoDialogCtrl;
