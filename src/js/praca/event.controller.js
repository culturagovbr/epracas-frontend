class EventCtrl {
  constructor($scope, $http, $log, $mdDialog, AppConstants) {
    "ngInject";

    this._agendaApiUrl = AppConstants.agendaApi;
    this._$mdDialog = $mdDialog;
    this._$http = $http;
    this._praca = $scope.praca;
    this._$scope = $scope;
    this._$log = $log;

    self = this;
  }

  cancel() {
    this._$mdDialog.cancel();
  }

  save() {
    this.isSaving = true;
    this.eventData.praca = this._praca.id_pub;
    this._$http({
      url: this._agendaApiUrl,
      method: "POST",
      data: this.eventData,
    })
      .then(
        response => this._$log.log(`Success!!! ${response.status} -  ${response.data}`)
      )
      .catch(
        err => this._$log.log(`Error!!! ${err.status} -  ${err.data}`)
      );

  }

  // addEvent() {
  //   this._$http({
  //     url: this._agendaApiUrl,
  //     method: "POST",
  //     data: this.eventData,
  //   });
  // }
}

export default EventCtrl;
