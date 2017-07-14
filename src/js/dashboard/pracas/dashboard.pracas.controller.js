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

    this.situations = [
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

    this.models = [
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

    this.regiao = [
      {
        name: "",
        value: "",
      },
      {
        name: "Centro-Oeste",
        value: "CO",
      },
      {
        name: "Nordeste",
        value: "NE",
      },
      {
        name: "Norte",
        value: "N",
      },
      {
        name: "Sul",
        value: "S",
      },
      {
        name: "Sudeste",
        value: "SE",
      },
    ];

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
