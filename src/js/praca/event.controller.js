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

    self = this;
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
}

export default EventCtrl;
