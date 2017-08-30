import moment from "moment"

class EventCtrl {
  constructor($scope, $http, $log, $mdDialog, Toast, Atividade, AppConstants, praca) {
    "ngInject"

    angular.extend(this, {
      $scope,
      $http,
      $log,
      $mdDialog,
      Toast,
      AppConstants,
      Atividade,
      praca,
      strSubareaLabel: "Subarea da Atividade",
      booSubareaDisable: false,
    })

    const agendaApiUrl = AppConstants.agendaApi

    this.Atividade.options()
      .then((data) => {
        this._espacoAtividade = data.espaco.child.choices
        this._listaAtividades = data.tipo.choices
        this._Periodicidade = data.ocorrencia.children.frequency_type.choices
        this._territorioAtividade = data.territorio.choices
        this._publicoAtividade = data.publico.choices
        this._faixaEtariaAtividade = data.faixa_etaria.child.choices
      })

    this.eventData = {}
    this.selectedDays = {}

    this._areaAtividade = [
      {
        value: 1,
        display_name: "Artes Cênicas",
        subarea: [
          {
            value: 101,
            display_name: "Circo",
          },
          {
            value: 102,
            display_name: "Dança",
          },
          {
            value: 103,
            display_name: "Mímica",
          },
          {
            value: 104,
            display_name: "Ópera",
          },
          {
            value: 105,
            display_name: "Teatro",
          },
        ],
      },
      {
        value: 2,
        display_name: "Audiovisual",
        subarea: [
          {
            value: 201,
            display_name: "Preservação/Restauração da Memória Cinematográfica",
          },
          {
            value: 202,
            display_name: "Produção Cinematográfica",
          },
          {
            value: 203,
            display_name: "Produção Radiofônica",
          },
          {
            value: 204,
            display_name: "Produção Televisiva",
          },
          {
            value: 205,
            display_name: "Rádios/TVs Comunitárias",
          },
          {
            value: 206,
            display_name: "Exibição Cinematográfica",
          },
        ],
      },
      {
        value: 3,
        display_name: "Música",
        subarea: [
          {
            value: 301,
            display_name: "Música Erudita",
          },
          {
            value: 302,
            display_name: "Música Instrumental",
          },
          {
            value: 303,
            display_name: "Música Popular",
          },
          {
            value: 304,
            display_name: "Orquestra",
          },
          {
            value: 305,
            display_name: "Música em Geral",
          },
        ],
      },
      {
        value: 4,
        display_name: "Artes Visuais",
        subarea: [
          {
            value: 401,
            display_name: "Fotografia",
          },
          {
            value: 402,
            display_name: "Gráficas",
          },
          {
            value: 403,
            display_name: "Plásticas",
          },
        ],
      },
      {
        value: 5,
        display_name: "Patrimônio Cultural",
        subarea: [
          {
            value: 501,
            display_name: "Acervo",
          },
          {
            value: 502,
            display_name: "Afro Brasileira",
          },
          {
            value: 503,
            display_name: "Arqueológico",
          },
          {
            value: 504,
            display_name: "Arquitetônico",
          },
          {
            value: 505,
            display_name: "Artesanato",
          },
          {
            value: 506,
            display_name: "Ecológico",
          },
          {
            value: 507,
            display_name: "Folclore",
          },
          {
            value: 508,
            display_name: "Histórico",
          },
          {
            value: 509,
            display_name: "Indígena",
          },
          {
            value: 5010,
            display_name: "Museu",
          },
        ],
      },
      {
        value: 6,
        display_name: "Livro, Leitura e Literatura",
        subarea: [
          {
            value: 601,
            display_name: "Edição de Livros e outros",
          },
          {
            value: 602,
            display_name: "Evento literário",
          },
          {
            value: 603,
            display_name: "Leitura",
          },
          {
            value: 604,
            display_name: "Contação de história",
          },
          {
            value: 605,
            display_name: "Sarau",
          },
          {
            value: 606,
            display_name: "Outros",
          },
        ],
      },
      {
        value: 7,
        display_name: "Esportes",
        subarea: [
          {
            value: 701,
            display_name: "Futebol",
          },
          {
            value: 702,
            display_name: "Vôlei",
          },
          {
            value: 703,
            display_name: "Basquete",
          },
          {
            value: 704,
            display_name: "Skate",
          },
          {
            value: 705,
            display_name: "Handebol",
          },
          {
            value: 706,
            display_name: "Futevôlei",
          },
          {
            value: 707,
            display_name: "Capoeira",
          },
          {
            value: 708,
            display_name: "Outros",
          },
        ],
      },
      {
        value: 8,
        display_name: "Assistência Social",
        subarea: [],
      },
      {
        value: 9,
        display_name: "Saúde",
        subarea: [],
      },
      {
        value: 10,
        display_name: "Outros",
        subarea: [],
      },
    ]

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

      this.eventData.evento = this.eventData.evento.display_name

      this.Atividade.update(this.eventData.id_pub, this.eventData)
      .then(
          response => {
            this.$mdDialog.hide(),
            this.Toast.showSuccessToast("Alterações gravadas.")
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
      this.Atividade.new(this.eventData)
      .then(
          (response) => {
            response.data_inicio = moment(response.ocorrencia.start.slice(0, 10)).format("DD.MM.YYYY")
            response.data_encerramento = moment(response.ocorrencia.repeat_until).format("DD.MM.YYYY")
            response.espacos = this._espacoAtividade.filter((espaco) => {return (response.espaco.indexOf(espaco.value) >= 0)})
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
    let arrSubareas = angular.fromJson(this.eventData.area).subarea
    if (typeof arrSubareas[0] != 'undefined') {
      this.strSubareaLabel = "Subarea da Atividade"
      this.booSubareaDisable = false
    } else {
      this.strSubareaLabel = "Área não possuí subarea."
      this.booSubareaDisable = true
    }
    this.eventData.subareas = arrSubareas
  }
}

export default EventCtrl
