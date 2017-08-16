class AtoresCtrl {
  constructor($state, $mdDialog, $log, Upload, Atores, Toast, ErrorCatcher, praca, ator) {
    "ngInject"

    angular.extend(this, {
      $state,
      $mdDialog,
      $log,
      Atores,
      Toast,
      ErrorCatcher,
      praca,
      ator,
    })

    this.isSaving = false

    Atores.options(praca)
      .then((data) => {
        this.listaArea = data.area.choices
        this.listaDescricao = data.descricao.choices
      })
  }

  cancel() {
    this.$mdDialog.cancel()
  }

  save(praca, ator) {
    const caller = this.ErrorCatcher.callerName()

    this.isSaving = true

    this.Atores.save(praca, ator)
      .then(
        () => {
          this.$mdDialog.hide()
          this.Toast.showSuccessToast("Ator salvo com Sucesso!")
          this.$state.reload()
        }
      )
      .catch(
        (err) => {
          this.isSaving = false
          this.ErrorCatcher.error(caller, err)
          this.$log.error(`saveAtores: ${angular.toJson(err.status)} - ${angular.toJson(err.data)}`)
        })
  }
}

export default AtoresCtrl
