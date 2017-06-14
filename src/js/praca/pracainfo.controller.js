class PracaInfoCtrl {
  constructor($mdDialog, $log, User, Praca, Toast, praca) {
    "ngInject"

    angular.extend(this, {
      $mdDialog,
      $log,
      User,
      Praca,
      Toast,
      praca,
    })

    this.isAdmin = this.User.IsAdmin()

    this.Praca.options(praca)
      .then((data) => {
        this.listaUf = data.uf.choices
        this.listaRegiao = data.regiao.choices
        this.listaModelo = data.modelo.choices
        this.listaSituacao = data.situacao.choices
      })

    this.isSaving = false
  }

  cancel() {
    this.$mdDialog.cancel()
  }

  save(data) {
    this.isSaving = true
    if (angular.isUndefined(data.id_pub) || data.id_pub === null) {
      this.Praca.new(data)
        .then(
          () => {
            this.$mdDialog.hide()
            this.Toast.showSuccessToast("Praca cadastrada com Sucesso!")
          }
        )
        .catch(
          (err) => {
            this.isSaving = false
            this.Toast.showRejectedToast(`Problemas ao criar a Praça. ${angular.toJson(err.data)}`)
            this.$log.error(`Save Praca info: ${angular.toJson(err.status)} - ${angular.toJson(err.data)}`)
          }
        )
    } else {
      let praca_data = {}
      let fields = ["id_pub", "nome", "logradouro", "cep", "bairro", "regiao", "uf", "municipio", "bio"]
      if (this.isAdmin) {
        fields.push("repasse", "modelo", "contrato", "lat", "long")
      }

      praca_data = fields.reduce((acc, field) => {
        acc[field] = angular.copy(data[field])
        return acc
      }, {})

      this.Praca.save(praca_data.id_pub, praca_data)
        .then(
          () => {
            this.$mdDialog.hide()
            this.Toast.showSuccessToast("Informações alteradas com sucesso!")
          }
        )
        .catch(
          (err) => {
            this.isSaving = false
            this.$log.error(`Save Praca Info: ${angular.toJson(err.status)} - ${angular.toJson(err.data)}`)
          }
        )
    }
  }
}
export default PracaInfoCtrl
