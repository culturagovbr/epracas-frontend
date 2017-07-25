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

    this.isFilterOpen = false

    this.loadingPracas = true

    this.dataInicial = ""
    this.dataFinal = ""

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

  filtraUf(uf) {
    this.pracasFiltered = this.$filter("filter")(this.pracas, { uf })
  }

  filtraMunicipio(municipio) {
    this.pracasFiltered = this.$filter("filter")(this.pracas, { municipio })
  }

  filtraRegiao(regiao) {
    this.pracasFiltered = this.$filter("filter")(this.pracas, { regiao }, true)
  }

  filtraContrato(contrato) {
    this.pracasFiltered = this.$filter("filter")(this.pracas, { contrato })
  }

  filtraModelo(modelo) {
    this.pracasFiltered = this.$filter("filter")(this.pracas, { modelo }, true)
  }

  filtraSituacao(situacao) {
    this.pracasFiltered = this.$filter("filter")(this.pracas, { situacao }, true)
  }

}

export default DashboardPracasCtrl
