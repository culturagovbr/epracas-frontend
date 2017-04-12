class DashboardVinculoCtrl {
  constructor($scope, $http, $mdDialog, $document, $log, Toast, Praca, AppConstants) {
    "ngInject";

    angular.extend(this, {
      _$http: $http,
      _$mdDialog: $mdDialog,
      _$document: $document,
      _Toast: Toast,
      _Praca: Praca,
      _AppConstants: AppConstants,
    })

    // this._$scope = $scope;

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

  showUserInfo(user) {
    this._$mdDialog.show({})
  }

  showPracaInfo(praca) {
    this._Praca.get(praca.id_pub)
      .then(result => {
        this._$mdDialog.show({
          controller: 'PracaInfoCtrl',
          controllerAs: '$ctrl',
          templateUrl: 'praca/pracainfo-dialog.tmpl.html',
          parent: angular.element(this._$document.body),
          locals: { praca: result }
        })
      })
  }

  startProcessoVinculacao(pedido) {
    this._$mdDialog.show({
      controller: "DashboardVinculoDialogCtrl",
      controllerAs: "$ctrl",
      templateUrl: "dashboard/vinculacao/vinculo-dialog.tmpl.html",
      parent: angular.element(this._$document.body),
      locals: { pedido: pedido },
    });
  }

  deleteProcessoVinculacao(pedido) {
    this._$mdDialog.show(
        this._$mdDialog.confirm()
        .title("Excluir Pedido de Vinculação")
        .textContent("Ao excluir um pedido de vinculação de um usuário à uma praça, você automaticamente excluir também os arquivos anexos a este pedido. Deseja continuar?")
        .ariaLabel("Excluir Pedido de Vinculação")
        .ok("Sim, excluir este pedido")
        .cancel("Não, mantenha o pedido")
        )
        .then(
            () => this._$http({
              url: `${this._AppConstants.vinculoEndPoint}${pedido.id_pub}/`,
              method: "DELETE",
            })
            .then( () => {
              const index = this.pedidos.indexOf(pedido);
              if (index > -1) {
                this.pedidos.splice(index, 1);
              };
              this._Toast.showSuccessToast("Pedido excluido com sucesso");
            })
            .catch(err => this._Toast.showRejectedToast(`Problema ao excluir pedido ${err.status} - ${err.data}`))
          )
  }

}

export default DashboardVinculoCtrl;
