

class GaleriaEditDialogCtrl {
  constructor($mdDialog, $log, Upload, AppConstants, id, $stateParams, Praca, $scope) {
    "ngInject";
      $scope.objForm = {};
      Praca.getImg($stateParams.pk, id).then(function(arrResult) {
          $scope.objForm = arrResult;
      });

    angular.extend(this, {
      _$mdDialog: $mdDialog,
      _$log: $log,
      _Upload: Upload,
      _AppConstants: AppConstants,
    });

    this.save = () => {
        delete $scope.objForm.arquivo; // E esperado pela api um valor binario, como este valor esta tratado informando a localizacao da imagem e preciso retirar na hora de editar a imagem.
        delete $scope.objForm.url;
        console.info($scope.objForm)
        Praca.saveImg(id, $scope.objForm)
            .then(
                response => {
                    this._$mdDialog.cancel();
                    // $scope.paginatorData = $scope.paginatorData.filter((obj) => {return obj.id != pkImg;}); // Retira do array de objetos a imagem deletada.
                    Toast.showSuccessToast('Imagem salva com sucesso');
                })
            .catch(
                err => {
                    $log.error(`Erro ao salvar esta imagem. ${angular.toJson(err.status)} - ${angular.toJson(err.data)}`);
                    Toast.showRejectedToast("Erro ao salvar a imagem.");
                }
            );
    }
  }

  cancel(ev) {
    this._$mdDialog.cancel(ev)
  }

  // uploadImg(imagem) {
	// 	if (imagem && imagem.length) {
  //     this._$mdDialog.show({
  //       clickOutsideToClose: false,
  //       template: `
  //         <div layout="row" layout-padding layout-align="center center">
  //           <div flex=30>
  //             <md-progress-circular md-mode="indeterminate"></md-progress-circular>
  //           </div>
  //           <div flex=70>
  //             <p>Salvando arquivo {{i}} de {{$ctrl.imagem_count}}.
  //             Por favor, aguarde.</p>
  //           </div>
  //         </div>
  //         `,
  //       locals: {i: this.i, imagem_count: imagem.length}
  //     })
	// 		for (let i=0; i < imagem.length; i++) {
	// 			this._Upload.upload({
	// 				url: `${this._AppConstants.api}/pracas/${this.praca.id_pub}/imagens/`,
	// 				method: "POST",
	// 				data: {
	// 						arquivo: imagem[i],
	// 						titulo: imagem[i].titulo,
	// 						descricao: imagem[i].descricao,
	// 					}
	// 				})
  //       this._$mdDialog.hide()
	// 			}
	// 		}
	// 	}
  }

export default GaleriaEditDialogCtrl;
