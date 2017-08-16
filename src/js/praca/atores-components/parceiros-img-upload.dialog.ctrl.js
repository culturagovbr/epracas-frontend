class ParceiroImgController {
  constructor($mdDialog) {
    "ngInject"

    angular.extend(this, {
      $mdDialog,
    })
  }

  cancel() {
    this.$mdDialog.cancel()
  }

  hide(imagem) {
    this.$mdDialog.hide(imagem)
  }
}

export default ParceiroImgController
