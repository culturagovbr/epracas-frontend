class DashboardVinculoDialogCtrl {
  constructor($scope, $document, $log, $mdDialog, $mdToast, $mdStepper, $state,
    ErrorCatcher, Vinculacao, Toast, AppConstants, pedido) {
    "ngInject"

    angular.extend(this, {
      $scope,
      $document,
      $log,
      $mdDialog,
      $mdStepper,
      $state,
      ErrorCatcher,
      Vinculacao,
      Toast,
      AppConstants,
      pedido,
    })

    $scope.showToast = function(event){
      if (!$scope.toastShown) {
        $mdToast.show(
            $mdToast.simple()
            .textContent("Você pode ajustar o zoom com a roda do seu mouse!")
            .position("top right")
            .hideDelay(3000)
            .parent(angular.element(document.getElementById("vinculoStepper")))
            )
        $scope.toastShown = true
      }
    }

    this.vincFiles = ""
    Vinculacao.get(pedido.id_pub)
    .then(response => (this.pedido = response.data))
    .then((response) => {
      this.vincFiles = {
        cpf: response.files.filter(file => file.tipo == "cpfFile")[0],
        comp: response.files.filter(file => file.tipo == "compFile")[0],
      }
      Object.assign(this.vincFiles.cpf, {
        tipo: this.vincFiles.cpf.arquivo.split(".").pop(),
      })
      Object.assign(this.vincFiles.comp, {
        tipo: this.vincFiles.comp.arquivo.split(".").pop(),
      })
    })

    this.listaSituacao = [
      { value: "c", display_name: "Cancelado" },
      // { value: "p", display_name: "Pendente" },
      { value: "a", display_name: "Aprovado" },
    ]
  }

  cancelProcesso() {
    this.$mdDialog.cancel()
  }

  proximoPasso(arquivo) {
    const index = this.pedido.files.indexOf(arquivo)
    const data = {
      id_pub: arquivo.id_pub,
      verificado: arquivo.verificado,
      comentarios: arquivo.comentarios,
    }
    if (index > -1) {
      this.Vinculacao.save_document(this.pedido.id_pub, data)
      .then(() => this.$mdStepper("vinculoStepper").next())
      .catch((err) => {
        this.$log.error(`Erro ao salvar arquivo. ${angular.toJson(err.status)} - ${angular.toJson(err.data)}`)
        this.Toast.showRejectedToast("Erro ao salvar arquivo.")
      })
    } else {
      this.$mdStepper("vinculoStepper").next()
    }
  }

  finalizaProcesso(pedido) {
    const caller = this.ErrorCatcher.callerName()
    var aprovado = false;
    if (pedido.situacao === 'a') {
      aprovado = true;
    }

    var dados = {
      id_pub: pedido.id_pub,
      situacao: pedido.situacao,
      descricao: pedido.despacho,
      aprovado: aprovado,
      finalizado: true,
      despacho: pedido.despacho,
    }

    this.Vinculacao.save(dados)
    .then(
        () => {
          this.$mdDialog.cancel()
          if(dados.aprovado){
            this.Toast.showSuccessToast("Pedido aprovado. O gestor já se encontra com permissões sobre a Praça.");
          } else {
            this.Toast.showRejectedToast("Pedido reprovado. O gestor não receberá permissões sobre a Praça.");
          }
          this.$state.reload()
        }
    )
    .catch((err) => {
      this.ErrorCatcher.error(caller, err)
      this.Toast.showRejectedToast("Erro ao finalizar o Processo de Vinculação")
    })
  }
}

export default DashboardVinculoDialogCtrl
