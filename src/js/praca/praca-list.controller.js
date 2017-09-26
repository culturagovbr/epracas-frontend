import moment from "moment"

class PracaListCtrl {
  constructor($scope, $filter, $state, $stateParams, pracas, Praca) {
    "ngInject";

    angular.extend(this, {
      $filter,
    });

    this.pracas = pracas;

    $scope.$state = $state;
    $scope.$stateParams = $stateParams;

    $scope.situacoes = [
      {
        value: "",
        descricao: "",
      },
      {
        value: "i",
        descricao: "Inaugurada",
      },
      {
        value: "a",
        descricao: "Obras em Andamento",
      },
      {
        value: "c",
        descricao: "Obras Concluidas",
      },
    ];

    $scope.modelos = [
      {
        value: "",
        descricao: "",
      },
      {
        value: "p",
        descricao: "700m²",
      },
      {
        value: "m",
        descricao: "3000m²",
      },
      {
        value: "g",
        descricao: "7000m²",
      },
    ];

    this.repasses = {
      '1000000.00': 'R$1.000.000,00',
      '1500000.00': 'R$1.500.000,00',
      '2000000.00': 'R$2.000.000,00',
      '2500000.00': 'R$2.500.000,00',
      '3000000.00': 'R$3.000.000,00',
      '3500000.00': 'R$3.500.000,00',
      '4000000.00': 'R$4.000.000,00'
    };

    Praca.options()
    .then((data) => {
      this.listaUf = data.uf.choices
      this.listaUf.unshift({ value: "", display_name: "----" })
      this.listaRegiao = data.regiao.choices
      this.listaRegiao.unshift({ value: "", display_name: "----" })
      this.listaModelo = data.modelo.choices
      this.listaModelo.unshift({ value: "", display_name: "----" })
      this.listaSituacao = data.situacao.choices
      this.listaSituacao.unshift({ value: "", display_name: "----" })
    });


    $scope.myDate = new Date();
    $scope.form = {
      data_inauguracao_inicial: "",
      data_inauguracao_final: ""
    };

    $scope.$watch('form',
      () => {

        // $scope.form.repasse_start_treated = $scope.form.repasse_start;
        // $scope.form.repasse_end_treated = $scope.form.repasse_end;
        this.pracasFiltered = this.$filter("filter")(this.pracas, {
          regiao : $scope.form.regiao,
        }, (actual, expected) => {
          if(expected){
            return angular.equals(actual, expected)
          }else{
            return true
          }
        });

        this.pracasFiltered = this.$filter("filter")(this.pracasFiltered, {
          municipio : $scope.form.municipio,
          uf : $scope.form.uf,
          contrato : $scope.form.contrato,
          modelo : $scope.form.modelo,
          situacao : $scope.form.situacao,
          data_inauguracao : $scope.form.data_inauguracao,
          repasse : $scope.form.repasse,
        });

        if (this.pracasFiltered) {
            this.pracasFiltered = this.pracasFiltered.filter((value) => {
                // Filtrando registros por range de data.
                let booReturn = true;
                let intDateTrated = (typeof value.data_inauguracao == 'string')? parseInt(value.data_inauguracao.replace(/-/g, '')): moment().format('YYYYMMDD'),
                    intDateTratedStart = parseInt(moment($scope.form.data_inauguracao_inicial).format('YYYYMMDD')),
                    intDateTratedEnd = parseInt(moment($scope.form.data_inauguracao_final).format('YYYYMMDD'));
                if (intDateTrated < intDateTratedStart) booReturn = false;
                if (intDateTrated > intDateTratedEnd) booReturn = false;
                // Filtrando os registros por range de valor.
                if (value.repasse == null && ($scope.form.repasse_end != undefined)) booReturn = false;
                let intValueEnd = ($scope.form.repasse_end)? $scope.form.repasse_end : '';
                if (parseInt(intValueEnd) < parseInt(value.repasse)) booReturn = false;
                return booReturn;
            });
        }

      }, true
    );
  }

  toggleFilter() {
    let elmContianerSearch = $("#container-search")
    let elmPracas = $("#pracas")
    let elmBtnSearch = $("#btn-search")

    if (this.isFilterOpen) {
      elmContianerSearch.removeClass("animated")
      elmContianerSearch.animateCss("fadeOutRight")
      elmContianerSearch.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", () => {
      })
      setTimeout(function() {
        elmContianerSearch.hide()
        elmBtnSearch.css("width", "100%")
        elmPracas.css("height", "4em")
      }, 150)
    } else {
      elmBtnSearch.css("width", "10%")
      elmPracas.css("height", "22em")
      setTimeout(function() {
        elmContianerSearch.show()
        elmContianerSearch.animateCss("slideInRight")
      }, 200)
    }
    this.isFilterOpen = !this.isFilterOpen
  }
}

export default PracaListCtrl;
