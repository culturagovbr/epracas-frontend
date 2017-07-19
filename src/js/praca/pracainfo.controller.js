class PracaInfoCtrl {
  constructor($mdDialog, $log, User, Praca, ErrorCatcher, Toast, praca) {
    "ngInject"

    angular.extend(this, {
      $mdDialog,
      $log,
      User,
      Praca,
      ErrorCatcher,
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
            this.$mdDialog.hide()
            this.ErrorCatcher.error("PracaInfoCtrl", err)
          }
        )
    } else {
      let praca_data = {}
      let fields = ["id_pub", "situacao", "modelo", "nome", "data_inauguracao", "bio", "telefone1", "telefone2", "fax", "email1", "email2", "pagina", "logradouro", "cep", "bairro", "regiao", "uf", "municipio"]

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
            this.Toast.showRejectedToast("Problema ao salvar a Praça")
            this.$mdDialog.hide()
          }
        )
    }
  }
}
export default PracaInfoCtrl
