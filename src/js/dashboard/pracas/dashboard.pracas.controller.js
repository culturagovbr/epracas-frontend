import moment from "moment"

$.fn.extend({
    animateCss: function(animationName, callback) {
        var animationEnd = (function(el) {
            var animations = {
                animation: 'animationend',
                OAnimation: 'oAnimationEnd',
                MozAnimation: 'mozAnimationEnd',
                WebkitAnimation: 'webkitAnimationEnd',
            };

            for (var t in animations) {
                if (el.style[t] !== undefined) {
                    return animations[t];
                }
            }
        })(document.createElement('div'));

        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);

            if (typeof callback === 'function') callback();
        });

        return this;
    },
});

class DashboardPracasCtrl {
  constructor($scope, $filter, $mdMedia, Praca) {
    "ngInject"

    angular.extend(this, {
      $scope,
      $filter,
      $mdMedia,
      Praca,
    })

    $scope.form = {
        data_inauguracao_inicial: "",
        data_inauguracao_final: "",
        repasse_start_limit: "0",
        repasse_end_limit: "9000000000",
    };

    this.isFilterOpen = false;
    this.loadingPracas = true;

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

    Praca.list()
      .then((arrValues) => {
          let arrIntValues = [];
          angular.forEach(arrValues, function(objValue){if (objValue.repasse) arrIntValues.push(parseInt(objValue.repasse));});
          $scope.form.repasse_start = $scope.form.repasse_start_limit = Math.min.apply(null, arrIntValues);
          $scope.form.repasse_end = $scope.form.repasse_end_limit = Math.max.apply(null, arrIntValues);
          this.pracas = arrValues;
          return arrValues;
      })
      .then(values => (this.pracasFiltered = values))
      .then(() => (this.loadingPracas = false));

      this.filtroRepasses = {
        '1000000.00': 'R$1.000.000,00',
        '1500000.00': 'R$1.500.000,00',
        '2000000.00': 'R$2.000.000,00',
        '2500000.00': 'R$2.500.000,00',
        '3000000.00': 'R$3.000.000,00',
        '3500000.00': 'R$3.500.000,00',
        '4000000.00': 'R$4.000.000,00'
      };

      // Filtrando json conforme o formulario.
      $scope.$watch('form',
          () => {

              $scope.form.repasse_start_treated = $scope.form.repasse_start;
              $scope.form.repasse_end_treated = $scope.form.repasse_end;
              this.pracasFiltered = this.$filter("filter")(this.pracas, {
                  municipio : $scope.form.municipio,
                  uf : $scope.form.uf,
                  regiao : $scope.form.regiao,
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
                      if (value.repasse == null && ($scope.form.repasse_end != null)) booReturn = false;
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
    let elmPracas = $("#pracas").find(".layout-row")
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
      if (this.$mdMedia("xs")) {
        elmPracas.css("height", "60em")
      } else {
        elmPracas.css("height", "22em")
      }
      setTimeout(function() {
        elmContianerSearch.show()
        elmContianerSearch.animateCss("slideInRight")
      }, 200)
    }
    this.isFilterOpen = !this.isFilterOpen
  }
}

export default DashboardPracasCtrl
