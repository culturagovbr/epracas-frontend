class DashboardVinculoInfoDialogCtrl {
  constructor($mdDialog, $log, User, Vinculacao, ErrorCatcher, Toast, pedido) {
    "ngInject"

    angular.extend(this, {
      $mdDialog,
      $log,
      User,
      Vinculacao,
      ErrorCatcher,
      Toast,
      pedido,
    });

    this.pedido = pedido.data;
    this.pedido.situacao = this.pedido.aprovado ? 'Aprovado' : 'Cancelado';
    this.pedido.identificacao = this.pedido.files.find((file) => {
      return file.tipo === 'cpfFile';
    });
    this.pedido.adesao = this.pedido.files.find((file) => {
      return file.tipo === 'compFile';
    })

  }
}
export default DashboardVinculoInfoDialogCtrl