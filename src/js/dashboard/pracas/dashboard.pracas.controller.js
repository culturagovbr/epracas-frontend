class DashboardPracasCtrl {
  constructor(Praca) {
    "ngInject";

    this.isFilterOpen = false;

    this.loadingPracas = true;

    Praca.list()
      .then(values => this.pracas = values)
      .then(x => this.loadingPracas = false)
  }

  toggleFilter() {
    this.isFilterOpen = !this.isFilterOpen
  }


}

export default DashboardPracasCtrl;
