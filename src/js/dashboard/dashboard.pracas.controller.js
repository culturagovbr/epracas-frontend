class DashboardPracasCtrl {
  constructor($state, $scope, $log, Praca) {
    "ngInject";

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
}

export default DashboardPracasCtrl;
