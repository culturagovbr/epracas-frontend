class ParceiroImgController {
  constructor($mdDialog, $scope) {
    "ngInject"

    angular.extend(this, {
      $mdDialog,
      $scope
    })
  }

  cancel() {
    this.$mdDialog.cancel()
  }

  hide(imagem) {
    this.$scope.image = imagem;
    this.$mdDialog.hide(imagem)
  }
}

export default ParceiroImgController
