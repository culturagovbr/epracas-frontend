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

    Praca.list()
      .then(values => this.pracas = values)
      .then(x => this.loadingPracas = false)
  }

  toggleFilter() {

    // (this.isFilterOpen) ? $('#container-search').animateCss('bounceInUp') : $('#container-search').animateCss('bounceInDown');

    this.isFilterOpen = !this.isFilterOpen
  }

}

export default DashboardPracasCtrl;
