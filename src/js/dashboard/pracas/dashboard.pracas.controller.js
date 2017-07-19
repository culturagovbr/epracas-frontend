$.fn.extend({
  animateCss: function (animationName) {
    var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    this.addClass('animated ' + animationName).one(animationEnd, function() {
      $(this).removeClass('animated ' + animationName);
    });
  }
});

class DashboardPracasCtrl {
  constructor(Praca) {
    "ngInject";

    this.isFilterOpen = false;

    this.loadingPracas = true;

    Praca.options()
      .then((data) => {
        this.listaUf = data.uf.choices
        this.listaUf.unshift({value: "", display_name: "----"})
        this.listaRegiao = data.regiao.choices
        this.listaRegiao.unshift({value: "", display_name: "----"})
        this.listaModelo = data.modelo.choices
        this.listaModelo.unshift({value: "", display_name: "----"})
        this.listaSituacao = data.situacao.choices
        this.listaSituacao.unshift({value: "", display_name: "----"})
      })

    Praca.list()
      .then(values => this.pracas = values)
      .then(x => this.loadingPracas = false)
  }

  toggleFilter() {
    let elmContianerSearch = $('#container-search');
    let elmPracas = $('#pracas').find('.layout-row');
    let elmBtnSearch = $('#btn-search');
    if (this.isFilterOpen) {

        elmContianerSearch.removeClass('animated');
        elmContianerSearch.animateCss('fadeOutUp');
        elmContianerSearch.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', () => {
            // elmContianerSearch.hide();
            // elmBtnSearch.css('width', '100%');
            // elmPracas.css('height', '4em');
      });
        setTimeout(function() {
            elmContianerSearch.hide();
            elmBtnSearch.css('width', '100%');
            elmPracas.css('height', '4em');
        }, 150);
    } else {
      elmBtnSearch.css('width', '10%');
      elmPracas.css('height', '13em');
      setTimeout(function() {
          elmContianerSearch.show();
        elmContianerSearch.animateCss('slideInDown');
        // elmContianerSearch.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', () => {
        // });
      }, 200);
    }
    this.isFilterOpen = !this.isFilterOpen;
  }

}

export default DashboardPracasCtrl;
