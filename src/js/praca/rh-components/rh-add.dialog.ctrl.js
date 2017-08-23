export default class RhAddDialogController {
  constructor($mdDialog, $log, Toast, RecursoHumano, praca, rh) {
    "ngInject"

    angular.extend(this, {
      $mdDialog,
      $log,
      Toast,
      RecursoHumano,
      praca,
      rh,
    })

    this.isSaving = false
    this.formacoes = false

    this.listaSexo = [
      { value: "f", display_name: "Feminino" },
      { value: "m", display_name: "Masculino" },
    ]

    this.listaEscolaridade = [
      { value: "se", display_name: "Sem Escolaridade" },
      { value: "efi", display_name: "Ensino Fundamental Incompleto" },
      { value: "efc", display_name: "Ensino Fundamental Completo" },
      { value: "emi", display_name: "Ensino Médio Incompleto" },
      { value: "emc", display_name: "Ensino Médio Completo" },
      { value: "eti", display_name: "Ensino Técnico Incompleto" },
      { value: "etc", display_name: "Ensino Técnico Completo" },
      { value: "esi", display_name: "Ensino Superior Incompleto" },
      { value: "esc", display_name: "Ensino Superior Completo" },
      { value: "esp", display_name: "Especialização" },
      { value: "mes", display_name: "Mestrado" },
      { value: "doc", display_name: "Doutorado" },
    ]

    this.listaFormacao = [
      { value: "bib", display_name: "Biblioteconomia" },
      { value: "edf", display_name: "Educação Fisica" },
      { value: "ss", display_name: "Serviço Social" },
      { value: "psi", display_name: "Psicologia" },
      { value: "ped", display_name: "Pedagogia" },
      { value: "son", display_name: "Sonoplastia" },
      { value: "aud", display_name: "Audiovisual" },
      { value: "otr", display_name: "Outros" },
    ]

    this.listaVinculo = [
      { value: "se", display_name: "Servidor Estatutário" },
      { value: "st", display_name: "Servidor Temporario" },
      { value: "ep", display_name: "Empregado Público (CLT)" },
      { value: "com", display_name: "Comissionado" },
      { value: "ter", display_name: "Terceirizado" },
      { value: "coo", display_name: "Cooperado" },
      { value: "vol", display_name: "Voluntário" },
      { value: "otr", display_name: "Outro vínculo não permanente" },
    ]

    this.RecursoHumano.options(praca)
      .then((data) => {
        // this.listaEscolaridade = data.escolaridade.choices
        // this.listaFormacao = data.formacao.choices
        // this.listaVinculo = data.vinculo.choices
        this.listaLocalTrabalho = data.local_trabalho.child.choices
      })
  }

  showFormacao() {
    var escolaridades = ["esi", "esc", "esp", "mes", "doc"];
    this.formacoes = escolaridades.indexOf(this.rh.escolaridade) > -1;
  }

  cancel() { this.$mdDialog.cancel() }

  save(praca, rh) {
    this.isSaving = true

    this.RecursoHumano.save(praca, rh)
      .then(
        (response) => {
          this.$mdDialog.hide()
          this.Toast.showSuccessToast("Recurso Humano Adicionado")
        }
      )
      .catch(
        (err) => {
          this.$log.error(`Erro ao salvar Recurso Humano${angular.toJson(err.status)}, ${angular.toJson(err.data)}`)
          this.Toast.showRejectedToast("Erro ao adicionar Rh")
        }
      )
  }
}
