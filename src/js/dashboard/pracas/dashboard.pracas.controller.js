import moment from "moment"

$.fn.extend({
  animateCss: function (animationName) {
    var animationEnd = "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend"
    this.addClass("animated " + animationName).one(animationEnd, function() {
      $(this).removeClass("animated " + animationName)
    })
  }
})

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
      })

    Praca.list()
      .then(values => (this.pracas = values))
      .then(values => (this.pracasFiltered = values))
      .then(() => (this.loadingPracas = false))


      $scope.$watch('form',
          () => {
              this.pracasFiltered = this.$filter("filter")(this.pracas, {
                  municipio : $scope.form.municipio,
                  uf : $scope.form.uf,
                  regiao : $scope.form.regiao,
                  contrato : $scope.form.contrato,
                  modelo : $scope.form.modelo,
                  situacao : $scope.form.situacao,
                  data_inauguracao : $scope.form.data_inauguracao,
                  repasse : $scope.form.repasse,
              })

              this.pracasFiltered = this.pracasFiltered.filter((value) => {
                  // Filtrando registros por range de data.
                  let booReturn = true;
                  let intDateTrated = (typeof value.data_inauguracao == 'string')? parseInt(value.data_inauguracao.replace(/-/g, '')): moment().format('YYYYMMDD'),
                      intDateTratedBeggin = parseInt(moment($scope.form.data_inauguracao_inicial).format('YYYYMMDD')),
                      intDateTratedEnd = parseInt(moment($scope.form.data_inauguracao_final).format('YYYYMMDD'));
                  if (intDateTrated < intDateTratedBeggin) booReturn = false;
                  if (intDateTrated > intDateTratedEnd) booReturn = false;

                  // Filtrando os registros por range de valor.
                  return booReturn;
              });
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
