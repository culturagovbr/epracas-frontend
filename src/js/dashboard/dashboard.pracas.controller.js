class DashboardPracasCtrl {
  constructor($scope, $log, $mdDialog, $document, Praca) {
    "ngInject";

    this._$log = $log;
    this._$mdDialog = $mdDialog;
    this._$document = $document;
    this._Praca = Praca;

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

    Praca.list().then(
      (result) => {
        this.pracas = result;
        $log.log("Recuperando Praças");
      },
      err => $log.log("Erro ao recuperar a lista de Praças")
    );
  }

  infoPraca(praca) {
    this._Praca.get(praca.id_pub)
      .then(
        (result) => {
          this._$mdDialog.show({
            controller: "PracaInfoCtrl",
            controllerAs: "$ctrl",
            templateUrl: "praca/pracainfo-dialog.tmpl.html",
            parent: angular.element(this._$document.body),
            locals: { pracaData: result },
          });
        }
      );
  }

  infoGestor(praca) {

  }

  excluirPraca(praca) {

  }

}

export default DashboardPracasCtrl;
