class EventCtrl {
  constructor($scope, $http, $log, $mdDialog, $mdToast, Atividade, AppConstants) {
    "ngInject";

    this._$scope = $scope;
    this._$http = $http;
    this._$log = $log;
    this._$mdDialog = $mdDialog;
    this._$mdToast = $mdToast;
    this._agendaApiUrl = AppConstants.agendaApi;
    this._Atividade = Atividade;
    this._praca = $scope.praca;

    this.eventData = {};

    this._listaAtividades = [
      {
        value: 1,
        display_name: "Apresentação",
      },
      {
        value: 2,
        display_name: "Atendimento",
      },
      {
        value: 3,
        display_name: "Cormercialização de produtos",
      },
      {
        value: 4,
        display_name: "Curso",
      },
      {
        value: 5,
        display_name: "Espetátulo",
      },
      {
        value: 6,
        display_name: "Exposição",
      },
      {
        value: 7,
        display_name: "Feira de trocas",
      },
      {
        value: 8,
        display_name: "Oficina",
      },
      {
        value: 9,
        display_name: "Palestra",
      },
      {
        value: 10,
        display_name: "Reunião",
      },
      {
        value: 11,
        display_name: "Seminário",
      },
      {
        value: 12,
        display_name: "Show",
      },
      {
        value: 13,
        display_name: "Festas",
      },
      {
        value: 14,
        display_name: "Outros",
      },
    ];

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
    ];

    this._localAtividade = [
      {
        value: 1,
        display_name: "Cineteatro",
      },
      {
        value: 2,
        display_name: "Biblioteca",
      },
      {
        value: 3,
        display_name: "Laboratório multimídia",
      },
      {
        value: 4,
        display_name: "Quadra",
      },
      {
        value: 5,
        display_name: "Sala multiuso",
      },
      {
        value: 6,
        display_name: "CRAS",
      },
      {
        value: 7,
        display_name: "Pista de skate",
      },
      {
        value: 8,
        display_name: "Áreas externas",
      },
    ];

    this._publicoAtividade = [
      {
        value: 1,
        display_name: "Egressos do sistema prisional",
      },
      {
        value: 2,
        display_name: "Famílias de presos do sistema carcerário",
      },
      {
        value: 3,
        display_name: "jovens em medidas socioeducativas",
      },
      {
        value: 4,
        display_name: "Pessoas ou grupos vítimas de violência",
      },
      {
        value: 5,
        display_name: "Pessoas em sofrimento psíquico",
      },
      {
        value: 6,
        display_name: "População em situação de rua",
      },
      {
        value: 7,
        display_name: "Catadores de material reciclável",
      },
      {
        value: 8,
        display_name: "Atingidos por empreendimento de Infraestrutura",
      },
      {
        value: 9,
        display_name: "Imigrantes",
      },
      {
        value: 10,
        display_name: "Familias acampadas",
      },
      {
        value: 11,
        display_name: "Agricultores familiares",
      },
      {
        value: 12,
        display_name: "Assentados da Reforma Agrária",
      },
      {
        value: 13,
        display_name: "Povos e Comunidades Tradicionais de Matriz Africana",
      },
      {
        value: 14,
        display_name: "Quilombolas",
      },
      {
        value: 15,
        display_name: "Indígenas",
      },
      {
        value: 16,
        display_name: "Extrativistas",
      },
      {
        value: 17,
        display_name: "Pescadores artesanais",
      },
      {
        value: 18,
        display_name: "Ribeirinhos",
      },
      {
        value: 19,
        display_name: "Sertanejos",
      },
      {
        value: 20,
        display_name: "Ciganos",
      },
      {
        value: 21,
        display_name: "População de Lésbicas, Gays, Bissexuais, Travestis, Transexuais e Transgêneros -LGBT",
      },
      {
        value: 22,
        display_name: "Mulheres",
      },
      {
        value: 23,
        display_name: "Pessoas com deficiência",
      },
      {
        value: 24,
        display_name: "População negra",
      },
      {
        value: 25,
        display_name: "Estudantes",
      },
      {
        value: 26,
        display_name: "Grupos Artísticos e Culturais Independentes",
      },
      {
        value: 27,
        display_name: "Mestres, praticantes, brincantes e grupos das culturas populares, urbanas e rurais",
      },
      {
        value: 28,
        display_name: "Não específico",
      },
    ];

    this._faixaEtariaAtividade = [
      {
        value: 1,
        display_name: "Crianças",
      },
      {
        value: 2,
        display_name: "Adolescentes",
      },
      {
        value: 3,
        display_name: "Jovens",
      },
      {
        value: 4,
        display_name: "Adultos",
      },
      {
        value: 5,
        display_name: "Idosos",
      },
      {
        value: 6,
        display_name: "Livre",
      },
    ];

    this._territorioAtividade = [
      {
        value: 1,
        display_name: "Bairro da Praça CEU",
      },
      {
        value: 2,
        display_name: "Bairros do entorno",
      },
      {
        value: 3,
        display_name: "Município",
      },
      {
        value: 4,
        display_name: "Municípios do entorno",
      },
      {
        value: 5,
        display_name: "Estado",
      },
    ];
    // self = this;
  }

  cancel() {
    this._$mdDialog.cancel();
  }

  save() {
    this.isSaving = true;
    this.eventData.praca = this._praca.id_pub;
    this._Atividade.new(this.eventData)
    // this._$http({
    //   url: this._agendaApiUrl,
    //   method: "POST",
    //   data: this.eventData,
    // })
      .then(
        (response) => {
          this._$log.log(`Success!!! ${response.status} -  ${response.data}`);
          this._$mdDialog.hide();
          this._$mdToast.show(
            this._$mdToast.simple()
              .textContent("Evento adicionado.")
              .position("right", "top")
              .hideDelay(3500)
          );
        }
      )
      .catch(
        err => this._$log.log(`Error!!! ${err.status} -  ${err.data}`)
      );
  }

  parseArea() {
      console.log(this.eventData)
      // debugger;
      this.eventData.subareas = angular.fromJson(this.eventData.area).subarea
  }
}

export default EventCtrl;
