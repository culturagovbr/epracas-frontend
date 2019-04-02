
import moment from "moment"

class EventCtrl {

  preProcessArea(area){
    area.id = area.url.replace("/api/v1/areas/","").replace("/","")

  }

  constructor($state, $scope, $q, $http, $log, $mdDialog, Toast, Atividade, AppConstants, praca) {
    "ngInject"

    angular.extend(this, {
      $state,
      $scope,
      $q,
      $http,
      $log,
      $mdDialog,
      Toast,
      AppConstants,
      Atividade,
      praca,
      strSubareaLabel: "Subarea da Atividade",
    })

    this.setOptions().then(()=> {
      if (this.objValue) {
        this.eventData = this.objValue
        this.eventData.tipo = this.eventData.tipo.toString();
      } else {
        this.eventData = {}
      }

      this.selectedDays = {}
      this.eventData.ocorrencia = {}
      this.eventData.ocorrencia.start = new Date()
      this.eventData.ocorrencia.repeat_until = new Date()

      this.Atividade.listAreas()
        .then((data) => {
          this.areaAtividade = data

          this.areaAtividade.map(this.preProcessArea)

          this.eventData.areas = this.areaAtividade.filter((area) => { return (area.parent == null) })

          //caso o objeto exista, trata-se de uma edição
          if(this.objValue){

            //Checa se a area marcada esta na lista de áreas pai
            this.area = this.eventData.areas.filter((area) => {return (area.id == this.objValue.area)})
            if(this.area.length > 0){
              this.eventData.area = this.area[0];
              //carrega as subareas no formulario, mas nao seleciona nenhuma
              this.eventData.area = this.eventData.area.id;
              this.parseArea();

            } else if (this.objValue.area != null){
              // area selecionada era subarea
              this.eventData.subarea = this.areaAtividade.filter((area) => {return (area.id == this.objValue.area)})
              this.eventData.subarea = this.eventData.subarea[0];
              this.eventData.area = this.eventData.subarea.parent;
              this.eventData.subarea = this.eventData.subarea.id;
              this.parseArea();
            }


          }

        })

          this._DiasSemana = [
        {
          value: "MO",
          display_name: "Segunda",
        },
        {
          value: "TU",
          display_name: "Terça",
        },
        {
          value: "WE",
          display_name: "Quarta",
        },
        {
          value: "TH",
          display_name: "Quinta",
        },
        {
          value: "FR",
          display_name: "Sexta",
        },
        {
          value: "SA",
          display_name: "Sabado",
        },
        {
          value: "SU",
          display_name: "Domingo",
        },
      ]

      this._DiasSemana.forEach(dia => (this.selectedDays[dia.value] = false))
    });
  }

  setOptions() {
    var defer = this.$q.defer();
    this.Atividade.options(this.praca.id_pub)
      .then((data) => {
        this._espacoAtividade = data.selections.espaco.choices
        this._listaAtividades = data.selections.tipo.choices
        this._territorioAtividade = data.selections.territorio.choices
        this._publicoAtividade = data.selections.publico.choices
        this._faixaEtariaAtividade = data.selections.faixa_etaria.choices
        defer.resolve()
      });
    return defer.promise;
  }

  cancel() {
    this.$mdDialog.cancel()
  }

  save(data) {
    this.isSaving = true
    if (this.eventData.id_pub) {
      this.eventData.praca = this.praca.id_pub
      const date = moment(this.eventData.ocorrencia.repeat_until).format("YYYY-MM-DD")
      this.eventData.ocorrencia.repeat_until = date
      if(this.eventData.subarea != null){
        this.eventData.area = this.eventData.subarea
      }
      this.Atividade.update(this.eventData.id_pub, this.eventData)
        .then(
          response => {
            this.$mdDialog.hide()
            this.Toast.showSuccessToast("Alterações gravadas.")
            this.$state.reload()
          }
        )
        .catch(
          err => {
            this.$log.log(`Error!!! ${err.status}`, err.data),
              this.Toast.showRejectedToast(`Erro ao adicionar evento. ${err.data} `)
          }
        )
    } else {
      this.eventData.praca = this.praca.id_pub
      const date = moment(this.eventData.ocorrencia.repeat_until).format("YYYY-MM-DD")
      this.eventData.ocorrencia.repeat_until = date
      if(this.eventData.subarea != null){
        this.eventData.area = this.eventData.subarea
      }
      this.Atividade.new(this.eventData)
        .then(
          (response) => {
            response.data_inicio = moment(response.ocorrencia.start.slice(0, 10)).format("DD.MM.YYYY")
            response.data_encerramento = moment(response.ocorrencia.repeat_until).format("DD.MM.YYYY")
            response.espacos = this._espacoAtividade.filter((espaco) => { return (response.espaco.indexOf(espaco.value) >= 0) })
            this.praca.agenda.unshift(response)
            this.$mdDialog.hide()
            this.Toast.showSuccessToast("Evento adicionado.")
          }
        )
        .catch(
          (err) => {
            this.$log.log(`Error!!! ${angular.toJson(err.status)} - ${angular.toJson(err.data)}`)
            this.Toast.showRejectedToast(`Erro ao adicionar evento. ${err.data}`)
          }
        )
    }
  }

  parseArea() {

    this.eventData.subareas = this.areaAtividade.filter((x)=> {return x.parent === this.eventData.area})

  }
}

export default EventCtrl
